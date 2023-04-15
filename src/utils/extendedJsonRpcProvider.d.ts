import { JsonRpcProvider } from "@ethersproject/providers";

declare module "@ethersproject/providers" {
  export interface ExtendedJsonRpcProvider extends JsonRpcProvider {
    selectedAddress: string | null;
    chainId: number | null;
  }
}