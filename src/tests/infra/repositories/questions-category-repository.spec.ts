import { QuestionsCategoryModel } from '@/infra/database/models/QuestionsCategoryModel'
import { DbQuestionsCategoryRepository } from '@/infra/database/repositories/DbQuestionsCategoryRepository'
import mongoose, { Collection } from 'mongoose'

describe('QuestionsCategoryRepository', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        await QuestionsCategoryModel.deleteMany({})
    })
    test('should return a category on create() success', async () => {
        const sut = new DbQuestionsCategoryRepository()

        const res = await sut.createCategory('titulo categoria', 'titulo-categoria', 'image_url')

        expect(res._id).toBeTruthy()
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
        expect(res._id).toBeTruthy()
        await QuestionsCategoryModel.deleteOne({
            slug: 'titulo-teste'
        })
    })
    test('should return a list of category on getAll() success', async () => {
        const questionsCategory = new QuestionsCategoryModel({
            title: 'titulo teste impossivel existir',
            slug: 'titulo-teste-impossivel-existir',
            image: 'url',
            created_at: new Date()
        })
        await questionsCategory.save()
        const sut = new DbQuestionsCategoryRepository()

        const res = await sut.getAll({ search: 'impossivel' })
        expect(res.categories[0].title).toContain('impossivel')
        await QuestionsCategoryModel.deleteOne({
            slug: 'titulo-teste-impossivel-existir'
        })
    })
    test('should return a category on getByID() success', async () => {
        const questionsCategory = new QuestionsCategoryModel({
            title: 'titulo teste impossivel existir',
            slug: 'titulo-teste-impossivel-existir',
            image: 'url',
            created_at: new Date()
        })
        await questionsCategory.save()
        const sut = new DbQuestionsCategoryRepository()

        const res = await sut.getByID(questionsCategory._id.toString())
        expect(res.title).toContain('impossivel')
        await QuestionsCategoryModel.deleteOne({
            slug: 'titulo-teste-impossivel-existir'
        })
    })
    test('should return a upodated category on updateCategory() success', async () => {
        const questionsCategory = new QuestionsCategoryModel({
            title: 'titulo teste impossivel existir',
            slug: 'titulo-teste-impossivel-existir',
            image: 'url',
            created_at: new Date()
        })
        await questionsCategory.save()
        const sut = new DbQuestionsCategoryRepository()

        const res = await sut.updateCategory({
            _id: questionsCategory.id.toString(),
            title: 'titulo atualizado',
            slug: 'titulo-atualizado',
            image: 'url'
        })
        expect(res.title).toContain('atualizado')
        await QuestionsCategoryModel.deleteOne({
            slug: 'titulo-atualizado'
        })
    })
    test('should delete a category on success', async () => {
        const sut = new DbQuestionsCategoryRepository()
        const questionsCategory = new QuestionsCategoryModel({
            title: 'titulo',
            slug: 'titulo',
            image: 'url',
            created_at: new Date()
        })
        await questionsCategory.save()
        const res = await sut.deleteCategory(questionsCategory.id)
        expect(res).toBeTruthy()
        await QuestionsCategoryModel.deleteOne({
            slug: 'titulo'
        })
    })
})
