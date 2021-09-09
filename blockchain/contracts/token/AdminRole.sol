// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../libraries/Roles.sol';

abstract contract AdminRole {
    using Roles for Roles.Role;

    event AdminAdded(address indexed account);
    event AdminRemoved(address indexed account);

    Roles.Role private _admins;
    address[] private addressIndices;

    constructor() {
        _addAdmin(msg.sender);
    }

    modifier onlyAdmin(address _address) {
        require(_admins.has(_address));
        _;
    }

    function getAdmins() public view returns (address[] memory) {
        return addressIndices;
    }

    function isAdmin(address account)
        public
        view
        onlyAdmin(account)
        returns (bool)
    {
        return _admins.has(account);
    }

    function addAdmin(address account) public onlyAdmin(msg.sender) {
        if (!_admins.has(account)) {
            _addAdmin(account);
            addressIndices.push(account);
        } else {
            revert('this account already exists');
        }
    }

    function renounceAdmin(address account) public onlyAdmin(msg.sender) {
        _removeAdmin(account);
    }

    function _addAdmin(address account) internal {
        _admins.add(account);
        emit AdminAdded(account);
    }

    function _removeAdmin(address account) internal {
        _admins.remove(account);
        emit AdminRemoved(account);
    }
}
