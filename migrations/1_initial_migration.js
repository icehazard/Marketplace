const Migrations = artifacts.require("Migrations");
const TodoList = artifacts.require("TodoList");
const Counter = artifacts.require("Counter");


module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(TodoList);
  deployer.deploy(Counter);
};
