import { ChatInputCommandInteraction } from 'discord.js'

export interface IDiscordCommand {
    name: string
    execute(interaction: ChatInputCommandInteraction): Promise<void>
}

export class DiscordCommands {
    constructor(private readonly commands: IDiscordCommand[]) {}
    async execute(interaction: ChatInputCommandInteraction) {
        const { commandName } = interaction
        for (const command of this.commands) {
            if (command.name == commandName) {
                return command.execute(interaction)
            }
        }
    }
}
