import { IUser } from '@/domain/User'

export interface IAuthenticationDTO {
    email: string
    password: string
}

export interface IAuthentication {
    auth(authentication: IAuthenticationDTO): Promise<IUser>
    verifySession(token: string): Promise<IUser>
    logout(token: string): Promise<boolean>
}
