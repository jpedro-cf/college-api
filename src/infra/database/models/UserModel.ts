import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { Schema, model } from 'mongoose'

const userSchema = new Schema<IUserSchema>(
    {
        name: { type: String, required: true },
        discord_username: { type: String, default: null },
        email: { type: String, required: true },
        password: { type: String, required: true },
        roles: {
            type: [String],
            default: ['student']
        },
        points: { type: Number, default: 0 },
        access_token: String,
        discord_confirmed: { type: Boolean, default: false },
        created_at: Date
    },
    { versionKey: false }
)

userSchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

export const UserModel = model<IUserSchema>('User', userSchema)
