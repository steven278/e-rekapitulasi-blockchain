const compiledContract =
	[
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_TPS_ID",
					"type": "uint256"
				}
			],
			"name": "getRecapitulationByTpsId",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint16",
							"name": "pemilihTerdaftar",
							"type": "uint16"
						},
						{
							"internalType": "uint16",
							"name": "penggunaHakPilih",
							"type": "uint16"
						},
						{
							"internalType": "uint16",
							"name": "suaraPaslon1",
							"type": "uint16"
						},
						{
							"internalType": "uint16",
							"name": "suaraPaslon2",
							"type": "uint16"
						},
						{
							"internalType": "uint16",
							"name": "jumlahSeluruhSuaraSah",
							"type": "uint16"
						},
						{
							"internalType": "uint16",
							"name": "jumlahSuaraTidakSah",
							"type": "uint16"
						},
						{
							"internalType": "uint16",
							"name": "jumlahSuaraSahDanTidakSah",
							"type": "uint16"
						},
						{
							"internalType": "uint8",
							"name": "isSubmitted",
							"type": "uint8"
						},
						{
							"internalType": "address",
							"name": "KPPSWallet",
							"type": "address"
						},
						{
							"internalType": "string",
							"name": "formImageHash",
							"type": "string"
						}
					],
					"internalType": "struct Rekapitulasi.VoteResult",
					"name": "",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_walletAddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_TPS_ID",
					"type": "uint256"
				}
			],
			"name": "registerWalletOfficer",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_TPS_ID",
					"type": "uint256"
				},
				{
					"internalType": "uint16",
					"name": "_pemilihTerdaftar",
					"type": "uint16"
				},
				{
					"internalType": "uint16",
					"name": "_penggunaHakPilih",
					"type": "uint16"
				},
				{
					"internalType": "uint16",
					"name": "_suaraPaslon1",
					"type": "uint16"
				},
				{
					"internalType": "uint16",
					"name": "_suaraPaslon2",
					"type": "uint16"
				},
				{
					"internalType": "uint16",
					"name": "_jumlahSeluruhSuaraSah",
					"type": "uint16"
				},
				{
					"internalType": "uint16",
					"name": "_jumlahSuaraTidakSah",
					"type": "uint16"
				},
				{
					"internalType": "uint16",
					"name": "_jumlahSuaraSahDanTidakSah",
					"type": "uint16"
				},
				{
					"internalType": "string",
					"name": "_formImage",
					"type": "string"
				}
			],
			"name": "storeVoteResult",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		}
	]
module.exports = {
	compiledContract
}