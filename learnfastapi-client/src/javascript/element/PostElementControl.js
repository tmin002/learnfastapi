import { Auth } from "../Auth";
import { Post } from '../Post';
import { PostElement } from "./PostElement";
import { E } from "./DOM";

export class PostElementControl {
    static __postElementList = {};
    static __currentPage = 0;
    static __maxPage = 0;

    static addPostElement(postElement) {
        let userid = postElement.post.userid;

        if (!(this.__postElementList[userid]))
            this.__postElementList[userid] = [];
        this.__postElementList[userid].push(postElement);
    }
    static clearPostElementList() {
        this.__postElementList = {};
    }
    static renderPostElementList() {
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
    static renderPostIndexBox() {
        let container = E('post_index_box');
        container.innerHTML = '';

        for (let idx = 1; idx <= this.__maxPage; idx++) {
            let span = document.createElement('span');
            span.innerText = String(idx);
            span.onclick = () => PostElementControl.updatePage(idx);
            if (idx === this.__currentPage)
                span.className = "selected";
            container.appendChild(span);
        }
    }

    static getCurrentMaxPage() {
       return this.__maxPage;
    }
    static getCurrentPage() {
        return this.__currentPage;
    }

    static updatePostElementListFromServer(page) {
        this.clearPostElementList();
        this.__currentPage = page;
        return Post.getPosts(page)
            .then(res => {
                PostElementControl.__maxPage = res['page_count'];
                res['posts'].forEach(post => {
                    PostElementControl.addPostElement(new PostElement(post));
                });
                return true;
            });
    }

    static updatePage(page) {
        if (!page)
            page = (this.__currentPage !== 0) ? 1 : this.__currentPage;
        this.updatePostElementListFromServer(page)
            .then(() => PostElementControl.renderPostElementList())
            .then(() => PostElementControl.renderPostIndexBox());
    }
}