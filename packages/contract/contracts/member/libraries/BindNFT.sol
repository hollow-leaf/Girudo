// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract BindNFT {
    mapping(uint256 => address) public creators;
    mapping(address => mapping(uint256 => address)) public nftMap;
    // constructor() ERC1155("https://api.bindnft.com/{id}.json") {}
    function addCreator(uint256 id, address creator) public {
        creators[id] = creator;
    }
}