import { configCommand, executeConfig } from './config-commands'
import { executeTeste, testeCommand } from './teste-command'

export const commands = {
    teste: {
        data: testeCommand,
        execute: executeTeste
    },
    config: {
        data: configCommand,
        execute: executeConfig
    }
}
