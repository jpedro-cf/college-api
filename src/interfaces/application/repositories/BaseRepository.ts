export type TFieldQuery<T> = {
    [K in keyof T]?: T[K]
}

export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T>
    delete(id: string): Promise<boolean>
    getOneByFields(query: TFieldQuery<T>): Promise<T>
    update(id: string, data: TFieldQuery<T>): Promise<T>
    getAll(): Promise<T[]>
}
