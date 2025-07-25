// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./Context.sol";
import "./ERC20.sol";
import "./ERC20MetaData.sol";
import "./SafeMath.sol";
import "./Ownable.sol";

/** Tokenomics **
*
* - Total Supply
*   10,000,000,000 (== 10 ** 10)
* - Total Decimal
*   10 ** 10
* - Token Name & Symbol
*   "OWL", "OWL"
*
* - Token distribution
*   40%     public sale
*   25%     Staking Rewards 
*   20%     Liquidity Pools (for DEX, And CEX)
*   10%     Vault (were we accept the payment)
*   5%      Rewards & Airdrop 
*/
 
contract OwlToken is Context, IERC20, IERC20Metadata, Ownable {
    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    uint256 private _totalSupply;
    bool public mintingFinishedPermanent = false;
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    address public _creator;
    
    uint256 _mintTimeStamp = block.timestamp;
    
    uint256 _deadlineTeamTimeStamp = block.timestamp + 3 * 3600 * 24 * 365;
    
    // Token distribution amount
    uint256 public _presaleAmount;
    uint256 public _vaultAmount;
    uint256 public _cexReseveredAmount;
    // uint256 public _teamAmount;
    uint256 public _dexAmount;
    uint256 public _airdropAmount;
    
    // Token distribution address
    address presaleAddress;
    address vaultAddress;
    address cexReservedAddress;
    // address teamAddress;
    address dexAddress;
    address airdropAddress;
    /**
     * @dev Sets the values for {name}, {symbol} and {decimals}.
     *
     *
     * All two of these values are immutable: they can only be set once during
     * construction.
     */
    constructor () {
        _name = "OWL";
        _symbol = "OWL";
        _decimals = 18;
        _totalSupply = 10_000_000_000 * (10**_decimals);
        
        _presaleAmount = 4000_000_000 * (10**_decimals); // 40% owl-presale_account
        _vaultAmount = 2000_000_000 * (10**_decimals); // 20% owl-staking-account
        _cexReseveredAmount = 2000_000_000 * (10**_decimals); // 20% owl-cex-reserved-account
        _dexAmount = 1_500_000_000 * (10**_decimals); // 15% owl-dex-account
        _airdropAmount = 500_000_000 * (10**_decimals); // 5% owl-airdrop-account
        
        // Test address
        presaleAddress = 0xeC82658b490DDf2e2f76e8249c21c8EBB2f667d1;
        vaultAddress = 0xEf624D342C150D677b521b4ee76B7b21C19B8f14;
        cexReservedAddress = 0x92f50a9594497271325a4a289ca6637a3E499d8A;
        dexAddress = 0x305385Fb78680Ee50637D423e638d2E88844eeff;
        airdropAddress = 0x06De3E07D8939bcc3Ac618854F96D0b46BFc0D1E;

        // Real address
        // presaleAddress = ;
        // stakingAddress = ;
        // cexReservedAddress = ;
        // teamAddress = ;
        // dexAddress = ;
        // airdropAddress = ; 

        require(_totalSupply == _presaleAmount + _vaultAmount + _cexReseveredAmount + _dexAmount + _airdropAmount, "BALCN");
        _mint(_msgSender(), _totalSupply);
        mintingFinishedPermanent = true;
        
        // Initial Send tokens
        transfer(presaleAddress, _presaleAmount);
        transfer(vaultAddress, _vaultAmount);
        transfer(cexReservedAddress, _cexReseveredAmount);
        transfer(dexAddress, _dexAmount);
        transfer(airdropAddress, _airdropAmount);
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless this function is
     * overridden;
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(sender, recipient, amount);

        uint256 currentAllowance = _allowances[sender][_msgSender()];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _approve(sender, _msgSender(), currentAllowance - amount);

        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender] + addedValue);
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        uint256 currentAllowance = _allowances[_msgSender()][spender];
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        _approve(_msgSender(), spender, currentAllowance - subtractedValue);

        return true;
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        uint256 senderBalance = _balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        _balances[sender] = senderBalance - amount;
        _balances[recipient] += amount;

        emit Transfer(sender, recipient, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(!mintingFinishedPermanent,"cant be minted anymore!");
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        //_totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    } 

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        _balances[account] = accountBalance - amount;
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be to transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
