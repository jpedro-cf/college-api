import {
    IBaseRepository,
    IFilterOperators,
    IPaginatedResult,
    IQuery,
    TFieldQuery,
    TFiltersQuery
} from '@/interfaces/application/repositories/BaseRepository'
import { Model } from 'mongoose'

export class DbBaseRepository<T> implements IBaseRepository<T> {
    readonly model: Model<T>
    readonly populated_fields: string[]
    readonly exclude: string[]

    constructor(model: Model<T>, populated_fields = [], exclude = []) {
        this.model = model
        this.populated_fields = populated_fields
        this.exclude = exclude
    }

    async create(data: Partial<T>): Promise<T> {
        const created_document = new this.model(data)
        const model = await created_document.save()
        return model as T
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.findOneAndDelete({ id: id })
        return result ? true : false
    }

    async update(id: string, data: TFieldQuery<T>): Promise<T> {
        const filter = { id: id }
        const update = { $set: data }
        return await this.model.findOneAndUpdate(filter, update, { new: true }).exec()
    }

    async getAll(): Promise<T[]> {
        return await this.model.find().lean()
    }

    async queryOne(query: TFiltersQuery<T>, omit?: (keyof T)[]): Promise<T> {
        const data = this.convertFiltersToMongooseQuery(query)
        const mongooseQuery = this.model.findOne(data)

        // Se houver campos a serem omitidos, ajusta a projeção da consulta
        if (omit && omit.length > 0) {
            // Cria um objeto de seleção, onde o valor é 0 para omitir o campo
            const omitFields = omit.reduce((acc, field) => {
                acc[field as string] = 0
                return acc
            }, {} as Record<string, 0>)
            mongooseQuery.select(omitFields)
        }

        // Verifica se há campos a serem populados
        if (this.populated_fields.length > 0) {
            // Cria o array de opções de população apenas se houver campos para isso
            const populateOptions = this.populated_fields.map((field) => ({
                path: field,
                foreignField: 'id'
                // Adicione outras opções se necessário
            }))

            // Aplica a população
            return mongooseQuery.populate(populateOptions).exec() as T
        }

        // Executa a consulta e retorna o resultado
        return mongooseQuery.exec() as T
    }
    async queryMany(query: IQuery<T>, omit?: (keyof T)[]): Promise<IPaginatedResult<T>> {
        const filters = this.convertFiltersToMongooseQuery(query.query)

        // Inicializa a consulta
        let mongooseQuery = this.model.find(filters)

        // Aplica ordenação se 'order' for fornecido
        if (query.order) {
            const sortOption: Record<string, 1 | -1> = {}
            sortOption[query.order.by as string] = query.order.direction === 'asc' ? 1 : -1
            mongooseQuery = mongooseQuery.sort(sortOption)
        }

        // Conta o total de itens antes de aplicar a paginação
        const total_items = await this.model.countDocuments(filters).exec()

        // Inicializa as variáveis de paginação
        let items: T[] = []
        let total_pages = 1

        if (query.pagination) {
            const { page, per_page } = query.pagination
            const skip = (page - 1) * per_page

            // Aplica a paginação
            mongooseQuery = mongooseQuery.skip(skip).limit(per_page)

            // Calcula o total de páginas
            total_pages = Math.ceil(total_items / per_page)
        }

        // Se houver campos a serem omitidos, ajusta a projeção da consulta
        if (omit && omit.length > 0) {
            // Cria um objeto de seleção, onde o valor é 0 para omitir o campo
            const omitFields = omit.reduce((acc, field) => {
                acc[field as string] = 0
                return acc
            }, {} as Record<string, 0>)
            mongooseQuery.select(omitFields)
        }

        // Executa a consulta para obter os itens
        if (this.populated_fields.length > 0) {
            const populateOptions = this.populated_fields.map((field) => ({
                path: field,
                foreignField: 'id'
                // Adicione outras opções aqui se necessário
            }))

            items = await mongooseQuery.populate(populateOptions).exec()
        } else {
            items = await mongooseQuery.exec()
        }

        return {
            items,
            total_items,
            total_pages
        }
    }

    private convertFiltersToMongooseQuery(filters: TFiltersQuery<T>): Record<string, any> {
        const mongooseQuery: Record<string, any> = {}

        for (const [key, operator] of Object.entries(filters)) {
            if (operator) {
                const filterOperator = operator as IFilterOperators // Type assertion

                if (filterOperator._equals !== undefined) {
                    mongooseQuery[key] = filterOperator._equals
                }
                if (filterOperator._not_equal !== undefined) {
                    mongooseQuery[key] = { $ne: filterOperator._not_equal }
                }
                if (filterOperator._greater !== undefined) {
                    mongooseQuery[key] = { $gt: filterOperator._greater }
                }
                if (filterOperator._greater_equal !== undefined) {
                    mongooseQuery[key] = { $gte: filterOperator._greater_equal }
                }
                if (filterOperator._less !== undefined) {
                    mongooseQuery[key] = { $lt: filterOperator._less }
                }
                if (filterOperator._less_equal !== undefined) {
                    mongooseQuery[key] = { $lte: filterOperator._less_equal }
                }
                if (filterOperator._contains !== undefined) {
                    mongooseQuery[key] = { $regex: filterOperator._contains, $options: 'i' }
                }
                if (filterOperator._starts_with !== undefined) {
                    mongooseQuery[key] = { $regex: `^${filterOperator._starts_with}`, $options: 'i' }
                }
                if (filterOperator._ends_with !== undefined) {
                    mongooseQuery[key] = { $regex: `${filterOperator._ends_with}$`, $options: 'i' }
                }
            }
        }

        return mongooseQuery
    }
}
