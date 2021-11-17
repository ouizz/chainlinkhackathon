//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    mapping(address => uint) _balances;
    uint _totalSupply;

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function foo(int x) public pure returns (string memory) {
        require(x > 0, "Not negative or zero value");
        return "Foo";
    }

    function deposit( uint amount) public  {
        _balances[msg.sender] += amount;
        _totalSupply += amount;
    }

    function withdraw(uint amount ) public {
        require(amount <= _balances[msg.sender] , "Not Enough money");
        payable(msg.sender).transfer(amount);
        _balances[msg.sender] -= amount;
        _totalSupply -= amount;
    }
        
    function checkBalance() public view returns(uint balance) {
        return _balances[msg.sender]; 
    }

    function checkTotalSupply() public view returns(uint totalSupply){
        return _totalSupply;
    }
   

}
