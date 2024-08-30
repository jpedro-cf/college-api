import { v4 as uuidv4 } from 'uuid'
import { Schema, model } from 'mongoose'
import { IUser } from '@/domain/User'

const userSchema = new Schema<IUser>(
    {
        id: {
            type: String,
            default: uuidv4, // Gera um UUID v4 como valor padrão
            unique: true // Garante que o ID seja único
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        roles: {
            type: [String],
            default: ['student']
        },
        points: { type: Number, default: 0 },
        access_token: String
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

export const UserModel = model<IUser>('User', userSchema)
