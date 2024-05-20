import { IQuestion } from '@/domain/Question'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { ICreateQuestion } from '@/interfaces/domain/useCases/questions/CreateQuestion'
import { NotFoundError } from '@/utils/customErrors'

export class CreateQuestionUseCase implements ICreateQuestion {
    constructor(
        private readonly questionsRepository: IQuestionsRepository,
        private readonly categoriesRepository: IQuestionsCategoryRepository
    ) {}
    async create(question: IQuestion, correct: number): Promise<IQuestion> {
        const category_exists = await this.categoriesRepository.getByID(question.category_id)

        if (!category_exists) {
            throw new NotFoundError('Categoria com esse id não existe.')
        }

        const created = await this.questionsRepository.createQuestion(question, correct)
        const { correct_answer_id, ...data } = created
        return data
    }
}
