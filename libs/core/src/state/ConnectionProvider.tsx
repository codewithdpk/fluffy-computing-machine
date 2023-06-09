import { ChainType, ConnectedAccount, ConnectionProviderProps, ConnectorState, SupportedChains } from '@my-wallet/types'
import { formatEther } from 'ethers'
import { createContext, useEffect, useState } from 'react'
import { checkMetamaskInstalled } from '../utils'


const connectorInitialState: ConnectorState = {
    isConnected: false,
    isMetamaskInstalled: checkMetamaskInstalled(),
    connectedAccount: {
        address: undefined,
        balance: 0
    },
    isWrongNetwork: false,
    connect: () => {
        return
    },
    disconnect: () => {
        return
    }
}

const ConnectionContext = createContext(connectorInitialState)

export default function ConnectionProvider({ children, chain }: ConnectionProviderProps) {

    const { ethereum }: any = window

    const [isConnected, setIsConnected] = useState<boolean>(connectorInitialState.isConnected)
    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(connectorInitialState.isMetamaskInstalled)
    const [isWrongNetwork, setIsWrongNetwork] = useState<boolean>(connectorInitialState.isWrongNetwork)

    const [primaryConnectedChain, setPrimaryConnectedChain] = useState<ChainType | undefined>(undefined)
    const [connectedAccount, setConnectedAccount] = useState<ConnectedAccount>(connectorInitialState.connectedAccount)

    useEffect(() => {
        if (ethereum) {
            ethereum.on("accountsChanged", onAccountChange);
            ethereum.on("chainChanged", onChainChange);
            ethereum.on('connect', onConnectHandler);
            ethereum.on('disconnect', onDisconnectHandler);
        } else {
            setIsMetamaskInstalled(false)
        }
    }, []);

    useEffect(() => {
        const connectedChain = SupportedChains[chain]
        setPrimaryConnectedChain(connectedChain)
    }, [chain])


    function onDisconnectHandler() {
        disconnect()
    }

    function onChainChange(chainId: number) {
        if (primaryConnectedChain?.id !== chainId) {
            setIsWrongNetwork(true)
        } else {
            setIsWrongNetwork(false)
        }
    }

    function onConnectHandler(chainId: number) {
        const connectedChain = SupportedChains[chainId]
        setPrimaryConnectedChain(connectedChain)
    }


    async function onAccountChange(newAccount: string) {
        try {
            const balance = await ethereum.request({
                method: "eth_getBalance",
                params: [newAccount.toString(), "latest"],
            });
            setConnectedAccount({
                address: newAccount,
                balance: Number(formatEther(balance))
            })
            setIsConnected(true)
        } catch (err) {
            console.error(err);
            setIsConnected(false)
            setConnectedAccount({
                address: undefined,
                balance: 0
            })

        }
    }

    async function connect() {
        if (ethereum) {
            try {
                const res = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                await onAccountChange(res[0]);
            } catch (err) {
                console.error(err);
            }
        } else {

            // metamask is not installed in browser
            setIsMetamaskInstalled(false)
        }
    }

    async function disconnect() {
        setIsConnected(false)
        setConnectedAccount({
            address: undefined,
            balance: 0
        })
        setPrimaryConnectedChain(undefined)
        setIsWrongNetwork(false)
    }


    return (
        <ConnectionContext.Provider value={{ isConnected, isMetamaskInstalled, isWrongNetwork, connectedAccount, connect, disconnect }}>
            {children}
        </ConnectionContext.Provider>
    )
}

export { ConnectionContext }