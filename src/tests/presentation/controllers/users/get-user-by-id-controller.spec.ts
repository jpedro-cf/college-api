import { GetUserByIDController } from '@/presentation/controllers/users/GetUserByIDController'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { makeFakeAuthentication } from '@/tests/mocks/useCases/auth/AuthenticationUseCaseMock'
import { makeFakeGetUsers } from '@/tests/mocks/useCases/users/GetUsersUseCase.mock'

const makeSut = () => {
    const getUsers = makeFakeGetUsers()
    const authentication = makeFakeAuthentication()
    const sut = new GetUserByIDController(getUsers, authentication)
    return { sut, getUsers, authentication }
}

describe('GetUserByIDController', () => {
    test('should return 400 if id not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ cookies: { access_token: '12312312123312' }, params: { id: null } })
        expect(res.statusCode).toBe(400)
    })
    test('should return 401 if user is not admin and is trying to see another user', async () => {
        const { sut, authentication } = makeSut()
        const user = makeFakeUserModel()

        jest.spyOn(authentication, 'verifySession').mockReturnValueOnce(
            Promise.resolve({
                id: 'other_user_id',
                name: 'any_name',
                email: 'any_email@email.com',
                roles: ['student'],
                points: 0,
                password: 'hashed_data',
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )

        const res = await sut.handle({ cookies: { access_token: '12312312123312' }, params: { id: user.id }, body: {} })
        expect(res.statusCode).toBe(401)
    })

    test('should return 400 if user not found', async () => {
        const { sut, getUsers, authentication } = makeSut()
        const user = makeFakeUserModel()
        user.roles = ['admin']

        jest.spyOn(authentication, 'verifySession').mockReturnValueOnce(Promise.resolve(user))
        jest.spyOn(getUsers, 'getByID').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.handle({
            cookies: { access_token: '12312312123312' },
            params: { id: '123' },
            body: { name: 'atualizado o nome' }
        })
        expect(res.statusCode).toBe(400)
    })

    test('should return a user on success', async () => {
        const { sut, authentication } = makeSut()
        const user = makeFakeUserModel()
        user.roles = ['admin']

        jest.spyOn(authentication, 'verifySession').mockReturnValueOnce(Promise.resolve(user))

        const res = await sut.handle({
            cookies: { access_token: '12312312123312' },
            params: { id: '123' },
            body: { name: 'atualizado o nome' }
        })
        expect(res.statusCode).toBe(200)
    })
})
