import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { Schema, model } from 'mongoose'

const questionsCategorySchema = new Schema<IQuestionsCategory>(
    {
        title: { type: String, required: true },
        slug: String,
        image: String
    },
    { versionKey: false }
)

questionsCategorySchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

export const QuestionsCategoryModel = model<IQuestionsCategory>('QuestionsCategory', questionsCategorySchema)
