var SupplyChainManagement = artifacts.require("./SupplyChainManagement.sol");

module.exports = function(deployer) {
  deployer.deploy(SupplyChainManagement);
};
