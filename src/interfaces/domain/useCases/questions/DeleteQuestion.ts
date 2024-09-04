export interface IDeleteQuestion {
    execute(id: string): Promise<boolean>
}
