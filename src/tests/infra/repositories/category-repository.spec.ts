import { CategoryModel } from '@/infra/database/models/CategoryModel'
import { DbCategoryRepository } from '@/infra/database/repositories/DbCategoryRepository'
import mongoose, { Collection } from 'mongoose'

describe('CategoryRepository', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/college-api')
    }, 5000)
    afterAll(async () => {
        await CategoryModel.deleteMany({})
        await mongoose.disconnect()
    })
    test('should return a category on create() success', async () => {
        const sut = new DbCategoryRepository()

        const res = await sut.create({ title: 'titulo categoria', slug: 'titulo-categoria' })

        expect(res.id).toBeTruthy()
    })
    test('should return a category on getByField() success', async () => {
        const questionsCategory = new CategoryModel({
            title: 'titulo teste',
            slug: 'titulo-teste',
            image: 'url'
        })
        await questionsCategory.save()
        const sut = new DbCategoryRepository()

        const res = await sut.queryOne({ slug: { _equals: 'titulo-teste' } })
        expect(res.id).toBeTruthy()
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
        const sut = new DbCategoryRepository()

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
        const sut = new DbCategoryRepository()

        const res = await sut.update(questionsCategory.id, {
            title: 'titulo atualizado',
            slug: 'titulo-atualizado'
        })
        expect(res.title).toContain('atualizado')
        await CategoryModel.deleteOne({
            slug: 'titulo-atualizado'
        })
    })
    test('should delete a category on success', async () => {
        const sut = new DbCategoryRepository()
        const questionsCategory = new CategoryModel({
            title: 'titulo',
            slug: 'titulo',
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
