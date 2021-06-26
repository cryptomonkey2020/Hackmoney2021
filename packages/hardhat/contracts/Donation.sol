// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IaveProvider{
    function getLendingPool() external view returns (address);
}
interface IAaveLendingPool {
    function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    
    function withdraw(address asset, uint256 amount, address to) external;
}

contract Donation {
    
    uint public balanceReceived = 0;
    
    IERC20 public usdc = IERC20(0xe22da380ee6B445bb8273C81944ADEB6E8450422); // Kovan
    IERC20 public aUsdc = IERC20(0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0); // Kovan
    IaveProvider provider   = IaveProvider(0x88757f2f99175387aB4C6a4b3067c77A695b0349);
    IAaveLendingPool public aaveLendingPool = IAaveLendingPool(provider.getLendingPool()); // Kovan address
    //IAaveLendingPool public aaveLendingPool = IAaveLendingPool(0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe);
    
    uint256 max = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    
    mapping(address => mapping(uint => uint)) userDepositedUsdc;
    
    constructor() {
        usdc.approve(address(aaveLendingPool), max);
        aUsdc.approve(address(aaveLendingPool), max);
    }
    
    function receiveETH() public payable {
        balanceReceived += msg.value;
    }
    
    // User deposit USDT and the A token goes to this contract
    function userDepositUsdc(uint _amount, uint _organisationId) external {
        // require(usdc.allowance(msg.sender, address(this)) >= _amount, "Approve spending first");
        userDepositedUsdc[msg.sender][_organisationId] += _amount;
        require(usdc.transferFrom(msg.sender, address(this), _amount), "USDC Transfer failed!");
        aaveLendingPool.deposit(address(usdc), _amount, address(this), 0);
    }
    
    // For testing pupose withdrawing to this contract now
    // function userWithdrawUsdc(uint256 _amountInUsdc) external {
    //     require(userDepositedUsdc[msg.sender] >= _amountInUsdc, "You cannot withdraw more than deposited!");
    //     userDepositedUsdc[msg.sender] = userDepositedUsdc[msg.sender] - _amountInUsdc;
    //     aaveLendingPool.withdraw(address(aUsdc), _amountInUsdc, msg.sender); 
    // }
}