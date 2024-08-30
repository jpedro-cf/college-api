import { IHasher } from '@/interfaces/application/cryptography/Hasher'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUser } from '@/domain/User'
import { AlreadyInUseError } from '@/utils/customErrors'
import { ISignUp, ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'

export class SignUpUseCase implements ISignUp {
    constructor(private readonly usersRepository: IUsersRepository, private readonly hasher: IHasher) {}

    async execute(data: ISignUpDTO): Promise<IUser> {
        const exists = await this.usersRepository.queryOne({ email: { _equals: data.email } })

        if (exists) {
            throw new AlreadyInUseError('Usuário com esse email já existe.')
        }

        const hashedPassword = await this.hasher.hash(data.password)
        data.password = hashedPassword

        const createdUser = await this.usersRepository.create(data)

        return createdUser
    }
}
