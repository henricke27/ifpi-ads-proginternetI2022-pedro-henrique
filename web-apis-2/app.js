import {Post} from "./Post.js"
import {MicroBlog} from "./MicroBlog.js"

let microBlog = new MicroBlog();

microBlog.create(new Post("De bem com a vida"));
microBlog.create(new Post("Um jornal apenas com notícias boas"));
microBlog.create(new Post("Compre o meu curso"));
microBlog.create(new Post("Boa tarde"));

//-----------------------------------------------------------------------------------------------------

import express, { json, request, response, text, urlencoded } from 'express';
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(3000, () => console.log("run"));

app.get("/posts", (request, response) => { //a
    response.status(200).json(microBlog.retriveAll());
})

app.get("/posts/:id", (request, response) => { //b
    let code = 200;
    let postFounded = microBlog.retrieve(request.params.id);
    
    if(postFounded == null){
        code = 404;
    }

    response.status(code).json(postFounded);
})

app.delete("/posts/:id", (request, response) => { //c
    let code;
    let paramId = request.params.id;
    let postFounded = microBlog.retrieve(paramId);
    
    if(postFounded == null){
        code = 404;
    }else{
        microBlog.delete(paramId);
        code = 204;
    }

    response.status(code).send();
})

app.post("/posts", (request, response) => { //d
    let text = request.body.text;
    response.status(201).json(microBlog.create(new Post(text)));
})

app.put("/posts/:id", (request, response) => { //e
    let code;
    let postFounded = microBlog.retrieve(request.params.id);

    if(postFounded == null){
        code = 404;
    }else {
        if(request.body.text != null && request.body.likes != null){
            postFounded.text = request.body.text;
            postFounded.likes = request.body.likes;
            microBlog.update(postFounded);
            code = 200;
        }else{
            code = 400;
        }
    }
    response.status(code).send();
})

app.patch("/posts/:id", (request, response) => { //f
    let code;
    let postFounded = microBlog.retrieve(request.params.id);
   
    if(postFounded == null){
        code = 404;
    }else{
        if(request.body.text != null){
            postFounded.text = request.body.text;
        }
        if(request.body.likes != null) {
            postFounded.likes = request.body.likes;
        }
        microBlog.update(postFounded);
        code = 200;
    }
    response.status(code).send();
})

app.patch("/posts/:id/like", (request, response) => { //g
    let code;
    let postFounded = microBlog.retrieve(request.params.id);

    if(postFounded == null){
        code = 404;
    }else{
        postFounded.likes += 1;
        microBlog.update(postFounded);
        code = 200;
    }
    response.status(code).send();
})
