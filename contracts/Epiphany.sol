// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Epiphany is
    Initializable,
    ERC1155Upgradeable,
    AccessControlUpgradeable,
    ERC1155SupplyUpgradeable
{
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");

    uint256[] public creatorPercentage;
    uint256[] public fundContributorPercentage;
    uint256[] public workContributorPercentage;

    // modifiers

    modifier notEnoughToken(uint256 id, uint256 amount) {
        uint256 tokenSupply = 0;
        if (id == 1) {
            tokenSupply = creatorPercentage[id];
            require(amount < tokenSupply, "not enough Token in the supply");
            _;
        }
        if (id == 2) {
            tokenSupply = fundContributorPercentage[id];
            require(amount < tokenSupply, "not enough Token in the supply");
            _;
        }
        if (id == 3) {
            tokenSupply = workContributorPercentage[id];
            require(amount < tokenSupply, "not enough Token in the supply");
            _;
        }
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ERC1155_init(""); // add base URI
        __AccessControl_init();
        __ERC1155Supply_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    // mint an Epiphany , Metadata to be stored on IPFS

    function mintEpiphany(
        address creator,
        uint256 id,
        bytes memory data
    ) public {
        _mint(creator, id, 0, data);
    }

    //

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public {
        // supply should be defined by amounts
        _mintBatch(to, ids, amounts, data);
    }

    // id here is the id of the token type ( creator, funding, work)
    function contribute(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external payable {
        // condition that not more funding than 1 third of the whole supply
        safeTransferFrom(from, to, id, amount, data);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155Upgradeable, ERC1155SupplyUpgradeable) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
