// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    constructor() payable {
        console.log("Yo, yo, I am a contract and I am smart");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    uint256 totalWaves;
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;
    mapping(address => uint256) public lastWaved;

    function wave(string memory _message) public {
        require(
            lastWaved[msg.sender] + 30 seconds < block.timestamp,
            "You have to wait till after 15 mins"
        );
        lastWaved[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved", msg.sender);
        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp) % 100;
        console.log("The random number generated is: %d", seed);

        if (seed <= 50) {
            console.log("%s won!!", msg.sender);

            uint256 prizeMoney = 0.0001 ether;
            require(
                prizeMoney <= address(this).balance,
                "Trying to withdraw more money than we have"
            );
            (bool success, ) = (msg.sender).call{value: prizeMoney}("");
            require(success, "Failed to withdraw money from contract");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function listAllWavers() public view returns (Wave[] memory) {
        return waves;
    }
}
