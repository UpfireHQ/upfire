// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC20Adminable.sol';

contract UPR is ERC20Adminable {
    uint256 public constant INITIAL_SUPPLY = 1000000000 * (10**uint256(18));

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor() ERC20Adminable('Project Upfire', 'UPR') {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
