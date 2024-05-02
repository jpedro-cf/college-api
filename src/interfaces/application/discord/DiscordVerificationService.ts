export interface IDiscordVerificationService {
    sendVerificationMessage(user_id: string): Promise<boolean>
}
