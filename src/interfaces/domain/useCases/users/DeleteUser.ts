export interface IDeleteUser {
    execute(id: string): Promise<boolean>
}
