import {PopupElement} from "./PopupElement";
import {createElement} from "./DOM";
import {Auth} from "../Auth";
import {OKPopupElement} from "./PopupElementPresets";
import {AuthenticationCauseError, ConflictCauseError} from "../Request";

export class SignUpPopupElement extends PopupElement {
    constructor() {
        super(
            createElement('div', `
                <h3>Sign Up</h3>
                ID: <input class="signin_id_input"><br>
                PW: <input class="signin_pw_input" type="password"><br>
                PW check: <input class="signin_pw_chk_input" type="password">
            `),
            [
                createElement('button', `Sign Up`, {
                    onclick: () => {
                        let id =
                            this.getElementsByClassName("signin_id_input")[0].value;
                        let pw =
                            this.getElementsByClassName("signin_pw_input")[0].value;
                        let pwChk =
                            this.getElementsByClassName("signin_pw_chk_input")[0].value;
                        if (pw !== pwChk) {
                            OKPopupElement.show('Sign Up', 'Password does not match.');
                            return false;
                        }

                        Auth.signUp(id, pw)
                            .then(() => {
                                OKPopupElement.show('Sign Up', 'Sign up complete!');
                                this.close();
                            })
                            .catch(err => {
                                if (err === ConflictCauseError)
                                    OKPopupElement.show('Sign Up',
                                        'ID already used. Choose another one.');
                            });

                        }
                    }
                ),
                createElement('button', `Cancel`, {
                    onclick: () => this.close()
                }),
            ]);
    }

    static show(title, message) {
        document.body.appendChild(new SignUpPopupElement());
    }
}
customElements.define('signup-popup-div', SignUpPopupElement);
