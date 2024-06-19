import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'

export const makeFakeUserModel = (): IUserSchema => {
    return {
        _id: 'any_id',
        name: 'any_name',
        email: 'any_email@email.com',
        roles: ['student'],
        points: 0,
        password: 'hashed_data',
        createdAt: new Date(),
        updatedAt: new Date()
    }
}
