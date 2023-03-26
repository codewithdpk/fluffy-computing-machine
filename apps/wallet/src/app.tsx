import { useWallet } from '@my-wallet/core'

export default function App() {

    const { connect, disconnect, isConnected } = useWallet()

    function handleConnect() {
        connect()
    }

    function handleDisconnect() {
        disconnect()
    }

    return (
        <div>
            {isConnected ? <button onClick={handleDisconnect}>disconnect</button> : <button onClick={handleConnect}>connect</button>}
        </div>
    )
}