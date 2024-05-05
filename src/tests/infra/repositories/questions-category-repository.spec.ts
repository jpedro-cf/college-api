import { QuestionsCategoryModel } from '@/infra/database/models/QuestionsCategoryModel'
import { DbQuestionsCategoryRepository } from '@/infra/database/repositories/DbQuestionsCategoryRepository'
import mongoose, { Collection } from 'mongoose'

let questionsCategoryCollection: Collection

describe('QuestionsCategoryRepository', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        questionsCategoryCollection = QuestionsCategoryModel.collection
        await questionsCategoryCollection.deleteMany({})
    })
    test('should return a category on success', async () => {
        const sut = new DbQuestionsCategoryRepository()

        const res = await sut.createCategory('titulo categoria', 'titulo-categoria', 'image_url')

        expect(res.id).toBeTruthy()
    })
})
