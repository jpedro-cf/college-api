export interface IDiscordUser {
    discord_id: string
    username: string
    globalName: string
}

export interface IDiscordUserSchema extends IDiscordUser {
    points: number
    createdAt: Date
    updatedAt: Date
}
