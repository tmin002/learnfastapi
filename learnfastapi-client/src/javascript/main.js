import {Post} from './Post'

//
window.onload = () => {
    Post.getPosts("1")
        .then(posts => {
            posts['posts'].forEach(post => console.log(post))
        })
        .catch(err => alert(err));
};
