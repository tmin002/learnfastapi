import {Request} from './Request'

export class Post {
    constructor(id, title, content, userid, last_update, post_private) {
        this.title = title;
        this.content = content;
        this.userid = userid;
        this.private = post_private;
        this.id = id;
        this.last_update = last_update;
    }
    toString() {
        return `Post ${this.title}(${this.id}), last update ${this.last_update}`;
    }

    static getPosts(page_index) {
        return Request.fetch('/post_get', 'POST', {
            page: page_index
        })
            .then(resObj => {
                let returnObj = {};
                returnObj['page_count'] = resObj.page_count;
                returnObj['posts'] = [];
                resObj.posts.forEach(post => {
                    returnObj['posts'].push(new Post(
                        post.id,
                        post.title,
                        post.content,
                        post.userid,
                        post.last_update,
                        post.private
                    ));
                });
                return returnObj;
            });
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