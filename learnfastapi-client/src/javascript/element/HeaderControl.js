import {E, setElementDisplay} from "./DOM";

export class HeaderControl {
    static getSignInBtnElement = () => E("sign_in_btn");
    static getSignUpBtnElement = () => E("sign_up_btn");
    static getSignOutBtnElement = () => E("sign_out_btn");
    static getUserIDElement = () => E("user_id_label");

    static updateAuthBox(userid) {
        if (!userid) {
            setElementDisplay(HeaderControl.getSignInBtnElement(), 'inline');
            setElementDisplay(HeaderControl.getSignUpBtnElement(), 'inline');
            setElementDisplay(HeaderControl.getSignOutBtnElement(), false);
            setElementDisplay(HeaderControl.getUserIDElement(), false);
        } else {
            setElementDisplay(HeaderControl.getSignInBtnElement(), false);
            setElementDisplay(HeaderControl.getSignUpBtnElement(), false);
            setElementDisplay(HeaderControl.getSignOutBtnElement(), 'inline');
            setElementDisplay(HeaderControl.getUserIDElement(), 'inline');
            HeaderControl.getUserIDElement().innerText = userid;
        }
    }
}