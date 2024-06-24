import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export const makeFakeCategory = (): IQuestionsCategory => {
    return {
        _id: 'string',
        title: 'titulo categoria',
        slug: 'titulo-categoria',
        image: 'https://google.com',
        createdAt: new Date(),
        updatedAt: new Date()
    }
}
