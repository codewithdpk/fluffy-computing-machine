import { useContext } from "react";
import { ConnectionContext } from "../state/ConnectionProvider";

export const useWallet = () => useContext(ConnectionContext)