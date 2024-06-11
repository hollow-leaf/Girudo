// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

interface IParticipant {
    function addParticipant(address _participant, uint256 _type) external;
    function removeParticipant(address _participant, uint256 _type) external;
}