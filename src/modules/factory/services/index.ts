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
            return jend.error(error.message || "Failed to deploy token")
        }
    }

    private async deployToken(args: ContextData): Promise<any>{
        const {} = await client.simulateContract({
            ...factoryContract,
            functionName: 'createProxy',
            args: [
                args.token?.name,
                args.token?.ticker,
                args.token?.supply,
                args.wallet?.charity,
                args.wallet?.owner
            ]
        })
    }
}

const factory = new Factory()

export default factory;