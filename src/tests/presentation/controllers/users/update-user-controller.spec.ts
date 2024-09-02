import { UpdateUserController } from '@/presentation/controllers/users/UpdateUserController'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { makeFakeAuthentication } from '@/tests/mocks/useCases/auth/AuthenticationUseCaseMock'
import { makeFakeUpdateUser } from '@/tests/mocks/useCases/users/UpdateUserUseCase.mock'
import { NotFoundError } from '@/utils/customErrors'

const makeSut = () => {
    const updateUser = makeFakeUpdateUser()
    const authentication = makeFakeAuthentication()
    const sut = new UpdateUserController(updateUser, authentication)
    return { sut, updateUser, authentication }
}

describe('UpdateUserController', () => {
    test('should return 400 if id not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ cookies: { access_token: '12312312123312' }, params: {}, body: {} })
        expect(res.statusCode).toBe(400)
    })
    test('should return 401 if user is not admin and is trying to edit another user', async () => {
        const { sut, authentication } = makeSut()
        const user = makeFakeUserModel()

        jest.spyOn(authentication, 'verifySession').mockReturnValueOnce(
            Promise.resolve({
                id: '1222223',
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

    test('should updated a user on success', async () => {
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
