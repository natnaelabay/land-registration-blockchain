const AuthMigration = artifacts.require("Auth");

module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(AuthMigration);
};
