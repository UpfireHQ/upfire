// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import './UpfireStore.sol';
import './UpfireStaking.sol';
import './token/UPR.sol';
import './libraries/TransferHelper.sol';

contract Upfiring is Initializable, OwnableUpgradeable {
    using SafeMath for uint256;

    UpfireStore public store;
    UpfireStaking public staking;

    // staking fee in basis points (e.g. 185 = 1.85%)
    uint8 public stakingFeeBp;
    uint8 public torrentOwnerPercent;
    uint8 public seedersProfitMargin;
    uint256 public availablePaymentTime; //seconds
    uint256 public minWithdraw;

    event Payment(string _torrent, uint256 _amount, address indexed _from);
    event Refill(address indexed _to, uint256 _amount);
    event Withdraw(address indexed _to, uint256 _amount);
    event Pay(address indexed _to, uint256 _amount, bytes32 _hash);
    event ChangeBalance(address indexed _to, uint256 _balance);

    function initialize(
        UpfireStore _store,
        uint8 _torrentOwnerPercent,
        uint8 _seedersProfitMargin,
        uint256 _minWithdraw
    ) public initializer {
        require(address(_store) != address(0));
        require(_torrentOwnerPercent != 0);
        require(_seedersProfitMargin != 0);

        stakingFeeBp = 0;
        availablePaymentTime = 86400;
        store = _store;
        torrentOwnerPercent = _torrentOwnerPercent;
        seedersProfitMargin = _seedersProfitMargin;
        minWithdraw = _minWithdraw;

        OwnableUpgradeable.__Ownable_init();
    }

    receive() external payable {
        revert();
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return store.balanceOf(_owner);
    }

    function totalReceivingOf(address _owner)
    public
    view
    returns (uint256 balance)
    {
        return store.totalReceivingOf(_owner);
    }

    function totalSpendingOf(address _owner)
    public
    view
    returns (uint256 balance)
    {
        return store.totalSpendingOf(_owner);
    }

    function check(string memory _torrent, address _from)
    public
    view
    returns (uint256 amount)
    {
        return
        store.check(torrentToHash(_torrent), _from, availablePaymentTime);
    }

    function torrentToHash(string memory _torrent)
    internal
    pure
    returns (bytes32 _hash)
    {
        return sha256(bytes(_torrent));
    }

    function transferFeeToStaking(uint256 amount) internal {
        if (address(staking) != address(0) && amount > 0) {
            payable(address(staking)).transfer(amount);
        }
    }

    function refill() external payable {
        require(msg.value != uint256(0));
        store.addBalance(msg.sender, msg.value);
        emit ChangeBalance(msg.sender, address(this).balance);
        emit Refill(msg.sender, msg.value);
    }

    function withdraw(uint256 _amount) external {
        require(_amount >= minWithdraw);
        require(address(this).balance >= _amount);
        require(store.subBalance(msg.sender, _amount));
        TransferHelper.safeTransferETH(msg.sender, _amount);
        emit ChangeBalance(msg.sender, address(this).balance);
        emit Withdraw(msg.sender, _amount);
    }

    function pay(
        string memory _torrent,
        uint256 _amount,
        address _owner,
        address[] memory _seeders,
        address[] memory _freeSeeders
    ) external {
        require(_amount != uint256(0));
        require(_owner != address(0));

        bytes32 _hash = torrentToHash(_torrent);

        uint256 stakingFee = 0;
        if (stakingFeeBp > 0) {
            stakingFee = _amount.mul(stakingFeeBp).div(10000);
        }

        require(store.subBalance(msg.sender, _amount));
        store.payment(_hash, msg.sender, _amount);
        transferFeeToStaking(stakingFee);

        emit Payment(_torrent, _amount, msg.sender);
        emit ChangeBalance(msg.sender, store.balanceOf(msg.sender));
        sharePayment(_hash, _amount - stakingFee, _owner, _seeders, _freeSeeders);
    }

    function sharePayment(
        bytes32 _hash,
        uint256 _amount,
        address _owner,
        address[] memory _seeders,
        address[] memory _freeSeeders
    ) internal {
        if ((_seeders.length + _freeSeeders.length) == 0) {
            payTo(_owner, _amount, _hash);
        } else {
            uint256 _ownerAmount = _amount.mul(torrentOwnerPercent).div(100);
            uint256 _otherAmount = _amount.sub(_ownerAmount);

            uint256 _realOtherAmount =
            shareSeeders(_seeders, _freeSeeders, _otherAmount, _hash);
            payTo(_owner, _amount.sub(_realOtherAmount), _hash);
        }
    }

    function shareSeeders(
        address[] memory _seeders,
        address[] memory _freeSeeders,
        uint256 _amount,
        bytes32 _hash
    ) internal returns (uint256) {
        uint256 _dLength =
        _freeSeeders.length.add(_seeders.length.mul(seedersProfitMargin));
        uint256 _dAmount = _amount.div(_dLength);

        payToList(_seeders, _dAmount.mul(seedersProfitMargin), _hash);
        payToList(_freeSeeders, _dAmount, _hash);

        return _dLength.mul(_dAmount);
    }

    function payToList(
        address[] memory _seeders,
        uint256 _amount,
        bytes32 _hash
    ) internal {
        if (_seeders.length > 0) {
            for (uint256 i = 0; i < _seeders.length; i++) {
                address _seeder = _seeders[i];
                payTo(_seeder, _amount, _hash);
            }
        }
    }

    function payTo(
        address _to,
        uint256 _amount,
        bytes32 _hash
    ) internal {
        require(store.addBalance(_to, _amount));
        emit Pay(_to, _amount, _hash);
        emit ChangeBalance(_to, store.balanceOf(_to));
    }

    function migrateStore(address _to) public onlyOwner {
        store.transferOwnership(_to);
    }

    function setAvailablePaymentTime(uint256 _availablePaymentTime)
    public
    onlyOwner
    {
        availablePaymentTime = _availablePaymentTime;
    }

    function setSeedersProfitMargin(uint8 _seedersProfitMargin)
    public
    onlyOwner
    {
        seedersProfitMargin = _seedersProfitMargin;
    }

    function setTorrentOwnerPercent(uint8 _torrentOwnerPercent)
    public
    onlyOwner
    {
        torrentOwnerPercent = _torrentOwnerPercent;
    }

    function setMinWithdraw(uint256 _minWithdraw) public onlyOwner {
        minWithdraw = _minWithdraw;
    }

    function setStaking(UpfireStaking stakingAddress, uint8 bp) external onlyOwner {
        staking = stakingAddress;
        stakingFeeBp = bp;
    }
}
