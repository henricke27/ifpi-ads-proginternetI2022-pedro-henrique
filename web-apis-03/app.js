import {Post} from "./Post.js"

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from './rede-social-1920e-firebase-adminsdk-j0px1-995200d250.json' assert {type: "json"};
import express, { json, request, response, text, urlencoded } from 'express';

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore()
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));


app.listen(3000, () => console.log("run"));


app.get("/posts", async (request, response) => { 
    let docs = await db.collection('posts').orderBy('data').get();
    let posts = new Array()

    docs.forEach(post => posts.push(post.data()));

    response.status(200).json(posts)
})

app.get("/posts/:id", async (request, response) => { 
    let id = request.params.id
    let postFounded = db.collection('posts').doc(id);

    let doc = await postFounded.get()

    let post;
    let code = 200

    if(!doc.exists){
        code = 404
    }else{
        post = doc.data()
    }

    response.status(code).json(post)
})

app.get("/post", async (request, response) => { 
    let id = request.query.q
    let postFounded = db.collection('posts').doc(id);

    let doc = await postFounded.get()

    let post;
    let code = 200

    if(!doc.exists){
        code = 404
    }else{
        post = doc.data()
    }

    response.status(code).json(post)
})

app.delete("/posts/:id", async (request, response) => { 
    let id = request.params.id
    let postFounded = db.collection('posts').doc(id);

    let doc = await postFounded.get()

    let code = 204

    if(!doc.exists){
        code = 404
    }else{
        postFounded.delete();
    }

    response.status(code).send()
})


app.post("/posts", async (request, response) => { 
    let post = new Post(request.body.text);

    await db.collection('posts').add(JSON.parse(JSON.stringify(post)))

    response.status(201).json();
})


app.put("/posts/:id", async (request, response) => { 
    let id = request.params.id

    let postFounded = db.collection('posts').doc(id);
    let doc = await postFounded.get()

    let post;
    let code = 200

    if(!doc.exists){
        code = 404
    }else{
        post = request.body
        await db.collection('posts').doc(id).set(post)
        console.log(doc.data())
    }
    response.status(code).send();
})

app.patch("/posts/:id", async (request, response) => { 
    let id = request.params.id

    let postFounded = db.collection('posts').doc(id);
    let doc = await postFounded.get()

    let post;
    let code = 200

    if(!doc.exists){
        code = 404
    }else{
        post = request.body
        
        await db.collection('posts').doc(id).update(post)
        console.log(doc.data())
    }
    response.status(code).send();
})

app.patch("/posts/:id/like", async (request, response) => { 
    let id = request.params.id

    let postFounded = db.collection('posts').doc(id);
    let doc = await postFounded.get()

    let post;
    let code = 200

    if(!doc.exists){
        code = 404
    }else{
        await db.collection('posts').doc(id).update({likes: doc.data().likes + 1})
        console.log(doc.data())
    }
    response.status(code).send();
})
