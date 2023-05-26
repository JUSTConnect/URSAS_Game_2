export type ABIType = 
    'uint256' |
    'uint32' |
    'uint8' |
    'address' |
    'bool' |
    'uint256[]'

export interface ABIInput
{
    internalType: string
    name: string
    type: ABIType
}

export interface ABIOutput
{
    internalType: string
    name: string
    type: ABIType
}

export interface ABIItem
{
    inputs: ABIInput[]
    outputs: ABIOutput[]
    name: string
    stateMutability: string
    type: string
}