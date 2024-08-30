import { v4 as uuidv4 } from 'uuid'
import { ICategory } from '@/domain/Category'
import { Schema, model } from 'mongoose'

const categorySchema = new Schema<ICategory>(
    {
        id: {
            type: String,
            default: uuidv4, // Gera um UUID v4 como valor padrão
            unique: true // Garante que o ID seja único
        },
        title: { type: String, required: true },
        slug: String
    },
    { versionKey: false, timestamps: true }
)

export const CategoryModel = model<ICategory>('Category', categorySchema)
