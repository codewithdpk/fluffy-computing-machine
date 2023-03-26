export default function checkMetamaskInstalled() {
    const { ethereum }: any = window

    if (!ethereum) {
        return false
    } else {
        return true
    }
}