import { Auth } from './Auth';
import {OKPopupElement} from "./element/PopupElementPresets";

export const SERVER_ADDRESS = 'http://localhost:8000';
export class Request {
    static fetch(addr, method, body, silentErrorTypes = []) {
        let fetch_init = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (Auth.isLoggedIn() && body)
            body['session_id'] = Auth.getSessionID();
        if (body)
            fetch_init['body'] = JSON.stringify(body);

        return fetch(`${SERVER_ADDRESS}${addr}`, fetch_init)
            .catch(err => {
                throw new SendingFailCauseError();
            })
            .then(response => {
                switch (response.statusCode) {
                    case 409: throw new ConflictCauseError(response);
                    case 401: throw new AuthenticationCauseError(response);
                    case 500: throw new ServerCauseError(response);
                    default:
                        if (response.ok)
                            return response;
                        else
                            throw new SendingFailCauseError(
                                response,
                                `${response.status} ${response.statusText}`
                            );
                }
            })
            .catch(err => {
                if (!(silentErrorTypes.includes(typeof(err))))
                    OKPopupElement.show('Error', err.message);
                throw err;
            });
    }
}
export class RequestFailError extends Error {
    constructor(response = {}, name = 'RequestFailError', message = 'Request Fail') {
        super(message);
        this.name = name;
        this.message = message;
        this.response = response;
    }
}
export class SendingFailCauseError extends RequestFailError {
    constructor(response = {}, message = 'Failed to communicate with server') {
        super(response, 'SendingFailCauseError', message);
    }
}
export class AuthenticationCauseError extends RequestFailError {
    constructor(response = {}, message = 'Authentication failed') {
        super(response, 'AuthenticationCauseError', message);
    }
}
export class ConflictCauseError extends RequestFailError {
    constructor(response = {}, message = 'Data already exists') {
        super(response, 'ConflictCauseError', message);
    }
}
export class ServerCauseError extends RequestFailError {
    constructor(response = {}, message = 'Internal server error') {
        super('ServerCauseError', message, response);
    }
}
