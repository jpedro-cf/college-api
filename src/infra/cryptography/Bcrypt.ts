import bcrypt from 'bcrypt'
import { IHasher } from '@/interfaces/application/cryptography/Hasher'
import { IHashComparer } from '@/interfaces/application/cryptography/Hasher'

export class BcryptAdapter implements IHasher, IHashComparer {
    private readonly salt: number

    constructor(salt: number) {
        this.salt = salt
    }

    async hash(value: string): Promise<string> {
        const hash = await bcrypt.hash(value, this.salt)
        return hash
    }
    async compare(value: string, hash: string): Promise<boolean> {
        const isValid = await bcrypt.compare(value, hash)
        return isValid
    }
}
