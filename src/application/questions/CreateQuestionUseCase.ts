import { IQuestion } from '@/domain/Question'
import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { ICreateQuestion, ICreateQuestionResponse } from '@/interfaces/domain/useCases/questions/CreateQuestion'
import { NotFoundError } from '@/utils/customErrors'

export class CreateQuestionUseCase implements ICreateQuestion {
    constructor(
        private readonly questionsRepository: IQuestionsRepository,
        private readonly categoriesRepository: ICategoryRepository
    ) {}
    async execute(question: Partial<IQuestion>, correct: number): Promise<ICreateQuestionResponse> {
        const category_exists = await this.categoriesRepository.getOneByFields({ _id: question.category_id })

        if (!category_exists) {
            throw new NotFoundError('Categoria com esse id não existe.')
        }

        const created = await this.questionsRepository.create({ correct_answer_id: correct, ...question })
        const { correct_answer_id, ...data } = created
        return { ...data, category_title: category_exists.title }
    }
}
