import { IUser } from '@/domain/User'

export interface ISignUpDTO {
    name: string
    discord_username?: string
    email: string
    password: string
}

export interface ISignUp {
    signUp(registerData: ISignUpDTO): Promise<IUser>
    getUserByEmail(email: string): Promise<IUser>
}
