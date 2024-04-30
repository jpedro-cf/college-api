export interface IDiscordUser {
    id: string
    bot: boolean
    system: boolean
    flags: any
    username: string
    globalName: string
    discriminator: string
    avatar?: string
    banner?: string
    accentColor?: string
    avatarDecoration?: string
}
