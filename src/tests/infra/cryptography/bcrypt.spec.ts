import { BcryptAdapter } from '@/infra/cryptography/Bcrypt'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise((resolve) => resolve('hashed_data'))
    },
    async compare(): Promise<boolean> {
        return new Promise((resolve) => resolve(true))
    }
}))

const salt = 8
const makeSut = () => {
    const sut = new BcryptAdapter(salt)
    return { sut }
}

describe('BCrypt adapter', () => {
    describe('hash', () => {
        test('Should return a valid hash on hash success', async () => {
            const { sut } = makeSut()

            const hash = await sut.hash('any_value')

            expect(hash).toBe('hashed_data')
        })

        test('Should throw if hash throws', async () => {
            const { sut } = makeSut()

            jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

            const promise = sut.hash('any_value')
            expect(promise).rejects.toThrow()
        })
    })

    describe('compare', () => {
        test('Should call compare with correct values', async () => {
            const { sut } = makeSut()

            const compareSpy = jest.spyOn(bcrypt, 'compare')

            await sut.compare('any_value', 'any_hash')
            expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
        })

        test('Should return true when compare succeeds', async () => {
            const { sut } = makeSut()

            const isValid = await sut.compare('any_value', 'any_hash')

            expect(isValid).toBe(true)
        })

        test('Should false true when compare fails', async () => {
            const { sut } = makeSut()
            jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(await new Promise<any>((resolve) => resolve(false)))

            const isValid = await sut.compare('any_value', 'any_hash')

            expect(isValid).toBe(false)
        })

        test('Should throw if compare throws', async () => {
            const { sut } = makeSut()

            jest.spyOn<any, string>(bcrypt, 'compare').mockReturnValueOnce(Promise.reject(new Error()))

            const promise = sut.compare('any_value', 'any_hash')
            expect(promise).rejects.toThrow()
        })
    })
})
