// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Land {
    uint256 public landCount = 0;

    struct User {
        string f_name;
        string l_name;
        string id;
        string password;
        address addr;
        bool isAdmin;
        bool isLoggedin;
    }

    constructor() public {
        user[msg.sender] = User(
            "Natnael",
            "abay",
            "123123",
            "123123",
            msg.sender,
            true,
            false
        );

        // lands.push(LandStruct({lng: "", lat: "", owner: msg.sender}));
    }

    struct LandStruct {
        uint256 id;
        string[] coordinates;
        address owner;
        uint256 timestamp;
        bool forSell;
        uint256 price;
    }

    struct Transaction {
        address from;
        address to;
        uint256 landId;
    }

    function sellLand(
        address from,
        address payable to,
        uint256 landId
    )
        public
        payable
        returns (
            // uint256 memory price
            bool
        )
    {
        to.transfer(msg.value);
        myTransactions[from].push(Transaction(msg.sender, to, landCount));
        myTransactions[to].push(Transaction(msg.sender, to, landCount));
        transactions.push(Transaction(msg.sender, to, landId));
        return true;
    }

    Transaction[] transactions;
    LandStruct[] lands;

    address[] public all;

    mapping(address => User) public user;
    mapping(string => User) admins;
    mapping(address => LandStruct[]) public userLands;
    mapping(address => Transaction[]) myTransactions;
    mapping(address => uint256) balances;

    function deposit() public payable returns (uint256) {
        balances[msg.sender] += msg.value;
        return balances[msg.sender];
    }

    function createLand(string[] memory _coordinates, address owner)
        public
        returns (bool)
    {
        landCount++;
        LandStruct memory land = LandStruct(
            landCount,
            _coordinates,
            owner,
            block.timestamp,
            false,
            0
        );

        userLands[owner].push(land);

        myTransactions[msg.sender].push(
            Transaction(msg.sender, owner, landCount)
        );

        myTransactions[owner].push(Transaction(msg.sender, owner, landCount));

        transactions.push(Transaction(msg.sender, owner, landCount));
        lands.push(land);
        return true;
    }

    function login(string memory id, string memory password)
        public
        returns (bool)
    {
        require(user[msg.sender].addr == msg.sender);
        if (
            keccak256(abi.encodePacked(bytes(user[msg.sender].id))) ==
            keccak256(abi.encodePacked(bytes(id))) &&
            keccak256(abi.encodePacked(bytes(user[msg.sender].password))) ==
            keccak256(abi.encodePacked(bytes(password)))
        ) {
            user[msg.sender].isLoggedin = true;
            return true;
        }
        return false;
    }

    function register(
        string memory f_name,
        string memory l_name,
        string memory id,
        string memory password,
        bool isAdmin
    ) public returns (bool) {
        require(user[msg.sender].addr != msg.sender);
        user[msg.sender].addr = msg.sender;
        user[msg.sender].f_name = f_name;
        user[msg.sender].l_name = l_name;
        user[msg.sender].id = id;
        user[msg.sender].password = password;
        user[msg.sender].isLoggedin = false;
        user[msg.sender].isAdmin = isAdmin;
        all.push(msg.sender);
        return true;
    }

    function getLands() public view returns (LandStruct[] memory) {
        return lands;
    }

    function sendMe() public view returns (address) {
        return msg.sender;
    }

    function getAllAddresses() public view returns (address[] memory) {
        return all;
    }

    function getUserLands() public view returns (LandStruct[] memory) {
        return userLands[msg.sender];
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return myTransactions[msg.sender];
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    function getLand(uint256 id) public view returns (LandStruct memory) {
        return lands[id - 1];
    }

    function getMe(address adr) public view returns (User memory) {
        return user[adr];
    }

    function testMe() public view returns (address) {
        return msg.sender;
    }

    function updateLandForsell(uint256 price, uint256 i) public returns (bool) {
        lands[i - 1].price = price;
        lands[i - 1].forSell = true;
        return true;
    }

    function updateLandStatus(uint256 i) public returns (bool) {
        lands[i - 1].forSell = !lands[i - 1].forSell;
        return true;
    }

    function sellLand(uint256 id, address owner) public {
        myTransactions[owner].push(Transaction(lands[id - 1].owner, owner, id));
        myTransactions[lands[id - 1].owner].push(
            Transaction(lands[id - 1].owner, owner, id)
        );
        transactions.push(Transaction(lands[id - 1].owner, owner, id));
        lands[id - 1].forSell = false;
        lands[id - 1].owner = owner;

        LandStruct memory land = LandStruct(
            id - 1,
            lands[id - 1].coordinates,
            lands[id - 1].owner,
            block.timestamp,
            false,
            lands[id - 1].price
        );
        userLands[owner].push(land);

        for (uint256 i = 0; i < userLands[lands[id - 1].owner].length; i++) {
            if (userLands[lands[id - 1].owner][i].id == id) {
                delete userLands[lands[id - 1].owner][i];
            }
        }
    }
}
