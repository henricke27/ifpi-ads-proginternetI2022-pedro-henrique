const prompt = require('prompt-sync')();
const axios = require('axios').default

function infoRequest(){

    let url = prompt("URL: ")

    if(!url.includes("https://")){
        url = "https://" + url;
    }

    axios.get(url)
        .then(function(response){
            //sucesso na execução;
            console.log(`Status code: ${response.status} - ${response.statusText}`)
            console.log(`Content type: ${response.headers['content-type']}`)
            console.log(`Date: ${response.headers['date']}`)
            console.log(`Etag: ${response.headers['etag']}`)
            console.log(`Vary: ${response.headers['vary']}`)
        })
        .catch(function(error){
            //falha na execução
            console.error(error)
        })
}

infoRequest()