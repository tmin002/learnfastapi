import {createElement, E, setElementDisplay} from '../DOM';
import {PageElement} from "./PageElement";
import {PageControl} from "./PageControl";
import {Auth} from "../../Auth";
import {OKCancelPopupElement, OKPopupElement} from "../popup/PopupElementPresets";
import {SignUpPopupElement} from "../popup/SignUpPopupElement";
import {Post} from "../../Post";
import {PostPageElement} from "./PostPageElement";
import {ProcessableRequestFailError, UnprocessableRequestFailError} from "../../Request";

export class WritePageElement extends PageElement {

    constructor() {
        super('WritePage',
            createElement('div', `
            <div id="write_update_label"></div>
            <div id="write_box">
                <input id="write_post_title_textbox" value="Write Title">
                <textarea id="write_post_content_textbox">Write Content</textarea>
            </div>
            <div id="write_etc_box">
                Only visible to authenticated users 
                <input id="write_post_private_checkbox" type="checkbox">
                <button id="write_post_upload_btn">Upload post</button>
                <button id="write_post_reset_btn">Reset</button>
            </div>
        `, {
                '#write_post_upload_btn': {
                    eventName: 'onclick',
                    event: ()=> {
                        this.upload();
                    }
                },
                '#write_post_reset_btn': {
                    eventName: 'onclick',
                    event: ()=> {
                        this.reset();
                    }
                },
                '#write_post_private_checkbox': {
                    eventName: 'onclick',
                    event: ()=> {
                        this.private = E("write_post_private_checkbox").checked;
                    }
                },
            }), 'header_upload_page_btn');

        this.__updateMode = false;
        this.updateTargetPost = null;
        this.private = false;
    }

    get updateMode() {
        return this.__updateMode;
    }
    setUpdateMode(value, updateTargetPost) {
        if (value) {
            E("write_update_label").innerText =
                `Update post: ${this.updateTargetPost.toString()}`;
            E("write_post_upload_btn").innerText = 'Update';
            E("write_post_title_textbox").value = this.updateTargetPost.title;
            E("write_post_content_textbox").innerText = this.updateTargetPost.content;
        } else {
            E("write_update_label").innerText = '';
            E("write_post_upload_btn").innerText = 'Upload';
        }
        this.__updateMode = value;
    }
    show(postToUpdate) {
        super.show();
        if (postToUpdate) {
            this.updateTargetPost = postToUpdate;
            this.setUpdateMode(true, postToUpdate);
        }
    }
    onPageShow() {
        if (!(Auth.isLoggedIn())) {
            OKPopupElement.show('No permission', 'You must sign in to upload post.');
            return false;
        } else {
            return true;
        }
    }

    upload() {
        let post = new Post(
            E("write_post_title_textbox").value,
            E("write_post_content_textbox").value,
            this.userid,
            this.private
        );
        let responsePromise = this.updateMode ?
            Post.updatePost(this.updateTargetPost.id, post) :
            Post.uploadPost(post);

        responsePromise
            .then(response => {
                OKPopupElement.show('Upload complete', 'post uploaded');
                this.reset();
                PageControl.pages['PostPage'].show();
            })
            .catch(err => {
                if (err.processable)
                    OKPopupElement.show('Upload fail', err.message);
            })
    }
    reset() {
        let confirmMsg = this.updateMode ?
            "Click OK to cancel post update. <br>Any changes will be lost." :
            "Click OK to reset your content. <br>Any changes will be lost.";
        OKCancelPopupElement.show("Reset current content", confirmMsg)
            .then(ok => {
                if (!ok)
                    return false;
                E("write_post_title_textbox").value = "Write Title";
                E("write_post_content_textbox").value = "Write Content";
                if (this.updateMode) {
                    this.setUpdateMode(false);
                    PageControl.pages['PostPage'].show();
                }
            });

    }
}
customElements.define('write-page-element', WritePageElement);
