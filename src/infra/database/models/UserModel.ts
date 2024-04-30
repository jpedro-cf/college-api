import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { Schema, model } from 'mongoose'

const userSchema = new Schema<IUserSchema>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        roles: {
            type: [String],
            default: ['student']
        },
        points: { type: Number, default: 0 },
        ranking: { type: Number },
        email_confirmed: { type: Boolean, default: false }
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
