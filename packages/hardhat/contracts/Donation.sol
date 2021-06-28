// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

interface IaveProvider{
    function getLendingPool() external view returns (address);
}
interface IAaveLendingPool {
    function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    
    function withdraw(address asset, uint256 amount, address to) external;
}

contract Donation is Ownable {
    

    enum OrganizationState{Uninitialize, Active, Stopped}

    struct $_Organization {
        address _organizationWallet; //The organization wallet which is the only one can withdraw
        string _identifier; // Organization name
        uint _usdcBalance;
        uint _aUsdcBalance;
        Donation.OrganizationState _state;
        
    }
    //Will use as the ID of the organization
    mapping ( uint => $_Organization) public organizations;
    uint organizationIndex; //Set to 0 on deploy by default

    IERC20 public usdc = IERC20(0xe22da380ee6B445bb8273C81944ADEB6E8450422); // Kovan
    IERC20 public aUsdc = IERC20(0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0); // Kovan
    IaveProvider provider   = IaveProvider(0x88757f2f99175387aB4C6a4b3067c77A695b0349);
    IAaveLendingPool public aaveLendingPool = IAaveLendingPool(provider.getLendingPool()); // Kovan address 0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe
    
    uint256 max = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    
    uint public balanceReceived = 0;

    mapping(address => mapping(uint => uint)) userDepositedUsdc;

    //Mapping organization address to balance
    //We want the Charity/Organization be able to withdraw
    mapping(address => uint256) public orgDepositedUsdc;

    mapping(uint => address) public orgIdToAddress;
    
    //Events
    event OrganizationCreated(uint _id, address _organization);
    event DepositedToCharity(uint _amount, uint _assetId, uint _organisationId);
    event WithdrawCharityInterest(uint _amount, uint _assetId, uint _organisationId);

    

    constructor() {
        usdc.approve(address(aaveLendingPool), max);
        aUsdc.approve(address(aaveLendingPool), max);
        createOrganization("DeDP", address(0xc1f23e093c314Ea704Af2c1000f9Bf20a4d2D2B4)); // Just a demo

    }
    //Setting up new organization
    function createOrganization(string memory _identifier, address _organizationWallet) public {

        organizations[organizationIndex]._organizationWallet = _organizationWallet;
        organizations[organizationIndex]._identifier = _identifier;
        organizations[organizationIndex]._state = OrganizationState.Active;
        emit OrganizationCreated(organizationIndex, _organizationWallet);
        organizationIndex++;
    
    } 
    
    //Doesn't have a real value now .. in the future will interact with Uniswap to change to USDC
    function receiveETH() public payable {
        balanceReceived += msg.value;
    }
    
    // User deposit USDT and the A token goes to this contract
    function userDepositUsdc(uint _amount, uint _orgnizationId) external {
        //Spending allowence done in the GUI
        require(organizations[_orgnizationId]._state == OrganizationState.Active, "Organization not exist");
        userDepositedUsdc[msg.sender][_orgnizationId] += _amount;                                  //Tarcking User deposits
        organizations[_orgnizationId]._usdcBalance += _amount;
        require(usdc.transferFrom(msg.sender, address(this), _amount), "USDC Transfer failed!");

        uint balanceBeforeDeposit = aUsdc.balanceOf(address(this));
        aaveLendingPool.deposit(address(usdc), _amount, address(this), 0);
        emit DepositedToCharity(_amount, 0, _orgnizationId); // Assuming USDC is asset 0
        organizations[_orgnizationId]._aUsdcBalance += aUsdc.balanceOf(address(this)) - balanceBeforeDeposit;
     }

    function getOrganizationBalance(uint _orgnizationId) public view returns(uint amount){
        amount = organizations[_orgnizationId]._usdcBalance;
    }

    
    // For testing pupose only

     function userWithdrawUsdc(uint _amount, uint _orgnizationId ) external {

        //Our organization have enough balance to withdraw
        require(organizations[_orgnizationId]._usdcBalance >= _amount, "You cannot withdraw more than deposited!");
        require(organizations[_orgnizationId]._organizationWallet == msg.sender, "Only Organization adming can withdraw");
        //Only because it's a testing funciton
        organizations[_orgnizationId]._usdcBalance = organizations[_orgnizationId]._usdcBalance - _amount;
        organizations[_orgnizationId]._aUsdcBalance = organizations[_orgnizationId]._aUsdcBalance - _amount;

        aaveLendingPool.withdraw(address(usdc), _amount, address(this)); 
        require(aUsdc.transfer(msg.sender,  _amount), "USDC Transfer failed!");
        emit WithdrawCharityInterest(_amount, 0, _orgnizationId);
     }

     function withdrawOrgInterest(uint _orgnizationId) external {
         //Calculate the gained interest
     }
}
