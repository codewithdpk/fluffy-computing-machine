import { ReactNode } from "react"

export interface ConnectorState {
    isConnected: boolean
    isMetamaskInstalled: boolean
    connectedAccount: ConnectedAccount
    isWrongNetwork: boolean
    connect(): void
    disconnect(): void
}

export interface ConnectionProviderProps {
    children: ReactNode
    chain: number
}

export interface ConnectedAccount {
    address: string | undefined
    balance: number
}
