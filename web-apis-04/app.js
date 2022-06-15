import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from '?' assert {type: "json"};
import express, { json, request, response, text, urlencoded } from 'express';
import cors from 'cors';

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const app = express()

app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())

app.listen(3000, () => {
  console.log("run")
})

app.get("/", async (req, res) => {
  res.status(200).send()
})

app.get("/products", async (req, res) => {
  let docs = await db.collection("/products").orderBy("dataPostagem", "desc").get()
  let products = new Array()

  docs.docs.forEach(product => products.push({id: product.id,...product.data()}))

  res.status(200).json(products)
})

app.post("/product", async (req, res) => {
  let product = {
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: req.body.preco,
    dataPostagem: Timestamp.now()
  }
  let productAdd = await (await db.collection("/products").add(product)).get();

  res.status(200).json({id: productAdd.id,...productAdd.data()})
})

