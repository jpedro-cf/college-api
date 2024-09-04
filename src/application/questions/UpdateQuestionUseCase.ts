import { IQuestion } from '@/domain/Question'
import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { IUpdateQuestion } from '@/interfaces/domain/useCases/questions/UpdateQuestion'
import { NotFoundError } from '@/utils/customErrors'

export class UpdateQuestionUseCase implements IUpdateQuestion {
    constructor(
        private readonly questionsRepository: IQuestionsRepository,
        private readonly categoriesRepository: ICategoryRepository
    ) {}
    async execute(id: string, data: Partial<IQuestion>): Promise<IQuestion> {
        const question = await this.questionsRepository.queryOne({ id: { _equals: id } })

        if (!question) {
            throw new NotFoundError('Questão com o id ' + id + ' não encontrada')
        }

        if (data.categories) {
            await Promise.all(
                data.categories.map(async (category) => {
                    const exists = await this.categoriesRepository.queryOne({ id: { _equals: category } })
                    if (!exists) {
                        throw new NotFoundError(`Categoria com o id ${category} não encontrada.`)
                    }
                })
            )
        }

        const updated = await this.questionsRepository.update(id, data)

        return updated
    }
}
