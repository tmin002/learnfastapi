import {PopupElement} from "./PopupElement";
import {createElement} from "./DOM";
import {Auth} from "../Auth";
import {OKPopupElement} from "./PopupElementPresets";
import {AuthenticationCauseError} from "../Request";
import {HeaderControl} from "./HeaderControl";
import {PostElement} from "./PostElement";
import {PostElementControl} from "./PostElementControl";

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
                    onclick: () => {
                        let id =
                            this.getElementsByClassName("signin_id_input")[0].value;
                        let pw =
                            this.getElementsByClassName("signin_pw_input")[0].value;
                        Auth.signIn(id, pw)
                            .then(() => {
                                HeaderControl.updateAuthBox(Auth.getCurrentUserID());
                                PostElementControl.updatePage();
                                this.close();
                            })
                            .catch(err => {
                                if (err === AuthenticationCauseError)
                                    OKPopupElement.show('Sign In', 'Wrong ID / password.');
                            });

                        }
                    }
                ),
                createElement('button', `Cancel`, {
                    onclick: () => this.close()
                }),
            ]);
    }

    static show() {
        document.body.appendChild(new LoginPopupElement());
    }
}
customElements.define('login-popup-div', LoginPopupElement);
