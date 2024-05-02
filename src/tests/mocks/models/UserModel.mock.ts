import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'

export const makeFakeUserModel = (): IUserSchema => {
    return {
        id: 'any_id',
        discord_username: null,
        name: 'any_name',
        email: 'any_email@email.com',
        roles: ['student'],
        points: 0,
        ranking: 0,
        password: 'hashed_data',
        discord_confirmed: false
    }
}
