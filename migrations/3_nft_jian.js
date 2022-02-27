const NFTJian = artifacts.require('./NFTJian.sol');

module.exports = function(deployer) {
  deployer.deploy(NFTJian);
}