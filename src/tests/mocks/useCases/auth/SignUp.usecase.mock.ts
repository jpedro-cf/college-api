import { IUser } from '@/domain/User'
import { ISignUp, ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'

export const makeSignUpUseCaseStub = (): ISignUp => {
    class SignUpUseCaseStub implements ISignUp {
        async execute(data: ISignUpDTO): Promise<IUser> {
            return Promise.resolve({
                id: 'any_id',
                name: 'any_name',
                email: 'any_email@email.com',
                roles: ['student'],
                points: 0,
                access_token: 'aoui8d09aujsad9msda',
                password: 'hashed_data',
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }
    }
    return new SignUpUseCaseStub()
}
