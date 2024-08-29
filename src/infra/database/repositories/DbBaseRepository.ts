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

    constructor(model: Model<T>) {
        this.model = model
    }

    async create(data: Partial<T>): Promise<T> {
        const created_document = new this.model(data)
        const model = await created_document.save()
        return model as T
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.findOneAndDelete({ _id: id })
        return result ? true : false
    }

    async update(id: string, data: TFieldQuery<T>): Promise<T> {
        const filter = { _id: id }
        const update = { $set: data }
        return await this.model.findOneAndUpdate(filter, update, { new: true }).exec()
    }

    async getAll(): Promise<T[]> {
        return await this.model.find().lean()
    }

    async queryOne(query: TFiltersQuery<T>): Promise<T> {
        const data = this.convertFiltersToMongooseQuery(query)

        return this.model.findOne(data)
    }
    async queryMany(query: IQuery<T>): Promise<IPaginatedResult<T>> {
        const filters = this.convertFiltersToMongooseQuery(query.query)

        // Initialize the query
        let mongooseQuery = this.model.find(filters)

        // Apply sorting if 'order' is provided
        if (query.order) {
            const sortOption: Record<string, 1 | -1> = {}
            sortOption[query.order.by as string] = query.order.direction === 'asc' ? 1 : -1
            mongooseQuery = mongooseQuery.sort(sortOption)
        }

        // Count total items before applying pagination
        const total_items = await this.model.countDocuments(filters).exec()

        // Initialize pagination variables
        let items: T[] = []
        let total_pages = 1

        if (query.pagination) {
            const { page, per_page } = query.pagination
            const skip = (page - 1) * per_page

            // Apply pagination
            mongooseQuery = mongooseQuery.skip(skip).limit(per_page)

            // Calculate total pages
            total_pages = Math.ceil(total_items / per_page)
        }

        // Execute the query to get the items
        items = await mongooseQuery.exec()

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
