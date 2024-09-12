import { AnswerModel } from '@/infra/database/models/AnswerModel'
import { CategoryModel } from '@/infra/database/models/CategoryModel'
import { QuestionModel } from '@/infra/database/models/QuestionModel'
import { DbAnswersRepository } from '@/infra/database/repositories/DbAnswersRepository'
import { subDays, subHours } from 'date-fns'
import mongoose from 'mongoose'

const makeSut = () => {
    const sut = new DbAnswersRepository()
    return { sut }
}

describe('DbAnswersRepository', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
        await AnswerModel.deleteMany({})
        await CategoryModel.deleteMany({})
        await QuestionModel.deleteMany({})
    }, 5000)

    afterAll(async () => {
        // await AnswerModel.deleteMany({})
        // await CategoryModel.deleteMany({})
        // await QuestionModel.deleteMany({})
        await mongoose.disconnect()
    })

    const makeManyCategories = async () => {
        const categories = []
        for (let i = 0; i < 15; i++) {
            categories.push({
                title: `categoria ${i}`,
                slug: `categoria-${i}`
            })
        }
        return await CategoryModel.insertMany(categories) // Retorna as categorias inseridas
    }

    // Função para gerar várias perguntas com respostas e categorias relacionadas
    const makeManyQuestions = async (categories) => {
        const questions = []
        for (let i = 0; i < 3; i++) {
            const answers = []
            for (let j = 0; j < 10; j++) {
                answers.push({
                    id: j + 1,
                    title: `Resposta ${j + 1}`
                })
            }

            questions.push({
                question: `Pergunta ${i}`,
                categories: [categories[i].id], // Relaciona a categoria
                material: `Material de apoio para pergunta ${i}`,
                answers: answers, // Relaciona as respostas
                correct_answer_id: Math.floor(Math.random() * 10) + 1 // Escolhe uma resposta correta aleatória
            })
        }
        return await QuestionModel.insertMany(questions) // Insere as perguntas com respostas
    }

    // Função para gerar várias respostas (atreladas a perguntas já criadas)
    const makeManyAnswers = async () => {
        const categories = await makeManyCategories()
        const questions = await makeManyQuestions(categories)

        // Cria respostas relacionadas às perguntas
        const answers = []
        for (let i = 0; i < 30; i++) {
            answers.push({
                user: `user_${i % 2}`, // Alterna entre dois usuários
                question: questions[i % questions.length].id, // Relaciona a pergunta
                correct: Math.random() < 0.5, // Randomiza entre correto/incorreto
                createdAt: subHours(new Date(), i) // Datas variadas
            })
        }

        return await AnswerModel.insertMany(answers)
    }

    describe('getUserPerformance', () => {
        beforeAll(async () => {
            await makeManyAnswers()
        })
        test('should return correct values', async () => {
            const { sut } = makeSut()
            const res = await sut.getUserPerformance('user_0', subDays(new Date(), 250))
            console.log(new Date())
            console.log(res)
            expect(res).toBeTruthy()
        })
    })
})
