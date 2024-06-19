import { IQuestion } from '@/domain/Question'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { IQuestionSchema } from '@/interfaces/application/schemas/QuestionSchema'
import { QuestionModel } from '../models/QuestionModel'

export class DbQuestionsRepository implements IQuestionsRepository {
    async createQuestion(question: Omit<IQuestion, '_id'>, correct: number): Promise<IQuestionSchema> {
        const data = new QuestionModel({
            question: question.question,
            category_id: question.category_id,
            answers: question.answers,
            material: question.material ?? null,
            correct_answer_id: correct,
            created_at: question.created_at ?? new Date()
        })
        await data.save()
        return data.toObject()
    }
}
