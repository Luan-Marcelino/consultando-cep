//Declarando as variáveis para manipular o DOOM.
const btn_cep = document.querySelector('#btn_cep');
const area_resposta = document.querySelector('#resposta');
const btn_apagar = document.querySelector('#btn-apagar');
const cep = document.querySelector('#cep');

//Funções:
async function pesquisarCep(cep) { //Função assincrona para trazer as informações de CEP da API viaCep

    if(cep.length !== 8){//verifica se o cep tem 8 digitos
        area_resposta.innerHTML ='CEP inválido';   

    }else{
        let url = `https://viacep.com.br/ws/${cep}/json/`;            
        const resposta = await fetch(url);
        const dados = await resposta.json();

        imprimindoRespostaCep(dados);
    }
}

function imprimindoRespostaCep(dados) { //Função para imprimir as informações da API.

    if(dados.erro) {
        area_resposta.innerHTML = 'Não localizada';
    }else{
        area_resposta.innerHTML = `<div id="info-resposta">
                                        <p><b class="info-negrito">CEP:</b> ${dados.cep}</p>
                                        <p><b class="info-negrito">Endereço:</b> ${dados.logradouro}</p>
                                        <p><b class="info-negrito">Bairro:</b> ${dados.bairro}</p>
                                        <p><b class="info-negrito">Região:</b> ${dados.regiao}</p>
                                        <p>${dados.localidade} - ${dados.estado}(${dados.uf})</p>
                                    <div>`
        }
    }

//Listeners de click para botões
btn_cep.addEventListener('click', () =>{
    let cepDigitado = cep.value;
    let cepLimpo = cepDigitado.replace("-",""); //tirando o traço dos números
    console.log(cepLimpo);
    
    cepLimpo.trim();
    pesquisarCep(cepLimpo.trim());
})

btn_apagar.addEventListener('click', ()=>{
    cep.value = "";
    area_resposta.innerHTML = "";
    cep.focus();
});