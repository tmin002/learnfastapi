import {createElement, E, setElementDisplay} from '../DOM';
import {PageElement} from "./PageElement";
import {PageControl} from "./PageControl";
import {Auth} from "../../Auth";
import {Post} from "../../Post";
import {PostElement} from "../PostElement";
import {OKPopupElement} from "../popup/PopupElementPresets";

export class PostPageElement extends PageElement {
    constructor() {
        super('PostPage',
        createElement('div', `
            <div id="post_box"></div>
            <div id="post_index_box"></div>
        `), 'header_post_page_btn');

        this.__postElementList = {};
        this.__currentPage = 0;
        this.__maxPage = 0;
    }

    connectedCallback() {
        super.connectedCallback();
        this.updatePage();
    }

    addPostElement(postElement) {
        let userid = postElement.post.userid;

        if (!(this.__postElementList[userid]))
            this.__postElementList[userid] = [];
        this.__postElementList[userid].push(postElement);
    }
    clearPostElementList() {
        this.__postElementList = {};
    }
    renderPostElementList() {
        let container = E('post_box');
        container.innerHTML = '';
        Object.values(this.__postElementList).forEach(postElements => {
            postElements.forEach(postElement => container.appendChild(postElement));
        });
        if (Auth.isLoggedIn()) {
            this.__postElementList[Auth.getCurrentUserID()].forEach(postElement => {
                postElement.setEditBoxVisibility(true);
            })
        }
    }
    renderPostIndexBox() {
        let container = E('post_index_box');
        container.innerHTML = '';

        for (let idx = 1; idx <= this.__maxPage; idx++) {
            let span = document.createElement('span');
            span.innerText = String(idx);
            span.onclick = () => this.updatePage(idx);
            if (idx === this.__currentPage)
                span.className = "selected";
            container.appendChild(span);
        }
    }

    getCurrentMaxPage() {
        return this.__maxPage;
    }
    getCurrentPage() {
        return this.__currentPage;
    }

    updatePostElementListFromServer(page) {
        this.clearPostElementList();
        this.__currentPage = page;
        return Post.getPosts(page)
            .then(res => {
                this.__maxPage = res['page_count'];
                res['posts'].forEach(post => {
                    this.addPostElement(new PostElement(post));
                });
                return true;
            });
    }

    updatePage(page) {
        if (!page)
            page = (this.__currentPage === 0) ? 1 : this.__currentPage;
        this.updatePostElementListFromServer(page)
            .then(() => this.renderPostElementList())
            .then(() => this.renderPostIndexBox())
            .catch(err => {
                OKPopupElement.show("Error fetching posts", err.message);
            });
    }
}
customElements.define('post-page-element', PostPageElement);
