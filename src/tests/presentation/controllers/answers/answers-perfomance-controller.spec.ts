import { AnswersPerfomanceController } from '@/presentation/controllers/answers/AnswersPerfomanceController'
import { makeFakeGetAnswerPerfomance } from '@/tests/mocks/useCases/answers/GetAnswerPerfomanceUseCase.mock'
import { makeFakeAuthentication } from '@/tests/mocks/useCases/auth/AuthenticationUseCaseMock'
import { subDays } from 'date-fns'

const makeSut = () => {
    const authentication = makeFakeAuthentication()
    const perfomance = makeFakeGetAnswerPerfomance()
    const sut = new AnswersPerfomanceController(perfomance, authentication)
    return { sut, perfomance, authentication }
}
describe('AnswersPerfomanceController', () => {
    test('should return 400 if token not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({
            cookies: {
                access_token: null
            }
        })
        expect(res.statusCode).toBe(400)
    })
    test('should return 401 if authentication invalid', async () => {
        const { sut, authentication } = makeSut()

        jest.spyOn(authentication, 'verifySession').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.handle({
            cookies: {
                access_token: '123'
            }
        })
        expect(res.statusCode).toBe(401)
    })
    test('should return 200 on success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({
            cookies: {
                access_token: '123'
            },
            params: {
                date: subDays(new Date(), 10)
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.performance).toBeTruthy()
    })
})
