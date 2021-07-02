// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IAaveProvider {
    function getLendingPool() external view returns (address);
}