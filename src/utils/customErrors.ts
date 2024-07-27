export class NotFoundError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'NotFoundError'
    }
}

export class MissingParamError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'MissingParamError'
    }
}

export class InvalidParamError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidParamError'
    }
}

export class PermissionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'PermissionError'
    }
}

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'AuthenticationError'
    }
}

export class AlreadyInUseError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'AlreadyInUseError'
    }
}
