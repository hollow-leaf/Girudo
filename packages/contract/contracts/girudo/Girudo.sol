// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import { IHypercertToken } from "./interfaces/IHypercertToken.sol";

contract Girudo {
  IHypercertToken hypercerts;

  address public issuer;
  string public girudoUri;
  mapping(address => uint8) public girudoMembers;

  constructor (address _issuer, string memory _girudoUri, address _hypercerts) {
    issuer = _issuer;
    girudoUri = _girudoUri;
    initialize(_hypercerts);
  }

  modifier onlyIssuer() {
    require(msg.sender == issuer, "Girudo: caller is not issuer");
    _;
  }

  modifier onlyMember() {
    require(girudoMembers[msg.sender] == 1, "Girudo: caller is not a member");
    _;
  }
  
  function initialize(address _addr) public {
    hypercerts = IHypercertToken(_addr);
  }

  function addMember(address _member) public onlyIssuer {
    girudoMembers[_member] = 1;
  }
}
