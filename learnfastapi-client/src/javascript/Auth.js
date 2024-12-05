import {Request} from "./Request";

export class Auth {
    static __CURRENT_SESSION_ID  = null;
    static __CURRENT_USER_ID = null;

    static getSessionID() {
        return Auth.__CURRENT_SESSION_ID;
    }
    static getCurrentUserID() {
        return Auth.__CURRENT_USER_ID;
    }
    static isLoggedIn() {
        return Boolean(Auth.getSessionID());
    }

    static signIn(id, pw) { return Request.fetch('/sign_in', 'POST', {
            id: id,
            pw: pw
        })
            .then(response => {
                Auth.__CURRENT_SESSION_ID = String(response.json()['session_id']);
                Auth.__CURRENT_USER_ID = id;
                return true;
            })
    }
    static signUp(id, pw) {
        return Request.fetch('/sign_up', 'POST', {
            id: id,
            pw: pw
        })
            .then(response => response.ok)
    }
    static signOut(session_id) {
        return Request.fetch('/sign_out', 'POST', {})
            .then(response => {
                Auth.__CURRENT_SESSION_ID = null;
                Auth.__CURRENT_USER_ID = null;
            })
    }
    static unregister(session_id) {
        // TODO
    }
}