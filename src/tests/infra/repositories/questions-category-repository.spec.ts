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
    test('should return a category on create() success', async () => {
        const sut = new DbQuestionsCategoryRepository()

        const res = await sut.createCategory('titulo categoria', 'titulo-categoria', 'image_url')

        expect(res.id).toBeTruthy()
    })
    test('should return a category on getBySlug() success', async () => {
        const questionsCategory = new QuestionsCategoryModel({
            title: 'titulo teste',
            slug: 'titulo-teste',
            image: 'url'
        })
        await questionsCategory.save()
        const sut = new DbQuestionsCategoryRepository()

        const res = await sut.getBySlug('titulo-teste')

        expect(res.id).toBeTruthy()
        await QuestionsCategoryModel.deleteOne({
            slug: 'titulo-teste'
        })
    })
})
