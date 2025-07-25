//SPDX-License-Identifier: MIT Licensed
pragma solidity ^0.8.27;

import "./ERC20.sol";

contract Presale {
    address public owner;
    IERC20 public usdt;
    IERC20 public saleToken;

    uint8 public constant USDT_DECIMALS = 6;
    uint8 public constant TOKEN_DECIMALS = 18;

    uint256 public constant TOKEN_PRICE_USDT = 4500; // $0.0045 = 4500 / 1_000_000 (due to usdt is 6 Decimals on BSC)

    uint256 public minPurchase = 10 * 10**6; // $10
    uint256 public maxPurchase = 1000 * 10**6; // $1000

    uint256 public constant VESTING_PERIODS = 10;
    uint256 public vestingInterval = 1 days;

    uint256 public constant TOTAL_PRESALE_TOKENS = 4000_000_000 * (10**18);
    uint256 public totalSoldAmount = 0; 

    bool public presaleEnded = false;
    uint256 public presaleEndTime;

    struct Allocation {
        uint256 owlsAmount;
        uint256 claimed;
        uint256 usdtAmount;
    }

    mapping(address => Allocation) public allocations;

    event TokensPurchased(address indexed buyer, uint256 usdtAmount, uint256 tokenAmount);
    event TokensClaimed(address indexed buyer, uint256 amount);
    event PresaleEnded();
    event Withdrawn(address indexed to, uint256 usdtAmount, uint256 tokenAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier presaleActive() {
        require(!presaleEnded, "Presale has ended");
        _;
    }

    constructor(address _usdt, address _saleToken) {
        require(_usdt != address(0) && _saleToken != address(0), "Zero address provided");
        owner = msg.sender;
        usdt = IERC20(_usdt);
        saleToken = IERC20(_saleToken);
    }

    function buyTokens(uint256 usdtAmount) external presaleActive {
        require(usdtAmount >= minPurchase, "Below minimum purchase");
        require(usdtAmount <= maxPurchase, "Above maximum purchase");

        uint256 allowed = usdt.allowance(msg.sender, address(this));
        require(allowed >= usdtAmount, "Allowance too low");

        uint256 tokenAmount = (usdtAmount * (10 ** TOKEN_DECIMALS)) / TOKEN_PRICE_USDT;
        allocations[msg.sender].owlsAmount += tokenAmount;
        allocations[msg.sender].usdtAmount += usdtAmount;
        totalSoldAmount += tokenAmount;

        require(usdt.transferFrom(msg.sender, address(this), usdtAmount), "USDT transfer failed");

        emit TokensPurchased(msg.sender, usdtAmount, tokenAmount);
    }

    function endPresale() external onlyOwner {
        require(!presaleEnded, "Already ended");
        presaleEnded = true;
        presaleEndTime = block.timestamp;
        emit PresaleEnded();
    }

    function claimTokens() external {
        require(presaleEnded, "Presale not ended");
        Allocation storage user = allocations[msg.sender];
        require(user.owlsAmount > 0, "No allocation");

        uint256 elapsed = block.timestamp - presaleEndTime;
        uint256 unlockedPeriods = elapsed / vestingInterval;

        if (unlockedPeriods > VESTING_PERIODS) {
            unlockedPeriods = VESTING_PERIODS;
        }

        uint256 totalUnlocked = (user.owlsAmount * unlockedPeriods) / VESTING_PERIODS;
        uint256 claimable = totalUnlocked - user.claimed;

        require(claimable > 0, "Nothing to claim");

        user.claimed += claimable;
        require(saleToken.transfer(msg.sender, claimable), "Token transfer failed");

        emit TokensClaimed(msg.sender, claimable);
    }

    function withdrawFunds() external onlyOwner {
        uint256 usdtBalance = usdt.balanceOf(address(this));
        uint256 tokenBalance = saleToken.balanceOf(address(this));

        if (usdtBalance > 0) {
            usdt.transfer(owner, usdtBalance);
        }

        emit Withdrawn(owner, usdtBalance, tokenBalance);
    }

    function updateOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }

    function setMinMax(uint256 _min, uint256 _max) external onlyOwner {
        require(_min <= _max, "Invalid min/max");
        minPurchase = _min;
        maxPurchase = _max;
    }

    // ========== VIEW FUNCTIONS ==========

    function getUserAllocation(address user) external view returns (uint256 total, uint256 claimed, uint256 claimable) {
        Allocation memory a = allocations[user];
        total = a.owlsAmount;
        claimed = a.claimed;
        claimable = 0;

        if (presaleEnded) {
            uint256 elapsed = block.timestamp - presaleEndTime;
            uint256 unlockedPeriods = elapsed / vestingInterval;
            if (unlockedPeriods > VESTING_PERIODS) unlockedPeriods = VESTING_PERIODS;
            uint256 unlocked = (a.owlsAmount * unlockedPeriods) / VESTING_PERIODS;
            claimable = unlocked - a.claimed;
        }
        return (total, claimed, claimable);
    }

    function isPresaleEnded() external view returns (bool) {
        return presaleEnded;
    }

    function getRemainingTokens() external view returns (uint256) {
        return saleToken.balanceOf(address(this));
    }

    function getSaleTokenPrice() external pure returns (uint256 price, uint8 decimals) {
        return (TOKEN_PRICE_USDT, USDT_DECIMALS);
    }

    function getAmountStatus() external view returns (uint256 soldAmount, uint256 totalAmount) {
        return (totalSoldAmount, TOTAL_PRESALE_TOKENS);
    }

    function previewTokenAmount(uint256 usdtAmount) public pure returns (uint256) {
        return (usdtAmount * (10 ** TOKEN_DECIMALS)) / TOKEN_PRICE_USDT;
    }
}

