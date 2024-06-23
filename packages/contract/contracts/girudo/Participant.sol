// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

contract Partcipant {
    mapping(address => uint256) public participants;
    // uint256 = 0: not part of any type
    // uint256 = 1: frontend developer
    // uint256 = 2: backend developer
    function addParticipant(address _participant, uint256 _type) public {
        participants[_participant] += _type;
    }

    function removeParticipant(address _participant, uint256 _type) public {
        participants[_participant] -= _type;
    }
}