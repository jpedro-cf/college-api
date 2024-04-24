import { IHasher } from '@/interfaces/application/cryptography/Hasher'

export const makeFakeHasher = (): IHasher => {
    class HasherStub implements IHasher {
        async hash(value: string): Promise<string> {
            return Promise.resolve('hashed_data')
        }
    }
    return new HasherStub()
}
