import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'

export const makeFakeSignUpData = (): ISignUpDTO => {
    return {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
    }
}
