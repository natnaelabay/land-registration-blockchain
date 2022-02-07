// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auth {
    // struct UserDetail {
    //     address addr;
    //     string f_name;
    //     string l_name;
    //     string password;
    //     string CNIC;
    //     bool isUserLoggedIn;
    // }

    // mapping(address => UserDetail) public user;

    // // user registration function
    // function register(
    //     address _address,
    //     string memory f_name,
    //     string memory l_name,
    //     string memory password,
    //     string memory _cnic
    // ) public returns (bool) {
    //     require(user[_address].addr != msg.sender);
    //     user[_address].addr = _address;
    //     user[_address].f_name = f_name;
    //     user[_address].l_name = l_name;
    //     user[_address].password = password;
    //     user[_address].CNIC = _cnic;
    //     user[_address].isUserLoggedIn = false;
    //     return true;
    // }

    // // user login function
    // function login(address _address, string memory _password)
    //     public
    //     returns (bool)
    // {
    //     return false;
    //     // if (
    //     //     keccak256(abi.encodePacked(user[_address].password)) ==
    //     //     keccak256(abi.encodePacked(_password))
    //     // ) {
    //     //     user[_address].isUserLoggedIn = true;
    //     //     return user[_address].isUserLoggedIn;
    //     // } else {
    //     //     return false;
    //     // }
    // }

    // // check the user logged In or not
    // function checkIsUserLogged(address _address) public view returns (bool) {
    //     return (user[_address].isUserLoggedIn);
    // }

    // // logout the user
    // function logout(address _address) public {
    //     user[_address].isUserLoggedIn = false;
    // }
}
