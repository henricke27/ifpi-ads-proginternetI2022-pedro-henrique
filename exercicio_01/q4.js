const axios = require('axios').default
const prompt = require('prompt-sync')();

function buscarLinks(){

    var regexp = new RegExp('<a.*/a>',"g"); //Delimitar tudo que estiver nas tags "<a ... /a>"
    var regexp2 = new RegExp('href=".*"', "g") //Procurar por href

    let url = prompt("URL: ")

    if(!url.includes("https://")){
        url = "https://" + url;
    }

    axios({
        method: 'GET',
        url: url,
        responseType: 'text'
    }).then(function(response){
        let execArray1
        while(((execArray1 = regexp.exec(response.data)) != null )){ //enquanto .exec tiver trazendo elementos "<a.../a>"
            let execArray2
            while((execArray2 = regexp2.exec(execArray1[0])) != null){ //enquanto .exec tiver tranzendo elementos "href"
                let link = execArray2[0].substring(execArray2[0].indexOf('"')+1, execArray2[0].indexOf('"',6)) //eliminar as aspas e demais atributos
                console.log(link)
            }
        }
    }).catch(function(error){
        console.error(error)
    })
}

buscarLinks()