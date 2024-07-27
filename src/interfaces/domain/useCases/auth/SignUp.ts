import { IUser } from '@/domain/User'

export interface ISignUpDTO {
    name: string
    email: string
    password: string
}

export interface ISignUp {
    execute(data: ISignUpDTO): Promise<IUser>
}
