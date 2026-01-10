import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia, sepolia } from "viem/chains";

const account = privateKeyToAccount(`0x${process.env.SYSTEM_PRIVATE_KEY}`)

export const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http()
}).extend(publicActions)

