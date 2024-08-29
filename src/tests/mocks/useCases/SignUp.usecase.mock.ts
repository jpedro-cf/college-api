import { IUser } from '@/domain/User'
import { ISignUp, ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'

export const makeSignUpUseCaseStub = (): ISignUp => {
    class SignUpUseCaseStub implements ISignUp {
        async execute(data: ISignUpDTO): Promise<IUser> {
            return Promise.resolve({
                _id: 'any_id',
                name: 'any_name',
                email: 'any_email@email.com',
                roles: ['student'],
                points: 0
            })
        }
    }
    return new SignUpUseCaseStub()
}
