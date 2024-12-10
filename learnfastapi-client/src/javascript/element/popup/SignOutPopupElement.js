import {PopupElement} from "./PopupElement";
import {createElement} from "../DOM";
import {Auth} from "../../Auth";
import {OKCancelPopupElement, OKPopupElement} from "./PopupElementPresets";
import {HeaderControl} from "../HeaderControl";
import {PageControl} from "../page/PageControl";

export class SignOutPopupElement extends OKCancelPopupElement {
    constructor() {
        super("Sign Out", "Click OK to confirm sign out.");
    }

    static show() {
        let popup = new SignOutPopupElement();
        document.body.appendChild(popup);
        return popup.__promise
            .then(ok => {
                return ok ?
                    Auth.signOut(Auth.getSessionID()) :
                    true;
            })
            .then(cancel_clicked => {
                if (cancel_clicked)
                    return;
                PageControl.pages['PostPage'].show();
                PageControl.pages['WritePage'].reset();
            })
            .catch(err => {
                if (err.processable)
                    OKPopupElement.show('Sign Out', err.message);
            })
    }
}
customElements.define('sign-out-popup-div', SignOutPopupElement);
