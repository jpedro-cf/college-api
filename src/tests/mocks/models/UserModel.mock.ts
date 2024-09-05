import { IUser } from '@/domain/User'

export const makeFakeUserModel = (): IUser => {
    return {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@email.com',
        roles: ['student'],
        points: 15,
        password: 'hashed_data',
        createdAt: new Date(),
        updatedAt: new Date()
    }
}
