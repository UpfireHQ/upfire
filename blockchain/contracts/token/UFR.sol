// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract UFR is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1000000000 * (10**uint256(18));

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor() ERC20('Project OLD Upfiring', 'UFR') {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
