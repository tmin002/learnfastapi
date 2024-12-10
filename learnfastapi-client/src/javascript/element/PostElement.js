import { E, C, setElementDisplay } from './DOM';
import {PageControl} from "./page/PageControl";
import {OKCancelPopupElement, OKPopupElement} from "./popup/PopupElementPresets";
import {Post} from "../Post";

export class PostElement extends HTMLElement {
    constructor(post) {
        super();
        this.post = post;
    }
    connectedCallback() {
        this.innerHTML = `
            <article>
                <h1 class="post_title">${this.post.title}</h1>
                <span class="post_metadata">${this.post.userid}, ${this.post.last_update}</span>
                <div class="post_edit_box">
                    <button class="post_edit_btn">edit</button>
                    <button class="post_delete_btn">delete</button>
                    <br>
                    <br>
                </div>
                <div class="post_content">${this.post.content}</div>
                <br>
                <hr>
            </article>
        `;

        this.querySelector('.post_edit_btn').onclick = () => {
            PageControl.pages['WritePage'].show(this.post);
        }
        this.querySelector('.post_delete_btn').onclick = () => {
            OKCancelPopupElement.show(
                "Delete post", `Are you sure want to delete<br>"${this.post.title}"?`)
                .then(ok => {
                    if (ok)
                        return Post.deletePost(this.post.id);
                    else return false;
                })
                .catch(err => {
                    if (err.processable)
                        OKPopupElement.show('Error deleting post', err.message);
                })
        }
        this.setEditBoxVisibility(false);
    }

    setEditBoxVisibility(visible) {
        setElementDisplay(
            this.getElementsByClassName("post_edit_box")[0],
            visible ? 'block' : 'none')
    }
}

customElements.define('post-div', PostElement);
