import { E, setElementDisplay } from './DOM';

export class PostElement extends HTMLElement {
    constructor(post) {
        super();
        const template = E("post_template");
        const templateContent = template.content;
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(templateContent.cloneNode(true));

        this.post = post;
        shadowRoot.getElementById("article_title").innerText =
            post.title;
        shadowRoot.getElementById("article_metadata").innerText =
            `${post.userid}, ${post.last_update}`;
        shadowRoot.getElementById("article_content").innerText =
            post.content;

        this.setEditBoxVisibility(false);
    }

    setEditBoxVisibility(visible) {
        setElementDisplay(
            this.shadowRoot.getElementById("article_edit_box"),
            visible ? 'block' : 'none')
    }
}

customElements.define('post-div', PostElement);
