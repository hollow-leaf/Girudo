// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "./Girudo.sol";

contract GirudoFactory {
    event NewGirudo(address indexed girudo, address indexed owner);

    function register(string memory uri, address cert) external {
        address girudo = address(new Girudo(msg.sender, uri, cert));
        emit NewGirudo(girudo, msg.sender);
    }
}