import { getContract } from "viem";
import {abi as FactoryAbi} from "../abi/Factory.json"
import { client } from "./wallet";

export const factoryContract = getContract({
    address: process.env.FACTORY_ADDRESS as `0x${string}`,
    abi: FactoryAbi,
    client: client,
})