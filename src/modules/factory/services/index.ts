import * as jend from 'jsend'
import { ContextData } from "../../chat/types";
import { factoryContract } from '../config/contract';
import { client } from '../config/wallet';

export class Factory {
    apiUrl = process.env.API_URL;

    async deploy (args: ContextData): Promise<jsend.JSendObject> {
        try{
            const token = await this.deployToken(args)
            return jend.success(token)
        }
        catch(error: any){
            console.log(error.message)
            return jend.error(error.message || "Failed to deploy token")
        }
    }

    private async deployToken(args: ContextData): Promise<any>{
        // First check if the implementation is set
        const implementation = await factoryContract.read.implementation()
        console.log('Current factory implementation:', implementation);

        if (implementation === '0x0000000000000000000000000000000000000000') {
            throw new Error("Factory implementation address is not set (0x0). Please call updateImplementation first.")
        }

        const { request } = await client.simulateContract({
            ...factoryContract,
            functionName: 'createProxy',
            args: [
                args.token?.name || "Demo",
                args.token?.ticker || "DEMO",
                BigInt(args.token?.supply || 1000000),
                args.wallet?.charity as `0x${string}`,
                args.wallet?.owner as `0x${string}`
            ]
        })

        const hash = await client.writeContract(request)
        return { hash, implementation }
    }
}

const factory = new Factory()

export default factory;