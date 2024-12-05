import { Request } from './Request'

export class Post {
    constructor(id, title, content, userid, last_update) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userid = userid
        this.last_update = last_update
    }

    static getPosts(page_index) {
        return Request.fetch('/post_get', 'POST', {
            page: page_index
        })
            .then(response => response.json())
    }
    static uploadPost(post) {
        return Request.fetch('/post_upload', 'POST', post);
    }
    static deletePost(id) {
        return Request.fetch('/post_delete', 'POST', {
            id: id
        });
    }
    static updatePost(id, post) {
        post.id = id
        return Request.fetch('/post_update', 'POST', post);
    }
}