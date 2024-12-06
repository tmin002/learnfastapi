import { E, C, setElementDisplay } from './DOM';

export class PostElement extends HTMLElement {
    constructor(post) {
        super();
        this.post = post;
    }
    connectedCallback() {
        this.innerHTML = `
            <article>
                <h1 class="post_title">${this.post.title}</h1>
                <p class="post_metadata">${this.post.userid}, ${this.post.last_update}</p>
                <div class="post_edit_box">
                    <button>edit</button>
                    <button>delete</button>
                </div>
                <div class="post_content">${this.post.content}</div>
                <br>
                <hr>
            </article>
        `;

        this.setEditBoxVisibility(false);
    }

    setEditBoxVisibility(visible) {
        setElementDisplay(
            this.getElementsByClassName("post_edit_box")[0],
            visible ? 'block' : 'none')
    }
}

customElements.define('post-div', PostElement);
