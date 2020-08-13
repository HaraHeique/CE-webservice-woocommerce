export class ServiceException extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ServiceException.prototype);
    }
}

export class IdNaoEncontrado extends ServiceException {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, IdNaoEncontrado.prototype);
    }
}