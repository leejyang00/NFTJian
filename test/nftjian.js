const { assert } = require('console');

const NFTJian = artifacts.require("./NFTJian.sol");

contract("NFTJian", accounts => {

  let contract;
  before(async() => {
    contract = await NFTJian.deployed();
  })

  it("...should deploy contract", async () => {
    var assert = require('assert');
    assert.notEqual(contract, "");
  });

  it("...should mint new NFTs", async () => {
    const result = await contract.mintNFT("Jian");
    const name = await contract.names(0);
    assert(name, "Jian");
  })
})



// const SimpleStorage = artifacts.require("./SimpleStorage.sol");

// contract("SimpleStorage", accounts => {
//   it("...should store the value 89.", async () => {
//     const simpleStorageInstance = await SimpleStorage.deployed();

//     // Set value of 89
//     await simpleStorageInstance.set(89, { from: accounts[0] });

//     // Get stored value
//     const storedData = await simpleStorageInstance.get.call();

// });
//     assert.equal(storedData, 89, "The value 89 was not stored.");
  // });
