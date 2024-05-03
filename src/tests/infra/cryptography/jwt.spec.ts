import jwt, { Jwt } from 'jsonwebtoken'
import { JWTAdapter } from '@/infra/cryptography/Jwt'

const makeSut = (): JWTAdapter => {
    return new JWTAdapter()
}

jest.mock('jsonwebtoken', () => ({
    async sign(): Promise<string> {
        return new Promise((resolve) => resolve('any_token'))
    },
    async verify(): Promise<string> {
        return new Promise((resolve) => resolve('any_value'))
    }
}))
describe('JWTAdapter', () => {
    describe('sign', () => {
        test('Should return a token on sign success', async () => {
            const sut = makeSut()
            const accessToken = await sut.encrypt('any_id')
            expect(accessToken).toBe('any_token')
        })

        test('Should throw if sign throws', async () => {
            const sut = makeSut()
            jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
                throw new Error()
            })
            const promise = sut.encrypt('any_id')
            expect(promise).rejects.toThrow()
        })
    })
    describe('verify', () => {
        test('Should return a value on verify success', async () => {
            const sut = makeSut()
            const value = await sut.decrypt('any_token')
            expect(value).toBe('any_value')
        })

        test('Should throw if verify throws', async () => {
            const sut = makeSut()
            jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
                throw new Error()
            })
            const promise = sut.decrypt('any_token')
            expect(promise).rejects.toThrow()
        })
    })
})
