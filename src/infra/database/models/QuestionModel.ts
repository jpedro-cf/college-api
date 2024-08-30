import { v4 as uuidv4 } from 'uuid'
import { IQuestion } from '@/domain/Question'
import { Schema, model } from 'mongoose'

const answerSchema = new Schema(
    {
        id: { type: Number, required: true },
        title: { type: String, required: true }
    },
    { versionKey: false, id: false }
)

const questionSchema = new Schema<IQuestion>(
    {
        id: {
            type: String,
            default: uuidv4, // Gera um UUID v4 como valor padrão
            unique: true // Garante que o ID seja único
        },
        question: { type: String, required: true },
        categories: [{ type: String, ref: 'Category' }],
        material: String,
        answers: { type: [answerSchema], required: true },
        correct_answer_id: { type: Number, required: true }
    },
    { versionKey: false, timestamps: true }
)

export const QuestionModel = model<IQuestion>('Question', questionSchema)
