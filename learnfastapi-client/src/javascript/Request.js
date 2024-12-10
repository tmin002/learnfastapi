import { Auth } from './Auth';
import {OKPopupElement} from "./element/popup/PopupElementPresets";

export const SERVER_ADDRESS = 'http://localhost:8000';
export class Request {
    static fetch(addr, method, body) {
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
                throw new UnprocessableRequestFailError(err.message);
            })
            .then(response => {
                switch (response.status) {
                    case 404: throw new UnprocessableRequestFailError(
                        "Check your network connection<br>(404 Not Found)");
                    case 500: throw new UnprocessableRequestFailError(
                        "Server cause error<br>(500 Internal Server Error)");
                }

                let resObj = response.json();
                if (!(response && response.json) || (!(response.ok) && resObj.detail === undefined)) {
                    throw new UnprocessableRequestFailError(`${response.status} ${response.statusText}`);
                }
                if (!(response.ok)) {
                    throw new ProcessableRequestFailError(response.status, resObj.detail);
                }

                return resObj;
            });
    }
}
export class UnprocessableRequestFailError extends Error {
    constructor(message = 'Request Fail') {
        super(message);
        this.name = "UnprocessableRequestFailError";
        this.message = message;
        this.processable = false;
        OKPopupElement.show('Server / Network Error', message);
    }
}

export class ProcessableRequestFailError extends Error {
    constructor(statusCode, message = 'Request Fail') {
        super(message);
        this.name = "ProcessableRequestFailError";
        this.statusCode = statusCode;
        this.message = message;
        this.processable = true;
    }
}
