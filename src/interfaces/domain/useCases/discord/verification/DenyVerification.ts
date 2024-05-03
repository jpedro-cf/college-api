export interface IDenyVerification {
    deny(discord_username: string): Promise<boolean>
}
