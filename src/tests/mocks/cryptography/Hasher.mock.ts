import { IHashComparer, IHasher } from '@/interfaces/application/cryptography/Hasher'

export const makeFakeHasher = (): IHasher => {
    class HasherStub implements IHasher {
        async hash(value: string): Promise<string> {
            return Promise.resolve('hashed_data')
        }
    }
    return new HasherStub()
}
export const makeFakeHasherCompare = (): IHashComparer => {
    class HasheCompareStub implements IHashComparer {
        async compare(value: string, hash: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    return new HasheCompareStub()
}
