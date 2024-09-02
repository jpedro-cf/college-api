import { CreateCategoryController } from '@/presentation/controllers/categories/CreateCategoryController'
import { makeFakeCreateQuestionsCategoryUseCase } from '@/tests/mocks/useCases/QuestionsCategoryUseCase'
import { AlreadyInUseError } from '@/utils/customErrors'

const makeSut = () => {
    const createCategoryUseCase = makeFakeCreateQuestionsCategoryUseCase()
    const sut = new CreateCategoryController(createCategoryUseCase)

    return { sut, createCategoryUseCase }
}
describe('CreateCategoryController', () => {
    test('Should return 400 if category already exists', async () => {
        const { sut, createCategoryUseCase } = makeSut()

        jest.spyOn(createCategoryUseCase, 'execute').mockReturnValueOnce(Promise.reject(new AlreadyInUseError('')))

        const res = await sut.handle({
            body: {
                title: 'teste'
            }
        })
        expect(res.statusCode).toBe(400)
    })
    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const res = await sut.handle({
            body: {
                title: 'teste'
            }
        })
        expect(res.statusCode).toBe(200)
    })
})
