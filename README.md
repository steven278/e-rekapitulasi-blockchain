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
2. change the infura API_KEY with your own API_KEY
3. 

1. `cd deploy_smart_contract`
2. `npm i`
3. `npx hardhat run scripts/deploy.js --network sepolia`
4. copy the deployed address from terminal
5. change the smart contract address in server-kpu>.env
6. cnage the smart contract address in client-kpu>src>RegisterForm.jsx 
7. change the smart contract address in client-kpps>src>MyForm.jsx


***
## Setup
***
