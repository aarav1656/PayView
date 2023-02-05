// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PayView is ERC721, ERC721URIStorage {
    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);
    event Gifted(address indexed giftedby, address indexed to);
    event Minted(address);

    address public immutable i_owner; // owner of the nft
    address public immutable i_platform; // platform using what this contract was created
    uint256 private s_tokenIdCounter; // nft mint count
    uint256 public immutable i_ammount_to_charge; // charge for an nft
    // owner defines uri of nft when he first deploys
    string public s_uri;
    // owner defines the video cid deployed on ipfs when he deploys
    string public vid_cid;

    mapping(address => bool) public hasMinted;

    // it is called by platform and then
    constructor(
        string memory _tokenName,
        string memory _symbol,
        string memory _uri,
        uint256 _amountCharge,
        string memory _vid_cid
    ) ERC721(_tokenName, _symbol) {
        i_owner = tx.origin;
        i_ammount_to_charge = _amountCharge;
        s_uri = _uri;
        i_platform = msg.sender;
        vid_cid = _vid_cid;
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

    // this mints nft
    function safeMint() external payable hasMintValue hasMintedNft(msg.sender) {
        uint256 tokenId = s_tokenIdCounter;
        s_tokenIdCounter += 1;
        transferToPlatform();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, s_uri);
        hasMinted[msg.sender] = true;
        emit Minted(msg.sender);
    }

    // this gifts nft to...
    function giftTo(address _to) public payable hasMintValue hasMintedNft(_to) {
        uint256 tokenId = s_tokenIdCounter;
        s_tokenIdCounter += 1;
        transferToPlatform();
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, s_uri);
        hasMinted[_to] = true;
        emit Gifted(msg.sender, _to);
    }

    // here an external contract happens to the contract and it sends ~10% of the ether receive so for every 1 eth approx 0.1 eth will be sent to platform
    // the reason it is not vulnerable is because platfom code is already deployed and platform address cannot be changed nor they can dos attack using fallback() or receive()
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

    function withdraw() external payable {
        require(i_owner == msg.sender, "You ain't owner");
        (bool sent, ) = i_owner.call{value: address(this).balance}("");
        require(sent, "tx failed");
    }
}
