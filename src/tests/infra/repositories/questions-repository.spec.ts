import { QuestionModel } from '@/infra/database/models/QuestionModel'
import { DbQuestionsRepository } from '@/infra/database/repositories/DbQuestionsRepository'
import { makeCreateQuestionData } from '@/tests/mocks/entities/Question.mock'
import mongoose, { Collection } from 'mongoose'

const makeSut = () => {
    const sut = new DbQuestionsRepository()
    return { sut }
}
let collection: Collection

describe('DbQuestionsRepository', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        collection = QuestionModel.collection
        await collection.deleteMany({})
    })
    test('should return a category on create() success', async () => {
        const { sut } = makeSut()

        const res = await sut.createQuestion(makeCreateQuestionData(), 2)
        expect(res._id).toBeTruthy()
        expect(res.correct_answer_id).toBeTruthy()
    })
})
