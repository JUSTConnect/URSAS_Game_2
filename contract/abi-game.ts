export default [
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_room",
				"type": "uint8"
			},
			{
				"internalType": "uint24",
				"name": "_amountTables",
				"type": "uint24"
			}
		],
		"name": "bulkCreateTablesInRoom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_roomLevel",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "_table",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "salt",
				"type": "uint256"
			}
		],
		"name": "claimBlackRoomForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_roomLevel",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "_table",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "salt",
				"type": "uint256"
			}
		],
		"name": "claimGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_room",
				"type": "uint8"
			}
		],
		"name": "createTableInRoom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_roomLevel",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "_table",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "enterInGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_roomLevel",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "_table",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "leaveGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_roomLevel",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "_table",
				"type": "uint32"
			}
		],
		"name": "ReductGameTimeForCombinations",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "setStakingRate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allTables",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "serialNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "playersNow",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "currentGameStartedAt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentGameFinishedAt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "internalGameReduction",
				"type": "uint256"
			},
			{
				"internalType": "enum Spire.Status",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_roomLevel",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "_table",
				"type": "uint32"
			}
		],
		"name": "calculateStakingRewardsInBlackRoom",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_roomLevel",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "_table",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "checkPlayersGenesisCard",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "checkSomething",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"name": "currentAmountGamesFinished",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"name": "currentRoomGameDuration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_room",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "_table",
				"type": "uint32"
			}
		],
		"name": "GetCurrentTableInRoom",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "serialNumber",
						"type": "uint256"
					},
					{
						"internalType": "address[10]",
						"name": "players",
						"type": "address[10]"
					},
					{
						"internalType": "uint256[10]",
						"name": "playingTokenIds",
						"type": "uint256[10]"
					},
					{
						"internalType": "uint256[4]",
						"name": "playingSuits",
						"type": "uint256[4]"
					},
					{
						"internalType": "uint8",
						"name": "playersNow",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "currentGameStartedAt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "currentGameFinishedAt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "internalGameReduction",
						"type": "uint256"
					},
					{
						"internalType": "enum Spire.Status",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct Spire.Table",
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
				"internalType": "string",
				"name": "_str",
				"type": "string"
			}
		],
		"name": "getKeccakForLetter",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "salt",
				"type": "uint256"
			}
		],
		"name": "getRandomSuit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getValue",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "getValue1",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "getValue2",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_room",
				"type": "uint8"
			}
		],
		"name": "GetWholeRoom",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "serialNumber",
						"type": "uint256"
					},
					{
						"internalType": "address[10]",
						"name": "players",
						"type": "address[10]"
					},
					{
						"internalType": "uint256[10]",
						"name": "playingTokenIds",
						"type": "uint256[10]"
					},
					{
						"internalType": "uint256[4]",
						"name": "playingSuits",
						"type": "uint256[4]"
					},
					{
						"internalType": "uint8",
						"name": "playersNow",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "currentGameStartedAt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "currentGameFinishedAt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "internalGameReduction",
						"type": "uint256"
					},
					{
						"internalType": "enum Spire.Status",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct Spire.Table[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "isMintPass",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
		"inputs": [],
		"name": "prizeRadioChoice",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"name": "roomGameDurationIncreaseCounter",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "trump",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "trumpCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_roomLevel",
				"type": "uint8"
			}
		],
		"name": "viewAmountTablesInRoom",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]