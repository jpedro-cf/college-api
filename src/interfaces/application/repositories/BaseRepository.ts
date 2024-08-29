export type TFieldQuery<T> = {
    [K in keyof T]?: T[K]
}

export interface IFilterOperators {
    _equals?: any
    _not_equal?: any
    _greater?: any
    _greater_equal?: any
    _less?: any
    _less_equal?: any
    _contains?: any
    _starts_with?: any
    _ends_with?: any
}

export type TFiltersQuery<T> = {
    [key in keyof T]?: IFilterOperators
}

export interface IQuery<T> {
    query: TFiltersQuery<T>
    order?: {
        by: keyof T
        direction: 'asc' | 'desc'
    }
    pagination?: {
        page: number
        per_page: number
    }
}

export interface IPaginatedResult<T> {
    items: T[]
    total_items: number
    total_pages: number
}

export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T>
    delete(id: string): Promise<boolean>
    update(id: string, data: TFieldQuery<T>): Promise<T>
    queryOne(query: TFiltersQuery<T>): Promise<T>
    queryMany(query: IQuery<T>): Promise<IPaginatedResult<T>>
    getAll(): Promise<T[]>
}
