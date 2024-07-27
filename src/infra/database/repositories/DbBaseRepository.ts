import { IBaseRepository, TFieldQuery } from '@/interfaces/application/repositories/BaseRepository'
import { Model } from 'mongoose'

export class DbBaseRepository<T> implements IBaseRepository<T> {
    private model: Model<T>

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
    async getOneByFields(query: TFieldQuery<T>): Promise<T> {
        const filter: TFieldQuery<T> = query as TFieldQuery<T>
        return await this.model.findOne(filter).lean()
    }
    async update(id: string, data: TFieldQuery<T>): Promise<T> {
        const filter = { _id: id }
        const update = { $set: data }
        return await this.model.findOneAndUpdate(filter, update, { new: true }).exec()
    }
    async getAll(): Promise<T[]> {
        return await this.model.find().lean()
    }
}
