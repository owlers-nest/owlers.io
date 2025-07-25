// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDT is ERC20 {
    constructor() ERC20("Mock USDT", "USDT") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals()); // Mint 1 million USDT
    }

    function decimals() public pure override returns (uint8) {
        return 6; // Same as real USDT
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        // Same logic as OpenZeppelin but explicitly returns true
        _spendAllowance(from, _msgSender(), amount);
        _transfer(from, to, amount);
        return true;
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        _transfer(_msgSender(), to, amount);
        return true;
    }
}