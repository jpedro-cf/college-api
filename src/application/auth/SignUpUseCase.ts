import { IHasher } from '@/interfaces/application/cryptography/Hasher'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUser } from '@/domain/User'
import { ISignUpDTO, ISignUp } from '@/interfaces/domain/useCases/auth/SignUp'
import { AlreadyInUseError } from '@/utils/customErrors'

export class SignUpUseCase implements ISignUp {
    constructor(private readonly usersRepository: IUsersRepository, private readonly hasher: IHasher) {}

    async signUp(registerData: ISignUpDTO): Promise<IUser> {
        const exists = await this.usersRepository.getByField('email', registerData.email)

        if (exists) {
            throw new AlreadyInUseError('Usuário com esse email já existe')
        }

        const hashedPassword = await this.hasher.hash(registerData.password)
        registerData.password = hashedPassword

        const createdUser = await this.usersRepository.create(registerData)
        if (createdUser) {
            const { password, ...user } = createdUser
            return user
        }
        return null
    }
}
