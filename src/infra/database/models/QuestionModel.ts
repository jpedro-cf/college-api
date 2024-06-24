import { IQuestionSchema } from '@/interfaces/application/schemas/QuestionSchema'
import { Schema, model } from 'mongoose'

const answerSchema = new Schema(
    {
        id: { type: Number, required: true },
        title: { type: String, required: true }
    },
    { versionKey: false, id: false }
)

const questionSchema = new Schema<IQuestionSchema>(
    {
        question: { type: String, required: true },
        category_id: { type: String, required: true, ref: 'QuestionsCategory' },
        material: String,
        answers: { type: [answerSchema], required: true },
        correct_answer_id: { type: Number, required: true },
        created_at: Date
    },
    { versionKey: false }
)

export const QuestionModel = model<IQuestionSchema>('Questions', questionSchema)
