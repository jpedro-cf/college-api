export interface IDeleteCategory {
    execute(id: string): Promise<boolean>
}
