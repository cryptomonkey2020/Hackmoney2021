// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//no need to import safemath in solidity 8

/*
interface IaToken {
    function balanceOf(address _user) external view returns (uint256);
    function redeem(uint256 _amount) external;
}
*/

interface IaveProvider{
    function getLendingPool() external view returns (address);
}
interface IAaveLendingPool {
    function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    
    function withdraw(address asset, uint256 amount, address to) external;
}

contract Donation {
    
    uint public balanceReceived = 0;
    
    IERC20 public usdt = IERC20(0x13512979ADE267AB5100878E2e0f485B568328a4); //Kovan address     USDC address 0xe22da380ee6B445bb8273C81944ADEB6E8450422
    IERC20 public aUsdt = IERC20(0xFF3c8bc103682FA918c954E84F5056aB4DD5189d); //Kovan address USDC
    IaveProvider provider   = IaveProvider(0x88757f2f99175387aB4C6a4b3067c77A695b0349);
    IAaveLendingPool public aaveLendingPool = IAaveLendingPool(provider.getLendingPool()); // Kovan address
    //IAaveLendingPool public aaveLendingPool = IAaveLendingPool(0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe);
    
    uint256 max = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
  
    
    mapping(address => uint256) public userDepositedUsdt;
    mapping(address => uint256) public orgDepositedUsdt;
    
    constructor()   {
        
        usdt.approve(address(aaveLendingPool), max);
        aUsdt.approve(address(aaveLendingPool), max);

    }
    
    function receiveETH() public payable {
        balanceReceived += msg.value;
    }
    
    // User deposit USDT and the A token goes to this contract
    function userDepositUsdt(uint256 _amountInUsdt) external {
        userDepositedUsdt[msg.sender] = _amountInUsdt;
        orgDepositedAUsdt(org) = 
        require(usdt.transferFrom(msg.sender, address(this), _amountInUsdt), "USDC Transfer failed!");
        aUsdt.permit(msg.sender, address(this), _amountInUsdt, type(uint).max, );
        aaveLendingPool.deposit(address(usdt), _amountInUsdt, msg.sender, 0);
    }
    
    // For testing pupose withdrawing to this contract now
    function userWithdrawUsdt(uint256 _amountInUsdt) external {
        require(userDepositedUsdt[msg.sender] >= _amountInUsdt, "You cannot withdraw more than deposited!");
        userDepositedUsdt[msg.sender] = userDepositedUsdt[msg.sender] - _amountInUsdt;
        aaveLendingPool.withdraw(address(aUsdt), _amountInUsdt, msg.sender); 
        
       
    }
}