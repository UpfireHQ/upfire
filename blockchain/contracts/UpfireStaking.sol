// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import 'hardhat/console.sol';

contract UpfireStaking is Initializable, OwnableUpgradeable {
    using SafeERC20 for IERC20;

    struct StakerInfo {
        address account;
        uint256 amount;
        uint256 rewardDebt;
    }

    IERC20 private token;
    uint256 public minStakeAmount;

    uint256 public totalStakedAmount;
    uint256 public totalRewardAmount;
    uint256 public accRewardPerShare;
    uint256 public lastRewardAmount;

    // Address to staker info
    mapping(address => StakerInfo) public stakes;

    uint256 private constant DIV_PRECISION = 1e18;

    event AddRewards(uint256 amount);
    event Staked(address indexed account, uint256 amount);
    event Harvest(address indexed staker, uint256 amount);
    event Withdraw(address indexed staker, uint256 amount);
    event LogUpdateRewards(uint256 totalRewards, uint256 accRewardPerShare);

    function initialize(IERC20 _token, uint256 _minStakeAmount)
        public
        initializer
    {
        token = _token;
        minStakeAmount = _minStakeAmount;
        OwnableUpgradeable.__Ownable_init();
    }

    function setMinStakeAmount(uint256 _minStakeAmount) external onlyOwner {
        minStakeAmount = _minStakeAmount;
    }

    function stake(uint256 amount) external {
        require(
            amount >= minStakeAmount,
            'StakingPool: Amount must be greater than or equal to min stake amount'
        );

        updateRewards();

        StakerInfo storage staker = stakes[msg.sender];
        staker.amount = amount;
        staker.account = msg.sender;

        staker.rewardDebt = (staker.amount * accRewardPerShare) / DIV_PRECISION;

        token.safeTransferFrom(msg.sender, address(this), amount);
        totalStakedAmount = totalStakedAmount + amount;

        emit Staked(msg.sender, amount);
    }

    function withdraw() external {
        StakerInfo storage staker = stakes[msg.sender];
        require(staker.account != address(0), 'StakingPool: No staker exists');

        updateRewards();

        uint256 accumulated =
            (staker.amount * accRewardPerShare) / DIV_PRECISION;
        uint256 reward = accumulated - staker.rewardDebt;

        // also reset the global props
        totalStakedAmount = totalStakedAmount - staker.amount;

        // reset all staker props
        staker.rewardDebt = 0;
        staker.amount = 0;

        token.safeTransfer(msg.sender, reward + staker.amount);

        emit Harvest(msg.sender, reward);
        emit Withdraw(msg.sender, staker.amount);
    }

    function updateRewards() private {
        if (totalRewardAmount > lastRewardAmount) {
            if (totalStakedAmount > 0) {
                uint256 reward = totalRewardAmount - lastRewardAmount;
                accRewardPerShare =
                    accRewardPerShare +
                    (reward * DIV_PRECISION) /
                    totalStakedAmount;
            }
            lastRewardAmount = totalRewardAmount;
            emit LogUpdateRewards(lastRewardAmount, accRewardPerShare);
        }
    }

    function addRewards(uint256 amount) external {
        require(amount > 0, 'StakingPool: Amount must be greater than zero');
        token.safeTransferFrom(msg.sender, address(this), amount);
        totalRewardAmount = totalRewardAmount + amount;
        emit AddRewards(amount);
    }

    function harvest() external {
        StakerInfo storage staker = stakes[msg.sender];
        require(staker.account != address(0), 'StakingPool: No staker exists');

        updateRewards();

        uint256 accumulated =
            (staker.amount * accRewardPerShare) / DIV_PRECISION;
        uint256 reward = uint256(accumulated - staker.rewardDebt);
        staker.rewardDebt = accumulated;

        token.safeTransfer(msg.sender, reward);
        emit Harvest(msg.sender, reward);
    }

    function pendingReward() external view returns (uint256) {
        StakerInfo memory staker = stakes[msg.sender];
        require(staker.account != address(0), 'StakingPool: No staker exists');

        uint256 _accRewardPerShare = 0;
        if (totalRewardAmount > lastRewardAmount) {
            if (totalStakedAmount > 0) {
                uint256 reward = totalRewardAmount - lastRewardAmount;
                _accRewardPerShare =
                    accRewardPerShare +
                    (reward * DIV_PRECISION) /
                    totalStakedAmount;
            }
        }

        uint256 accumulated =
            (staker.amount * _accRewardPerShare) / DIV_PRECISION;
        return uint256(accumulated - staker.rewardDebt);
    }
}
