class Post {
    id;
    text;
    likes;

    constructor(text){
        this.text = text;
    }

    get id(){
        return this.id;
    }

    /**
     * @param {number} id
     */
    set id(id){
        this.id = id;
    }

    get text(){
        return this.text;
    }

    /**
     * @param {string} text
     */
    set text(text){
        this.text = text;
    }

    get likes(){
        return this.likes;
    }

    /**
     * @param {number} likes
     */
    set likes(likes){
        this.likes = likes;
    }

    toString(){
        return "Post: " + this.text + "\nLikes: " + this.likes + "\n"
    }
}

export {
    Post
}
