import {Post} from "./Post.js"

class MicroBlog {
    id = 1;
    posts = new Array();

    /**
     * @param {Post} post
     */
    create(post){
        post.id = this.id++;
        post.likes = parseInt(Math.random() * 100);

        this.posts.push(post);
        return post;
    }

    retrieve(id){
        return this.posts.filter(p => p.id == id)[0];
    }

    /**
     * @param {Post} post
     */
    update(post){ 
        this.posts[this.posts.findIndex(p => p.id == post.id)] = post;
    }
    
    delete(id){
        let i = this.posts.findIndex(p => p.id == id);

        if(i>=0){
            this.posts.splice(i, 1);
        }
    }
    retriveAll(){
        return this.posts;
    }
}

export {
    MicroBlog
}