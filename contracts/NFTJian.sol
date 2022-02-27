// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTJian is ERC721, ERC721Enumerable {
  string[] public names;

  constructor() ERC721("NFTJian", "NFTJ") {}

  mapping(string => bool) _nameExist;

  function mintNFT(string memory name) public {
      require(!_nameExist[name]); // require to only have 1 name
      names.push(name);
      uint256 _id = names.length - 1;
      _mint(msg.sender, _id);
      _nameExist[name] = true;
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
  {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
{
    return super.supportsInterface(interfaceId);
  }
}
