// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol';

interface IaToken {
    function balanceOf(address _user) external view returns (uint256);
    function redeem(uint256 _amount) external;
}

interface IaveProvider{
    function getLendingPool() external view returns (address);
}
interface IAaveLendingPool {
    function deposit(address _reserve, uint256 _amount, uint16 _referralCode) external;
}

contract AaveExample {
    IERC20 public usdc = IERC20(0xe22da380ee6B445bb8273C81944ADEB6E8450422); //Kovan address
    IaToken public aUsdc = IaToken(0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0); //Kovan address
    IaveProvider provider = IaveProvider(address(0xE0fBa4Fc209b4948668006B2bE61711b7f465));
    IAaveLendingPool public aaveLendingPool = IAaveLendingPool(provider.getLendingPool()); // Kovan address
    
    mapping(address => uint256) public userDepositedUsdc;
    
    constructor()  {
        usdc.approve(address(aaveLendingPool), type(uint256).max);
    }
    
    function userDepositUsdc(uint256 _amountInUsdc) external {
        userDepositedUsdc[msg.sender] = _amountInUsdc;
        require(usdc.transferFrom(msg.sender, address(this), _amountInUsdc), "USDC Transfer failed!");
        aaveLendingPool.deposit(address(usdc), _amountInUsdc, 0);
    }
    
    function userWithdrawDai(uint256 _amountInUsdc) external {
        require(userDepositedUsdc[msg.sender] >= _amountInUsdc, "You cannot withdraw more than deposited!");

        aUsdc.redeem(_amountInUsdc);
        require(usdc.transferFrom(address(this), msg.sender, _amountInUsdc), "USDC Transfer failed!");
        
        userDepositedUsdc[msg.sender] = userDepositedUsdc[msg.sender] - _amountInUsdc;
    }
}
