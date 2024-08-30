import { IUser } from '@/domain/User'

export interface IGetUsersDTO {
    search?: string
    order?: 'desc' | 'asc'
    current_page?: number
    per_page?: number
}
export interface IGetUsersResponse {
    users: IUser[]
    pages: number
}

export interface IGetUsers {
    execute(data: IGetUsersDTO): Promise<IGetUsersResponse>
}
