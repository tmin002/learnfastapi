import {createElement, E} from './element/DOM';
import { PostElementControl } from "./element/PostElementControl";
import { HeaderControl } from "./element/HeaderControl";
import {PostElement} from "./element/PostElement";
import {Post} from "./Post";
import {PopupElement} from "./element/PopupElement";
import {OKPopupElement} from "./element/PopupElementPresets";
import {LoginPopupElement} from "./element/SignInPopupElement";
import {SignUpPopupElement} from "./element/SignUpPopupElement";

//
window.onload = () => {
    HeaderControl.updateAuthBox();
    E('sign_in_btn').onclick = () => LoginPopupElement.show();
    E('sign_up_btn').onclick = () => SignUpPopupElement.show();
    PostElementControl.updatePage(1);
    SignUpPopupElement.show();
};
