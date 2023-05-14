export interface ABIInput
{
    internalType: string
    name: string
    type: string
}

export interface ABIOutput
{
    internalType: string
    name: string
    type: string
}

export interface ABIItem
{
    inputs: ABIInput[]
    outputs: ABIOutput[]
    name: string
    stateMutability: string
    type: string
}