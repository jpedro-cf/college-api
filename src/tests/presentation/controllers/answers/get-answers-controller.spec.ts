import { GetAnswersController } from '@/presentation/controllers/answers/GetAnswersController'
import { makeFakeGetAnswers } from '@/tests/mocks/useCases/answers/GetAnswersUseCase.mock'
import { makeFakeAuthentication } from '@/tests/mocks/useCases/auth/AuthenticationUseCaseMock'

const makeSut = () => {
    const getAnswers = makeFakeGetAnswers()
    const authentication = makeFakeAuthentication()
    const sut = new GetAnswersController(authentication, getAnswers)
    return { sut, getAnswers, authentication }
}

describe('GetAnswersController', () => {
    test('should return 401 if access_token not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ query: {}, cookies: { access_token: null } })
        expect(res.statusCode).toBe(401)
    })
    test('should return 401 if user not found', async () => {
        const { sut, authentication } = makeSut()
        jest.spyOn(authentication, 'verifySession').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.handle({ query: {}, cookies: { access_token: '123' } })
        expect(res.statusCode).toBe(401)
    })

    test('should return 200 on success with list of answers', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ query: {}, cookies: { access_token: '123' } })
        expect(res.statusCode).toBe(200)
    })
})
