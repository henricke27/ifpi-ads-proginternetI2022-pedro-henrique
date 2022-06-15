window.onload = async () => {
    var sendButton = document.getElementsByClassName('send')[0]
    sendButton.addEventListener('click', addProduct)
    loadProducts()
}


const loadProducts = async () => {
    const response = await fetch("http://localhost:3000/products")
    const products = await response.json();

    products.forEach(p => {
        loadAllTemplates(p);
    })
}

const addProduct = async () => {
    const inputs = document.getElementsByClassName('inputData');
    const newProduct = {
        "nome": inputs[0].value,
        "descricao": inputs[1].value,
        "preco": inputs[2].value
    }

    const response = await fetch('http://localhost:3000/product', {
        'method': 'POST',
        'body': JSON.stringify(newProduct),
        'headers': {
            'Content-Type': 'application/json'
        },
    }
);
    const product = await response.json();

    loadAllTemplates(product);
    window.location.reload();
}

const loadAllTemplates = (product) => {
    const template = document.getElementsByClassName("template")[0];
    const element = document.importNode(template.content, true);
    const itens = element.querySelectorAll('p');
    itens[0].innerText = product.nome;
    itens[1].innerText = product.descricao;
    itens[2].innerText = "R$" + product.preco;
    itens[3].innerText = new Date(product.dataPostagem._seconds * 1000)
    document.getElementsByClassName("timeline")[0].append(element);
}