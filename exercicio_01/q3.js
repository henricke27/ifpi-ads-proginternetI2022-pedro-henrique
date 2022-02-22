const fs = require('fs')  
const axios = require('axios').default
const prompt = require('prompt-sync')();

function downloadImage(){

    let url = prompt("URL da imagem: ")

    if(!url.includes("https://")){
        url = "https://" + url;
    }

    axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
    }).then(function(response){
        response.data.pipe(fs.createWriteStream("image-downloaded.png"))
    }).catch(function(error){
        console.error(error)
    }) 
}

downloadImage();