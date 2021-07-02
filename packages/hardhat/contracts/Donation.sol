// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";  //import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; //import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";


import "./interfaces/IAaveProvider.sol";
import "./interfaces/IAaveLendingPool.sol";
import "./interfaces/IUniswapV2Router02.sol";



contract Donation is Ownable {
    

    enum campaignstate{Uninitialize, Active, Stopped}

    struct $_Campaign {
        address _owner; //The Campaign wallet which is the only one can withdraw
        uint _usdcBalance;

        uint _orgId;
        Donation.campaignstate _state;
        
    }
    //Will use as the ID of the organization
    mapping ( uint => $_Campaign) public campaigns;
    uint campaignIndex; //Set to 0 on deploy by default

    address public  AAVE_PROVIDER = 0x88757f2f99175387aB4C6a4b3067c77A695b0349;
    IERC20 public usdc  = IERC20(0xe22da380ee6B445bb8273C81944ADEB6E8450422); // Kovan
    IERC20 public aUsdc = IERC20(0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0); // Kovan
    IERC20 public dai   = IERC20(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa);
    

    IUniswapV2Router02 uniswapRouter = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);//Uniswap router address
    IAaveProvider provider   = IAaveProvider(AAVE_PROVIDER);
    IAaveLendingPool public aaveLendingPool = IAaveLendingPool(provider.getLendingPool()); // Kovan address 0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe
    
    uint256 max = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    
    uint public balanceReceived = 0;
    uint public totalUsdcBalance = 0;
    uint public activeCampaigns = 0;

    mapping(address => mapping(uint => uint)) userDepositedUsdc;

    
    //Events
    event CampaignCreated(uint _id, address _organization);
    event DepositedToCharity(uint _amount, uint _assetId, uint _organisationId);
    event WithdrawCharityInterest(uint _amount, uint _assetId, uint _organisationId);


    constructor() {
        usdc.approve(address(aaveLendingPool), max);
        aUsdc.approve(address(aaveLendingPool), max);
        dai.approve(address(aaveLendingPool), max);
        createCampaign(0, address(0xc1f23e093c314Ea704Af2c1000f9Bf20a4d2D2B4)); // Just a demo

    }
    //Setting up new organization
    function createCampaign(uint _orgId, address _owner) public {

        campaigns[campaignIndex]._owner = _owner;
        campaigns[campaignIndex]._state = campaignstate.Active;
        campaigns[campaignIndex]._orgId = _orgId;
        emit CampaignCreated(campaignIndex, _owner);
        campaignIndex++;
        activeCampaigns++;
    
    } 
    
    //Doesn't have a real value now .. in the future will interact with Uniswap to change to USDC
    function receiveETH() public payable {
         // Execute trade on Uniswap
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = address(dai);

        uint[] memory amounts = uniswapRouter.swapExactETHForTokens{ value: msg.value }(0, path, address(this), block.timestamp + 10);
        balanceReceived += amounts[1]; // The amount of Dai

    }
    
    // User deposit USDT and the A token goes to this contract
    function userDepositUsdc(uint _amount, uint _campaingId) external {
        //Spending allowence done in the GUI
        require(campaigns[_campaingId]._state == campaignstate.Active, "Organization not exist");
        userDepositedUsdc[msg.sender][_campaingId] += _amount;                                  //Tarcking User deposits
        campaigns[_campaingId]._usdcBalance += _amount;
        require(usdc.transferFrom(msg.sender, address(this), _amount), "USDC Transfer failed!");

        aaveLendingPool.deposit(address(usdc), _amount, address(this), 0);
        emit DepositedToCharity(_amount, 0, _campaingId); // Assuming USDC is asset 0
        totalUsdcBalance += _amount;
     }
    // For testing pupose only
     function userWithdrawUsdc(uint _amount, uint _campaingId ) external {

        //Our organization have enough balance to withdraw
        require(campaigns[_campaingId]._usdcBalance >= _amount, "You cannot withdraw more than deposited!");
        require(campaigns[_campaingId]._owner == msg.sender, "Only Organization adming can withdraw");
        //Only because it's a testing funciton
        campaigns[_campaingId]._usdcBalance = campaigns[_campaingId]._usdcBalance - _amount;
    

        aaveLendingPool.withdraw(address(usdc), _amount, address(this)); 
        require(usdc.transfer(msg.sender,  _amount), "USDC Transfer failed!"); 
        emit WithdrawCharityInterest(_amount, 0, _campaingId);
     }

     function withdrawInterest(uint _campaingId) external {
         //For now it will work with only 1 organization since the way the yeild is bearing take from cake contract
         require(campaigns[_campaingId]._owner == msg.sender, "Only Organization adming can withdraw");

         uint aUsdcTotal = aUsdc.balanceOf(address(this));
         uint256 totalInterest = aUsdcTotal - totalUsdcBalance; 
         if (totalInterest > 0){
            uint poolInterest = totalInterest / activeCampaigns;
            aaveLendingPool.withdraw(address(usdc), poolInterest, address(this)); 
            require(usdc.transfer(msg.sender,  poolInterest), "USDC Transfer failed!"); 
            emit WithdrawCharityInterest(poolInterest, 0, _campaingId);
         }
     }

    function withdrawInterestTest(uint _campaingId) external {
         //For now it will work with only 1 organization since the way the yeild is bearing take from cake contract

        uint poolInterest = 100;
        aaveLendingPool.withdraw(address(usdc), poolInterest, address(this)); 
        require(usdc.transfer(msg.sender,  poolInterest), "USDC Transfer failed!"); 
        emit WithdrawCharityInterest(poolInterest, 0, _campaingId);
         
     }

    function withdrawAllFunds(uint _campaingId) external {
        //For now it will work with only 1 organization since the way the yeild is bearing take from cake contract
        require(campaigns[_campaingId]._owner == msg.sender, "Only Organization adming can withdraw");

        uint aUsdcTotal = aUsdc.balanceOf(address(this));
        uint totalInterest = aUsdcTotal - totalUsdcBalance; 
        uint poolInterest = totalInterest / activeCampaigns; //Use only for MVP
        activeCampaigns--; 
        totalUsdcBalance -= campaigns[_campaingId]._usdcBalance;

        uint totalToWithdraw = campaigns[_campaingId]._usdcBalance + poolInterest;
        campaigns[_campaingId]._usdcBalance = 0;
        campaigns[campaignIndex]._state = campaignstate.Stopped;


        aaveLendingPool.withdraw(address(usdc), totalToWithdraw, address(this)); 
        require(usdc.transfer(msg.sender,  totalToWithdraw), "USDC Transfer failed!"); 
        emit WithdrawCharityInterest(totalToWithdraw, 0, _campaingId);

    }

    function _distributeInterestToActiveCampaign(uint poolInterest) private {
        //Will have to distribute
    }
}
