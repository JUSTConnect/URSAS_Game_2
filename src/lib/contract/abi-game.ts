export default [
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
			},
			{
				"internalType": "uint256[]",
				"name": "_tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "BulkEnterInGame",
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
		"name": "ClaimSingleGame",
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
						"internalType": "uint8",
						"name": "playersNow",
						"type": "uint8"
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
						"internalType": "uint256[10]",
						"name": "playersTimeMarks",
						"type": "uint256[10]"
					},
					{
						"internalType": "uint256[4]",
						"name": "playingSuits",
						"type": "uint256[4]"
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
						"internalType": "uint8",
						"name": "playersNow",
						"type": "uint8"
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
						"internalType": "uint256[10]",
						"name": "playersTimeMarks",
						"type": "uint256[10]"
					},
					{
						"internalType": "uint256[4]",
						"name": "playingSuits",
						"type": "uint256[4]"
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
				"name": "_roomLevel",
				"type": "uint8"
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
				"name": "_roomLevel",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "_table",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "_who",
				"type": "address"
			}
		],
		"name": "estimateStakingRewardsInBlackRoom",
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
			}
		],
		"name": "forceChangeStatusInRoom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_who",
				"type": "address"
			}
		],
		"name": "getActiveTablesForPlayer",
		"outputs": [
			{
				"internalType": "uint256[10][16]",
				"name": "",
				"type": "uint256[10][16]"
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
		"name": "getActiveTablesForRoom",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
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
		"name": "getCurrentStatusForTable",
		"outputs": [
			{
				"internalType": "enum Spire.Status",
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
				"internalType": "address",
				"name": "_player",
				"type": "address"
			}
		],
		"name": "getIndexOfPlayerInBlackRoom",
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
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getIndexOfPlayerInBlackRoom1",
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
				"internalType": "uint8",
				"name": "_roomLevel",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			}
		],
		"name": "getPlayingTokenIdsInRoomForPlayer",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
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
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_roomLevel",
				"type": "uint8"
			}
		],
		"name": "getTablesClaimReadyInRoom",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
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
				"internalType": "uint256[]",
				"name": "_tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "leaveGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
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
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "refundYourNFT",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newTime",
				"type": "uint256"
			}
		],
		"name": "setBaseGameDuration",
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
		"name": "setStakingRateinBlackRoom",
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