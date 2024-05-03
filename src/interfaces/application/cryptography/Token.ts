export interface IToken {
    encrypt(value: string): Promise<string>
    decrypt(token: string): Promise<string>
}
