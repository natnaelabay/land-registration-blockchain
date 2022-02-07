const Land = artifacts.require("Land");

module.exports = function (_deployer) {
  _deployer.deploy(Land);
};
