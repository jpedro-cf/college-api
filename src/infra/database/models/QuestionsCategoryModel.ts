import { ICategory } from '@/domain/Category'
import { Schema, model } from 'mongoose'

const categorySchema = new Schema<ICategory>(
    {
        title: { type: String, required: true },
        slug: String,
        image: String
    },
    { versionKey: false, timestamps: true }
)

// questionsCategorySchema.set('toObject', {
//     transform: function (doc, ret) {
//         ret.id = ret._id
//         delete ret._id
//         delete ret.__v
//     }
// })

export const CategoryModel = model<ICategory>('Category', categorySchema)
