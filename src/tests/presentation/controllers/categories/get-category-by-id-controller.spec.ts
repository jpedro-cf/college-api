import { GetCategoryByIDController } from '@/presentation/controllers/categories/GetCategoryByIDController'
import { makeFakeGetCategoryByIdUseCase } from '@/tests/mocks/useCases/categories/GetCategoryByIdUseCase.mock'

const makeSut = () => {
    const getById = makeFakeGetCategoryByIdUseCase()
    const sut = new GetCategoryByIDController(getById)
    return { sut, getById }
}

describe('GetCategoryByIDController', () => {
    test('should return 400 if id not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ params: { id: null } })
        expect(res.statusCode).toBe(400)
    })
    test('should return 400 if category not found', async () => {
        const { sut, getById } = makeSut()
        jest.spyOn(getById, 'execute').mockReturnValueOnce(Promise.resolve(null))
        const res = await sut.handle({ params: { id: '123' } })
        expect(res.statusCode).toBe(400)
    })
    test('should return 200 on success', async () => {
        const { sut } = makeSut()
        const res = await sut.handle({ params: { id: '123' } })
        expect(res.statusCode).toBe(200)
    })
})
