// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract UpfireStore is Ownable {
    using SafeMath for uint256;

    mapping(bytes32 => mapping(address => uint256)) private payments;
    mapping(bytes32 => mapping(address => uint256)) private paymentDates;
    mapping(address => uint256) private balances;
    mapping(address => uint256) private totalReceiving;
    mapping(address => uint256) private totalSpending;

    constructor() {}

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function totalReceivingOf(address _owner)
        public
        view
        returns (uint256 balance)
    {
        return totalReceiving[_owner];
    }

    function totalSpendingOf(address _owner)
        public
        view
        returns (uint256 balance)
    {
        return totalSpending[_owner];
    }

    function check(
        bytes32 _hash,
        address _from,
        uint256 _availablePaymentTime
    ) public view returns (uint256 amount) {
        uint256 _amount = payments[_hash][_from];
        uint256 _date = paymentDates[_hash][_from];
        if (_amount > 0 && (_date + _availablePaymentTime) > block.timestamp) {
            return _amount;
        } else {
            return 0;
        }
    }

    function payment(
        bytes32 _hash,
        address _from,
        uint256 _amount
    ) public onlyOwner returns (bool result) {
        payments[_hash][_from] = payments[_hash][_from].add(_amount);
        paymentDates[_hash][_from] = block.timestamp;
        return true;
    }

    function subBalance(address _owner, uint256 _amount)
        public
        onlyOwner
        returns (bool result)
    {
        require(balances[_owner] >= _amount);
        balances[_owner] = balances[_owner].sub(_amount);
        totalSpending[_owner] = totalSpending[_owner].add(_amount);
        return true;
    }

    function addBalance(address _owner, uint256 _amount)
        public
        onlyOwner
        returns (bool result)
    {
        balances[_owner] = balances[_owner].add(_amount);
        totalReceiving[_owner] = totalReceiving[_owner].add(_amount);
        return true;
    }
}
