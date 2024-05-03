import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'
import { IUserSchema } from '../schemas/UserSchema'

export interface IUsersRepository {
    create(userData: ISignUpDTO): Promise<IUserSchema>
    getByEmail(email: string): Promise<IUserSchema>
    getByDiscord(discord_username: string): Promise<IUserSchema>
    updateUser(data: IUserSchema): Promise<IUserSchema>
    deleteUser(id: string): Promise<boolean>
    getByToken(token: string): Promise<IUserSchema>
}
