// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './interfaces/IERC20Mintable.sol';
import './libraries/TransferHelper.sol';

contract UPRSwap {
    uint256 private rate;
    address private UFR;
    address private UPR;

    event SwapRate(uint256 amount);
    event Swap(address account, uint256 input, uint256 output);

    modifier onlyAdmin(address _address) {
        require(IERC20Mintable(UPR).isAdmin(_address));
        _;
    }

    constructor(address _UFR, address _UPR) {
        UFR = _UFR;
        UPR = _UPR;
        rate = 1;
    }

    function getSwapRate() public view returns (uint256) {
        return rate;
    }

    function setSwapRate(uint256 newRate) public onlyAdmin(msg.sender) {
        require(newRate > 0, 'SwapRate must more than 0');
        rate = newRate;
        emit SwapRate(newRate);
    }

    function swap(uint256 amount) public {
        TransferHelper.safeTransferFrom(UFR, msg.sender, address(this), amount);
        uint256 outputAmount = amount * rate;
        IERC20Mintable(UPR).mint(msg.sender, outputAmount);
        emit Swap(msg.sender, amount, outputAmount);
    }
}
