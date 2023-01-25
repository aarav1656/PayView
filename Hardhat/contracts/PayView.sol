// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PayView is ERC721, ERC721URIStorage {
    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);
    event Gifted(address indexed giftedby, address indexed to);
    event Minted(address);

    address public immutable i_owner;
    address public immutable i_platform;
    uint256 private s_tokenIdCounter;
    uint256 public immutable i_ammount_to_charge;
    string private s_uri;

    mapping(address => bool) public hasMinted;

    constructor(
        string memory _tokenName,
        string memory _symbol,
        string memory _uri,
        uint256 _amountCharge
    ) ERC721(_tokenName, _symbol) {
        i_owner = tx.origin;
        i_ammount_to_charge = _amountCharge;
        s_uri = _uri;
        i_platform = msg.sender;
    }

    modifier onlyOwner() {
        require(i_owner == msg.sender);
        _;
    }

    modifier hasMintedNft(address _toMint) {
        require(!hasMinted[_toMint]);
        _;
    }

    modifier hasMintValue() {
        require(i_ammount_to_charge == msg.value);
        _;
    }

    function safeMint() external payable hasMintValue hasMintedNft(msg.sender) {
        uint256 tokenId = s_tokenIdCounter;
        s_tokenIdCounter += 1;
        transferToPlatform();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, s_uri);
        hasMinted[msg.sender] = true;
        emit Minted(msg.sender);
    }

    function giftTo(address _to) public payable hasMintValue hasMintedNft(_to) {
        uint256 tokenId = s_tokenIdCounter;
        s_tokenIdCounter += 1;
        transferToPlatform();
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, s_uri);
        hasMinted[_to] = true;
        emit Gifted(msg.sender, _to);
    }

    function transferToPlatform() internal {
        uint256 amountToPlatform = i_ammount_to_charge / 10;
        (bool sent, ) = i_platform.call{value: amountToPlatform}("");
        require(sent, "tx failed");
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        require(
            from == address(0) || to == address(0),
            "You cannot transfer this token"
        );
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
