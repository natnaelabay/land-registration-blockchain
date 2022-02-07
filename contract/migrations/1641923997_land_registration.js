const LandRegistration = artifacts.require("LandRegistration");

module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(LandRegistration);
};
