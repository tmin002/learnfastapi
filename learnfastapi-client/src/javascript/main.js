import {createElement, E} from './element/DOM';
import { HeaderControl } from "./element/HeaderControl";
import {LoginPopupElement} from "./element/popup/SignInPopupElement";
import {SignUpPopupElement} from "./element/popup/SignUpPopupElement";
import {PageControl as pageControl, PageControl} from "./element/page/PageControl";
import {PostPageElement} from "./element/page/PostPageElement";
import {WritePageElement} from "./element/page/WritePageElement";
import {Auth} from "./Auth";
import {Post} from "./Post";
import {OKCancelPopupElement, OKPopupElement} from "./element/popup/PopupElementPresets";
import {SignOutPopupElement} from "./element/popup/SignOutPopupElement";

window.onload = () => {
    pageControl.addPage(new PostPageElement());
    pageControl.addPage(new WritePageElement());

    Auth.__CURRENT_USER_ID = 'ssh9930';
    Auth.__CURRENT_SESSION_ID = 'salkjfsdalfsdaj';

    HeaderControl.updateAuthBox('ssh9930');
    E('sign_in_btn').onclick = () => LoginPopupElement.show();
    E('sign_up_btn').onclick = () => SignUpPopupElement.show();
    E('sign_out_btn').onclick = () => SignOutPopupElement.show();
    pageControl.pages['PostPage'].show();
    pageControl.pages['WritePage'].show(new Post(
        '234234234',
        'hello world',
        'aslfjkasdfsdakf',
        'ssh9930',
        '2024 24 24 '
    ));
};
