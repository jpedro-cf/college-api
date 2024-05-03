import { IToken } from '@/interfaces/application/cryptography/Token'

export const makeTokenMock = (): IToken => {
    class TokenStub implements IToken {
        async encrypt(value: string): Promise<string> {
            return Promise.resolve('encrypted_value')
        }
        async decrypt(token: string): Promise<string> {
            return Promise.resolve('decrypted_value')
        }
    }
    return new TokenStub()
}
