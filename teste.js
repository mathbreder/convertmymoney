const axios = require('axios');
const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='04-08-2021'&@dataFinalCotacao='04-11-2021'&$top=100&$format=json`

const getCotacaoAPI = data => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getCotacao = async () => {
    try {
        const res = await getCotacaoAPI('')
        const cotacao = extractCotacao(res)
        return cotacao
    } catch (err) {
        return ''
    }
}

const teste = async () => {
    const cotacao = await getCotacao()
    console.log(cotacao)
}

teste()