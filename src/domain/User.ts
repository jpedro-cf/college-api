export interface IUser {
    id: string
    name: string
    email: string
    roles: string[]
    points: number
    access_token?: string
    password: string
    createdAt: Date
    updatedAt: Date
}
