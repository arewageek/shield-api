export interface ContextData {
    token?: {
        name?: string,
        ticker?: string,
        supply?: number
    },
    wallet?: {
        charity?: string,
        owner?: string,
        marketing?: string
    },
    tax?: number
}