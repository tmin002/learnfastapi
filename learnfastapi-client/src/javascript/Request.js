import { Auth } from './Auth';

export const SERVER_ADDRESS = 'http://localhost:8000';
export class Request {
    static fetch(addr, method, body) {
        let fetch_init = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (Auth.getSessionID() && body)
            body['session_id'] = Auth.getSessionID();
        if (body)
            fetch_init['body'] = JSON.stringify(body);

        return fetch(`${SERVER_ADDRESS}${addr}`, fetch_init)
            .then(response => {
                switch (response.statusCode) {
                    case 409: throw new ConflictCauseError();
                    case 401: throw new AuthenticationCauseError();
                    case 500: throw new ServerCauseError();
                    default:
                        return response;
                }
            })
            .catch(err => throw new SendingFailCauseError(err));
    }
}
export class RequestFailError extends Error {
    constructor(name, message, detail) {
        super(message);
        this.name = name;
        this.message = `${message}\n${detail ? detail : ''}`;
    }
}
export class SendingFailCauseError extends RequestFailError {
    constructor(message) {
        super('SendingFailCauseError', 'Failed to communicate with server', message);
    }
}
export class AuthenticationCauseError extends RequestFailError {
    constructor(message) {
        super('AuthenticationCauseError', 'Authentication failed', message);
    }
}
export class ConflictCauseError extends RequestFailError {
    constructor(message) {
        super('ConflictCauseError', 'Data already exists', message);
    }
}
export class ServerCauseError extends RequestFailError {
    constructor(message) {
        super('ServerCauseError', 'Internal server error', message);
    }
}
