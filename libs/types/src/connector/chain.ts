import { EthereumMainnet } from "../utils/chains"

export interface ChainType {
    label: string
    id: number
}

export type SuppotedChainsType = Record<number, ChainType>

export const SupportedChains: SuppotedChainsType = {
    1: EthereumMainnet,
}