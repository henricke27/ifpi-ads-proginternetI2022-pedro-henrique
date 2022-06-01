import { json } from 'express';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

import serviceAccount from './rede-social-1920e-firebase-adminsdk-j0px1-995200d250.json' assert {type: "json"};

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

var data = Timestamp.now()

db.collection('posts').add(
    {
        'text': 'post com data',
        'likes': 27,
        'data': data
    }
)

console.log(data)

/*await db.collection('posts')
    .get()
        .then((posts) => {
            posts.forEach(post => console.log(post.data()))
        })
        .catch(() => {
            
        })
*/

console.log("run")
