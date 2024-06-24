import { IDiscordUserSchema } from '@/domain/DiscordUser'
import { Schema, model } from 'mongoose'

const discordUserSchema = new Schema<IDiscordUserSchema>(
    {
        discord_id: { type: String, required: true, unique: true },
        username: { type: String },
        globalName: { type: String },
        points: { type: Number, default: 0 }
    },
    { versionKey: false, timestamps: true }
)

// userSchema.set('toObject', {
//     transform: function (doc, ret) {
//         ret.id = ret._id
//         delete ret._id
//         delete ret.__v
//     }
// })

export const DiscordUserModel = model<IDiscordUserSchema>('DiscordUser', discordUserSchema)
