import { IAnswer } from '@/domain/Answer'
import { IAnswersRepository } from '@/interfaces/application/repositories/AnswersRepository'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { ICreateAnswer, ICreateAnswerDTO } from '@/interfaces/domain/useCases/answers/CreateAnswer'
import { AlreadyInUseError, NotFoundError } from '@/utils/customErrors'

export class CreateAnswerUseCase implements ICreateAnswer {
    constructor(
        private readonly usersRepository: IUsersRepository,
        private readonly questionsRepository: IQuestionsRepository,
        private readonly answersRepository: IAnswersRepository
    ) {}
    async execute(data: ICreateAnswerDTO): Promise<IAnswer> {
        const user = await this.usersRepository.queryOne({ id: { _equals: data.user_id } })

        if (!user) {
            throw new NotFoundError('Usuário não encontrado.')
        }

        const question = await this.questionsRepository.queryOne({ id: { _equals: data.question_id } })

        if (!question) {
            throw new NotFoundError('Questão não encontrada.')
        }

        if (
            await this.answersRepository.queryOne({
                user: { _equals: data.user_id },
                question: { _equals: data.question_id }
            })
        ) {
            throw new AlreadyInUseError('Você não pode responder a mesma questão duas vezes.')
        }

        const request: Partial<IAnswer> = {
            user: user.id,
            question: question.id,
            answer_id: data.answer_id,
            correct: data.answer_id == question.correct_answer_id ? true : false
        }

        const answer = await this.answersRepository.create(request)

        const points = request.correct ? (user.points += 15) : user.points
        await this.usersRepository.update(user.id, { points })

        return answer
    }
}
