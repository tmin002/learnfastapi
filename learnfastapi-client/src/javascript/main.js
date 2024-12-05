import { E } from './element/DOM';
import { PostElementControl } from "./element/PostElementControl";
import { HeaderControl } from "./element/HeaderControl";
import {PostElement} from "./element/PostElement";
import {Post} from "./Post";

//
window.onload = () => {
    HeaderControl.updateAuthBox();
    PostElementControl.updatePage(1);
};
