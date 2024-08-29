import { QuestionModel } from '@/infra/database/models/QuestionModel'
import { CategoryModel } from '@/infra/database/models/QuestionsCategoryModel'
import { DbQuestionsRepository } from '@/infra/database/repositories/DbQuestionsRepository'
import { makeCreateQuestionData } from '@/tests/mocks/entities/Question.mock'
import mongoose, { Collection } from 'mongoose'

const makeSut = () => {
    const sut = new DbQuestionsRepository()
    return { sut }
}

describe('DbQuestionsRepository', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        await QuestionModel.deleteMany({})
        await CategoryModel.deleteMany({})
        await mongoose.disconnect()
    })
    test('should return a category on create() success', async () => {
        const { sut } = makeSut()
        const category = new CategoryModel({
            title: 'titulo',
            slug: 'titulo',
            image: 'image',
            created_at: new Date()
        })
        await category.save()

        const data: any = makeCreateQuestionData()
        data.category_id = category._id
        data.correct_answer_id = 3

        const res = await sut.create(data)
        expect(res._id).toBeTruthy()
        expect(res.correct_answer_id).toBeTruthy()
    })
})
