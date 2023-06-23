# e-rekapitulasi-blockchain
e-rekapitulasi berbasis blockchain
***
## Table of Contents
- [About](#about)
- [Getting Started](#getting-started)
- [Setup](#setup)
***

## About
a recapitulation system ....
***
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
1. clone project  
`git clone https://github.com/steven278/e-rekapitulasi-blockchain.git`
2. `npm install` for server-kpu, client-kpu, client-kpps and client-public folder
3. go to sever-kpu , then `npm install -g sequelize-cli` (if you want to install it globally, i prefer this one)
4. go to  server-kpu>config>config.json , then change the configuration
5. server-kpu --> `sequelize db:create`
6. server-kpu --> `sequelize db:migrate`
7. server-kpu --> `sequelize db:seed:all`
8. server-kpu, client-kpps, client-kpu, client-public --> `npm run dev`
***
## Smart Contract Setup
Before you start, you need to re-deploy the smart contract using a new contract address, because the smart contract for KPU is only used once for registering the KPPS Wallet. Here are the steps :
1. go to deploy_smart_contract>hardhat.config.js
2. change the infura API_KEY and SEPOLIA_PRIVATE_KEY with your own API KEY and your Wallet Private Key 
3. `cd deploy_smart_contract`
4. `npm i`
5. `npx hardhat run scripts/deploy.js --network sepolia`
6. copy the deployed address from terminal
7. change the smart contract address and another environment variables in server-kpu>.env
8. cnage the smart contract address and another environment variables in client-kpu>.env
9. change the smart contract address and another environment variables in client-kpps>.env
10. change the environment variables in client-public>.env

***
## Setup
***
