import { CategoryModel } from '@/infra/database/models/QuestionsCategoryModel'
import { DbQuestionsCategoryRepository } from '@/infra/database/repositories/DbCategoryRepository'
import mongoose, { Collection } from 'mongoose'

describe('QuestionsCategoryRepository', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        await CategoryModel.deleteMany({})
        await mongoose.disconnect()
    })
    test('should return a category on create() success', async () => {
        const sut = new DbQuestionsCategoryRepository()

        const res = await sut.create({ title: 'titulo categoria', slug: 'titulo-categoria', image: 'image_url' })

        expect(res._id).toBeTruthy()
    })
    test('should return a category on getByField() success', async () => {
        const questionsCategory = new CategoryModel({
            title: 'titulo teste',
            slug: 'titulo-teste',
            image: 'url'
        })
        await questionsCategory.save()
        const sut = new DbQuestionsCategoryRepository()

        const res = await sut.queryOne({ slug: { _equals: 'titulo-teste' } })
        expect(res._id).toBeTruthy()
        await CategoryModel.deleteOne({
            slug: 'titulo-teste'
        })
    })
    test('should return a list of category on getAll() success', async () => {
        const questionsCategory = new CategoryModel({
            title: 'titulo teste impossivel existir',
            slug: 'titulo-teste-impossivel-existir',
            image: 'url',
            created_at: new Date()
        })
        await questionsCategory.save()
        const sut = new DbQuestionsCategoryRepository()

        const res = await sut.queryMany({ query: { title: { _contains: 'impossivel' } } })
        expect(res.items[0].title).toContain('impossivel')
        await CategoryModel.deleteOne({
            slug: 'titulo-teste-impossivel-existir'
        })
    })

    test('should return a upodated category on updateCategory() success', async () => {
        const questionsCategory = new CategoryModel({
            title: 'titulo teste impossivel existir',
            slug: 'titulo-teste-impossivel-existir',
            image: 'url',
            created_at: new Date()
        })
        await questionsCategory.save()
        const sut = new DbQuestionsCategoryRepository()

        const res = await sut.update(questionsCategory._id, {
            title: 'titulo atualizado',
            slug: 'titulo-atualizado',
            image: 'url'
        })
        expect(res.title).toContain('atualizado')
        await CategoryModel.deleteOne({
            slug: 'titulo-atualizado'
        })
    })
    test('should delete a category on success', async () => {
        const sut = new DbQuestionsCategoryRepository()
        const questionsCategory = new CategoryModel({
            title: 'titulo',
            slug: 'titulo',
            image: 'url',
            created_at: new Date()
        })
        await questionsCategory.save()
        const res = await sut.delete(questionsCategory.id)
        expect(res).toBeTruthy()
        await CategoryModel.deleteOne({
            slug: 'titulo'
        })
    })
})
