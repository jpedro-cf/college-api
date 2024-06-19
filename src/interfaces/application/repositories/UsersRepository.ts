import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'
import { IUserSchema } from '../schemas/UserSchema'
import { IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'

export interface IUsersRepository {
    create(userData: ISignUpDTO): Promise<IUserSchema>
    getByField(field: keyof IUserSchema, value: string): Promise<IUserSchema>
    updateUser(data: IUserSchema): Promise<IUserSchema>
    deleteUser(id: string): Promise<boolean>
    getAll(data: IGetUsersDTO): Promise<IGetUsersResponse>
}
