// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

interface IaveProvider{

    function getLendingPool() external view returns (address);

}

interface IAaveLendingPool {

    function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;

    function withdraw(address asset, uint256 amount, address to) external;

}

contract AaveExample {

    struct Organisation {
        uint256 aavePercentage;
        uint256 aaveAmount;
        bool created;
    }

    IERC20 private usdt = IERC20(0x13512979ADE267AB5100878E2e0f485B568328a4);
    IERC20 private aUsdt = IERC20(0xFF3c8bc103682FA918c954E84F5056aB4DD5189d);
    IaveProvider private provider = IaveProvider(0x88757f2f99175387aB4C6a4b3067c77A695b0349);
    IAaveLendingPool private aaveLendingPool = IAaveLendingPool(provider.getLendingPool());
    mapping(address => uint256) public users;
    mapping(address => Organisation) public organisations;

    event organisationCreated(address organisation, uint256 aavePercentage);
    event userDeposit(address user, address organisation, uint256 amount);
    event organisationWithdrawal(address organisation, uint256 amount);

    constructor() {
        usdt.approve(address(aaveLendingPool), 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
        aUsdt.approve(address(aaveLendingPool), 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
    }

    /// @notice function to create an organisation with its configuration. Emits an organisationCreated event.
    /// @param aavePercentage organisation decides to deposit into aave
    function createOrganisation (uint256 aavePercentage) public {
        require(aavePercentage <= 100, "Percentage can't be greather than 100");
        organisations[msg.sender].aavePercentage = aavePercentage;
        organisations[msg.sender].created = true;
        emit organisationCreated(msg.sender, aavePercentage);
    }

    /// @notice function to deposit into aave organisation address
    /// @param _usdt amount to deposit to organisation
    /// @param _organisation address to deposit
    function deposit(uint256 _usdt, address _organisation) public {
        require(organisations[_organisation].created, "Organisation doesn't exist");
        require(usdt.transferFrom(msg.sender, address(this), _usdt), "USDT Transfer failed!");
        users[msg.sender] += _usdt;
        organisations[_organisation].aaveAmount += _usdt;
        aaveLendingPool.deposit(address(usdt), _usdt, _organisation, 0);
        emit userDeposit(msg.sender, _organisation, _usdt);
    }

    /// @notice function to get balance of an organisation address
    /// @param _organisation to find balance
    function organisationBalance(address _organisation) public view returns (uint256) {
        require(organisations[_organisation].created, "Organisation doesn't exist");
        return aUsdt.balanceOf(_organisation);
    }

    /// @notice function that allows an organisation to withdraw an amount from aave.
    /// In this moment, it doesn't work because smart contract doesn't have 'permit' approval from organisation
    /// If smart contract has 'permit' approval from organisation, organisation can 'withdraw' directly from aave. In that case, function could be unnecessary.
    /// @param amount to withdraw
    function withdraw(uint256 amount) public {
        require(organisations[msg.sender].created, "Organisation doesn't exist");
        require(organisations[msg.sender].aaveAmount >= amount, "Insufficient funds");
        organisations[msg.sender].aaveAmount -= amount;
        aaveLendingPool.withdraw(address(usdt), amount, msg.sender);
        emit organisationWithdrawal(msg.sender, amount);
    }

}