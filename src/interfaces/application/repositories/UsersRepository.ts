import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'
import { IUserSchema } from '../schemas/UserSchema'

export interface IUsersRepository {
    create(userData: ISignUpDTO): Promise<IUserSchema>
}
