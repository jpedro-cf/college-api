import { v4 as uuidv4 } from 'uuid'
import { Schema, model } from 'mongoose'
import { IAnswer } from '@/domain/Answer'

const answerSchema = new Schema<IAnswer>(
    {
        id: {
            type: String,
            default: uuidv4, // Gera um UUID v4 como valor padrão
            unique: true // Garante que o ID seja único
        },
        user: [{ type: String, ref: 'User' }],
        question: [{ type: String, ref: 'Question' }],
        answer_id: { type: Number },
        correct: { type: Boolean }
    },
    { versionKey: false, timestamps: true }
)

export const AnswerModel = model<IAnswer>('Answer', answerSchema)
