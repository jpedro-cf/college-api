import { IDiscordConfigurationSchema } from '@/interfaces/application/schemas/DiscordConfigurationSchema'
import { Schema, model } from 'mongoose'

const discordSchema = new Schema<IDiscordConfigurationSchema>(
    {
        guild_id: { type: String, required: true },
        questions_channel_id: String,
        ranking_channel_id: String
    },
    { versionKey: false, timestamps: true }
)

export const DiscordConfigModel = model<IDiscordConfigurationSchema>('Discord_Configuration', discordSchema)
