import { UpdateUserController } from '@/presentation/controllers/users/UpdateUserController'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { makeFakeGetByToken } from '@/tests/mocks/useCases/GetByTokenUseCase.mock'
import { makeFakeUpdateUser } from '@/tests/mocks/useCases/UpdateUserUseCase.mock'
import { NotFoundError } from '@/utils/customErrors'

const makeSut = () => {
    const updateUser = makeFakeUpdateUser()
    const sut = new UpdateUserController(updateUser)
    return { sut, updateUser }
}

describe('UpdateUserController', () => {
    test('should return 400 if id not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ cookies: { access_token: '12312312123312' }, query: { id: null } })
        expect(res.statusCode).toBe(400)
    })
    test('should return 400 if not user found with id', async () => {
        const { sut, updateUser } = makeSut()
        const user = makeFakeUserModel()

        jest.spyOn(updateUser, 'update').mockReturnValueOnce(Promise.reject(new NotFoundError('')))
        const res = await sut.handle({ cookies: { access_token: '12312312123312' }, query: { id: user._id } })
        expect(res.statusCode).toBe(400)
    })
    test('should updated a user on success', async () => {
        const { sut } = makeSut()
        const user = makeFakeUserModel()
        user.roles = ['admin']

        const res = await sut.handle({
            cookies: { access_token: '12312312123312' },
            query: { id: '123', name: 'atualizado o nome' }
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toContain('atualizado o nome')
    })
})
