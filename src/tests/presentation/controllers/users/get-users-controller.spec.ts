import { GetUsersController } from '@/presentation/controllers/users/GetUsersController'
import { makeFakeGetUsers } from '@/tests/mocks/useCases/GetUsersUseCase.mock'

const makeSut = () => {
    const getUsers = makeFakeGetUsers()
    const sut = new GetUsersController(getUsers)
    return { sut, getUsers }
}

describe('GetUsersController', () => {
    test('should return 500 if getUsers throws', async () => {
        const { sut, getUsers } = makeSut()
        jest.spyOn(getUsers, 'get').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = await sut.handle({ query: {} })
        expect(res.statusCode).toBe(500)
    })
    test('should return 200 on success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ query: {} })
        expect(res.statusCode).toBe(200)
    })
})
