export interface ISendVerification {
    send(discord_user_id: string): Promise<boolean>
}
