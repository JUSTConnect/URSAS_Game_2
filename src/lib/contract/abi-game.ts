export default [
  {
    "inputs": [],
    "name": "acceptMoney",
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
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "_tokenIds",
        "type": "uint256[]"
      }
    ],
    "name": "advancedBulkEnterInGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_tokenIds",
        "type": "uint256[]"
      }
    ],
    "name": "bulkEnterInBlackRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimBlackRoom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
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
        "internalType": "uint256",
        "name": "salt",
        "type": "uint256"
      }
    ],
    "name": "claimReadyTablesInRoom",
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
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
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
    "inputs": [],
    "name": "claimStakingTokensFromBlackRoom",
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
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
      }
    ],
    "name": "forceChangeStatusInRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getInBlackArrays",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_tokenIds",
        "type": "uint256[]"
      }
    ],
    "name": "leaveBlackTable",
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
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
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
        "name": "_who",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "sendRaffleTokens",
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
    "name": "setTrump",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_indulgence",
        "type": "address"
      }
    ],
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
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "pushSuitsInTable",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_tokenIds",
        "type": "uint256[]"
      }
    ],
    "name": "refundYourNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_winner",
        "type": "address"
      }
    ],
    "name": "sendRaffleNFTToWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "internalType": "uint8",
        "name": "_value",
        "type": "uint8"
      }
    ],
    "name": "setPrizeRadioChoise",
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
    "stateMutability": "payable",
    "type": "receive"
  },
  {
    "inputs": [],
    "name": "agetBlackRoom",
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
            "internalType": "address[]",
            "name": "players",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "playingTokenIds",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "playersTimeMarks",
            "type": "uint256[]"
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
            "internalType": "uint256",
            "name": "stakingRate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountPlayersUntilCurrentRaffle",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountWinnersToPayout",
            "type": "uint256"
          },
          {
            "internalType": "enum Spire.Status",
            "name": "status",
            "type": "uint8"
          }
        ],
        "internalType": "struct Spire.blackTableStruct",
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
    "inputs": [],
    "name": "balanceOfRaffleTokens",
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
    "name": "blackTable",
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
        "internalType": "uint256",
        "name": "stakingRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountPlayersUntilCurrentRaffle",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountWinnersToPayout",
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
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
      }
    ],
    "name": "calculateGameDuration",
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
        "internalType": "uint256",
        "name": "_remainAllocation",
        "type": "uint256"
      }
    ],
    "name": "findAvailableTable",
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
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
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
        "internalType": "uint8",
        "name": "_room",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
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
        "name": "_roomLevel",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
      }
    ],
    "name": "getGameDuration",
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
    "name": "getIndexesOfPlayerInBlackRoom",
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
        "internalType": "uint8",
        "name": "_roomLevel",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
      }
    ],
    "name": "getTimeWhenTableIsClaimReady",
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
        "internalType": "uint256",
        "name": "salt",
        "type": "uint256"
      }
    ],
    "name": "isDoubleIncrNFTRoomLevel",
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
    "name": "isOwnerOfRaffleNFT",
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
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
      }
    ],
    "name": "isTableClaimReady",
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
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
      }
    ],
    "name": "isTableInRoomExists",
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
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
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
    "stateMutability": "pure",
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
    "inputs": [],
    "name": "raffleNFTTokenId",
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
        "internalType": "uint256",
        "name": "_table",
        "type": "uint256"
      }
    ],
    "name": "returnSerialNumber",
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