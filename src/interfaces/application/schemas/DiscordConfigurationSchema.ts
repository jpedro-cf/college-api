export interface IDiscordConfigurationSchema {
    _id: string
    guild_id: string
    createdAt: Date
    updatedAt: Date
    questions_channel_id?: string
    ranking_channel_id?: string
}
