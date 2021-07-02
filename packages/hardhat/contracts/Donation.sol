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

    address private  AAVE_PROVIDER = 0x88757f2f99175387aB4C6a4b3067c77A695b0349;
    IERC20 private usdc  = IERC20(0xe22da380ee6B445bb8273C81944ADEB6E8450422); // Kovan
    IERC20 private aUsdc = IERC20(0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0); // Kovan
    IERC20 private dai   = IERC20(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa);
    

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
    
    /*
        Getting Dai tokens from uniswap for deposited ETH
        In Kovan uniswap Dai is not the same as AAVE Dai.
        on Mainnet these tokens will occur interest in the Aave protocol
    */
    receive() external payable {
         // Execute trade on Uniswap
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = address(dai);

        uint[] memory amounts = uniswapRouter.swapExactETHForTokens{ value: msg.value }(0, path, address(this), block.timestamp + 10);
        balanceReceived += amounts[1]; // Update Dai amount

    }
    
    /*
        User deposit _amount after approve the contract to spend this amount
        Depositing to a specific campaign
    */
    function userDepositUsdc(uint _amount, uint _campaignId) external {
        //Spending allowence done in the GUI
        require(campaigns[_campaignId]._state == campaignstate.Active, "Organization not exist");
        userDepositedUsdc[msg.sender][_campaignId] += _amount;                                  //Tarcking User deposits
        campaigns[_campaignId]._usdcBalance = campaigns[_campaignId]._usdcBalance - _amount;
        require(usdc.transferFrom(msg.sender, address(this), _amount), "USDC Transfer failed!");

        aaveLendingPool.deposit(address(usdc), _amount, address(this), 0);
        emit DepositedToCharity(_amount, 0, _campaignId); // Assuming USDC is asset 0
        totalUsdcBalance += _amount;
     }
      /*
        Withdraw function will be implement in mainnet like a farm contract
        with shares and part of the total share for each campaign
        Since Aave on Kovan doesn't behave the same as Mainnet ( the Atokens don't occur interest)

      */
     function withdrawInterest(uint _campaignId) external {
         //For now it will work with only 1 organization since the way the yeild is bearing take from cake contract
         require(campaigns[_campaignId]._owner == msg.sender, "Only Organization adming can withdraw");

         uint aUsdcTotal = aUsdc.balanceOf(address(this));
         uint256 totalInterest = aUsdcTotal - totalUsdcBalance; 
         if (totalInterest > 0){
            uint poolInterest = totalInterest / activeCampaigns;
            campaigns[_campaignId]._usdcBalance -= poolInterest ;
            aaveLendingPool.withdraw(address(usdc), poolInterest, address(this)); 
            require(usdc.transfer(msg.sender,  poolInterest), "USDC Transfer failed!"); 
            emit WithdrawCharityInterest(poolInterest, 0, _campaignId);
         }
     }

    /*
        Hard coded withdraw from the pool by the pool owner
        Will not be use in Mainnet

    */
    function withdrawInterestTest(uint _campaignId) external {
         //For now it will work with only 1 organization since the way the yeild is bearing take from cake contract

        uint poolInterest = 100;
        campaigns[_campaignId]._usdcBalance -= poolInterest ;
        aaveLendingPool.withdraw(address(usdc), poolInterest, address(this)); 
        require(usdc.transfer(msg.sender,  poolInterest), "USDC Transfer failed!"); 
        emit WithdrawCharityInterest(poolInterest, 0, _campaignId);
         
     }

    /*
        Withdraw function will be implement in mainnet like a farm contract
        with shares and part of the total share for each campaign
        Since Aave on Kovan doesn't behave the same as Mainnet ( the Atokens don't occur interest)

    */

    function withdrawAllFunds(uint _campaignId) external {
        //For now it will work with only 1 organization since the way the yeild is bearing take from cake contract
        require(campaigns[_campaignId]._owner == msg.sender, "Only Organization adming can withdraw");

        uint aUsdcTotal = aUsdc.balanceOf(address(this));
        uint totalInterest = aUsdcTotal - totalUsdcBalance; 
        uint poolInterest = totalInterest / activeCampaigns; //Use only for MVP
        activeCampaigns--; 
        totalUsdcBalance -= campaigns[_campaignId]._usdcBalance;

        uint totalToWithdraw = campaigns[_campaignId]._usdcBalance + poolInterest;
        campaigns[_campaignId]._usdcBalance = 0;
        campaigns[campaignIndex]._state = campaignstate.Stopped;


        aaveLendingPool.withdraw(address(usdc), totalToWithdraw, address(this)); 
        require(usdc.transfer(msg.sender,  totalToWithdraw), "USDC Transfer failed!"); 
        emit WithdrawCharityInterest(totalToWithdraw, 0, _campaignId);

    }

}
