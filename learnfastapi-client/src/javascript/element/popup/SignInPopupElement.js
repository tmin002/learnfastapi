import {PopupElement} from "./PopupElement";
import {createElement} from "../DOM";
import {Auth} from "../../Auth";
import {OKPopupElement} from "./PopupElementPresets";
import {AuthenticationCauseError} from "../../Request";
import {HeaderControl} from "../HeaderControl";
import {PageControl} from "../page/PageControl";

export class LoginPopupElement extends PopupElement {
    constructor() {
        super(
            createElement('div', `
                <h3>Sign In</h3>
                ID: <input class="signin_id_input"><br>
                PW: <input class="signin_pw_input" type="password">
            `),
            [
                createElement('button', `Sign In`, {
                    '$self': {
                        eventName: 'onclick',
                        event: () => {
                            let id =
                                this.getElementsByClassName("signin_id_input")[0].value;
                            let pw =
                                this.getElementsByClassName("signin_pw_input")[0].value;
                            Auth.signIn(id, pw)
                                .then(response => {
                                    HeaderControl.updateAuthBox(Auth.getCurrentUserID());
                                    PageControl.pages['PostPage'].updatePage();
                                    this.close();
                                })
                                .catch(err => {
                                    if (err.processable)
                                        OKPopupElement.show("Sign In", err.message);
                                });
                        }
                    }
                }),
                createElement('button', `Cancel`, {
                    '$self': {
                        eventName: 'onclick',
                        event: () => {
                            this.close();
                        }
                    }
                }),
            ]);
    }

    static show() {
        document.body.appendChild(new LoginPopupElement());
    }
}
customElements.define('login-popup-div', LoginPopupElement);
