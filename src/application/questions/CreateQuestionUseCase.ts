import { ICategory } from '@/domain/Category'
import { IQuestion } from '@/domain/Question'
import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { ICreateQuestion } from '@/interfaces/domain/useCases/questions/CreateQuestion'
import { NotFoundError } from '@/utils/customErrors'

export class CreateQuestionUseCase implements ICreateQuestion {
    constructor(
        private readonly questionsRepository: IQuestionsRepository,
        private readonly categoriesRepository: ICategoryRepository
    ) {}
    async execute(question: Partial<IQuestion>, correct: number): Promise<IQuestion> {
        if (question.categories && question.categories.length > 0) {
            await Promise.all(
                question.categories.map(async (category) => {
                    const exists = await this.categoriesRepository.queryOne({ id: { _equals: category } })
                    if (!exists) {
                        throw new NotFoundError('Categoria com esse id não existe.')
                    }
                })
            )
        }

        // const validCategories = categories.filter((category) => category !== null)

        // if (validCategories.length < 1) {
        //     throw new NotFoundError('Categoria com esse id não existe.')
        // }

        const created = await this.questionsRepository.create({ correct_answer_id: correct, ...question })
        return created
    }
}
