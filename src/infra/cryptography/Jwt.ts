import { IToken } from '@/interfaces/application/cryptography/Token'
import { env } from '@/main/config/env'
import jwt from 'jsonwebtoken'

export class JWTAdapter implements IToken {
    private readonly secret: string
    constructor() {
        this.secret = env.jwtSecret
    }

    async encrypt(value: string): Promise<string> {
        const accessToken = jwt.sign({ id: value }, this.secret)
        return accessToken
    }

    async decrypt(token: string): Promise<string> {
        const value: any = await jwt.verify(token, this.secret)
        return value
    }
}
