// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import './AdminRole.sol';

contract ERC20Adminable is ERC20, AdminRole {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    /**
     * @dev Function to mint tokens
     * @param to The address that will receive the minted tokens.
     * @param value The amount of tokens to mint.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(address to, uint256 value)
        public
        onlyAdmin(msg.sender)
        returns (bool)
    {
        _mint(to, value);
        return true;
    }

    function burn(address from, uint256 value)
        public
        onlyAdmin(msg.sender)
        returns (bool)
    {
        _burn(from, value);
        return true;
    }
}
