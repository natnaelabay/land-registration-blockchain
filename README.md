# Land Registration (Blockchain based)

This is repository tries to simulate one of the application of blockchain in our day today life. The current land registration in our country is paper based and prone to bureaucratic and corruption acts. 

So what we have done is integrated both blockchain and GIS technologies to register lands and keep ledgers secure on the Ethereum Blockchain.

## Requirements (To run this application you will need several programs installed)

- [Ganache v7](https://trufflesuite.com/ganache/) as our local ethereum blockchain
- [Truffle](https://trufflesuite.com/docs/truffle/) for writing our smart contract using solidity and publishing it to our local blockchain
- [Vue.js](https://v2.vuejs.org/) as our frontend framework
- [Mapbox](https://www.mapbox.com/) For handling Spatial data
- [Metamask](https://www.mapbox.com/) for handling our Ethereum wallet


## Steps to running the program
1. Install the truffle cli first <br>
    `npm install -g truffle`
2. Install the Ganache Cli <br>
    `npm i ganache-cli`
3. Install Ganache from this [link](https://trufflesuite.com/ganache/)
4. Install Metamask browser extension from this [link](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en). <br><b>NB :</b> by default when ganache is installed 10 test accounts are created with 100 ETH in each and you will need to import three of these accounts to metamask to test the program (1 for the super user or official, 2 for normal users to simulate the transactions) 
5. Fire up Ganache and run <br>
    `truffle compile ` ## this will compile our contracts and migrate it to our blockchain <br>
6. Copy the LandRegistration.JSON file in /contracts/build/contracts/ directory and replace it with /clients/src/assets/LandRegistration.JSON  <br>
7. To simulate the distributed transaction open 2 different browsers or chrome in incognito and without <br>
    `npm install or yarn` <br>
    `yarn serve` <br>
8. After setting this up you will be able to simulate to some extent how blockchain could be used in land registration.

## Features
|no.  |Features   | type  |
|---|---|---|
|1   | Land area selection (Using mapbox)   | GIS   |
| 2.  | Land ownership assignment   | Blockchain  |
|  3.  | Land ownership transaction  | Blockchain  |
|  4.  | Land ownership payment  | Blockchain (in Eth)  |
|  5.  | Account creation  | Blockchain |

* with every transaction is completed with a small Gas fee and payment is based on Ethereum


* If you have issues on the program or suggestions be sure contact me.    