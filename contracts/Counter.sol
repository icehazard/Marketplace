// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Counter {

    int count;

    function increment() public {
        count ++;
    }

    function getCount() public view returns (int) {
        return count;
    }

}