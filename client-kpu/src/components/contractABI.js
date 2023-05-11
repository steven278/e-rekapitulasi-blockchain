const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			}
		],
		"name": "getHasilRekap",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "isSubmitted",
						"type": "bool"
					},
					{
						"internalType": "uint16",
						"name": "nomorTPS",
						"type": "uint16"
					},
					{
						"internalType": "string[4]",
						"name": "infoTPS",
						"type": "string[4]"
					},
					{
						"internalType": "uint16[2]",
						"name": "jumlahPemilih",
						"type": "uint16[2]"
					},
					{
						"internalType": "uint16[2]",
						"name": "suaraPaslon",
						"type": "uint16[2]"
					},
					{
						"internalType": "uint16[3]",
						"name": "jumlahSuara",
						"type": "uint16[3]"
					},
					{
						"internalType": "string",
						"name": "formImage",
						"type": "string"
					}
				],
				"internalType": "struct Rekapitulasi.HasilRekapTPS",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasilRekap",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isSubmitted",
				"type": "bool"
			},
			{
				"internalType": "uint16",
				"name": "nomorTPS",
				"type": "uint16"
			},
			{
				"internalType": "string",
				"name": "formImage",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_nomorTPS",
				"type": "uint16"
			},
			{
				"internalType": "string[4]",
				"name": "_infoTPS",
				"type": "string[4]"
			},
			{
				"internalType": "uint16[2]",
				"name": "_jumlahPemilih",
				"type": "uint16[2]"
			},
			{
				"internalType": "uint16[2]",
				"name": "_suaraPaslon",
				"type": "uint16[2]"
			},
			{
				"internalType": "uint16[3]",
				"name": "_jumlahSuara",
				"type": "uint16[3]"
			},
			{
				"internalType": "string",
				"name": "_formImage",
				"type": "string"
			}
		],
		"name": "storeVoteResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export default contractABI;