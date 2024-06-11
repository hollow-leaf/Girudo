// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "./libraries/BindNFT.sol";

contract Member {
    BindNFT bindNFT;
    uint8 level;
    address public issuer;
    string public memberUri;
    mapping(address => uint8) public members;

    constructor (address _issuer, string memory _memberUri, address _bindNFT) {
        issuer = _issuer;
        memberUri = _memberUri;
        initialize(_bindNFT);
    }

    modifier onlyIssuer() {
        require(msg.sender == issuer, "Member: caller is not issuer");
        _;
    }

    modifier onlyMember() {
        require(members[msg.sender] == 1, "Member: caller is not a member");
        _;
    }
    
    function initialize(address _addr) public {
        bindNFT = BindNFT(_addr);
    }

    function addMember(address _member) public onlyIssuer {
        members[_member] = 1;
    }
}