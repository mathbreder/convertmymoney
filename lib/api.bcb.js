const axios = require('axios')

const getUrl = (dataFinal, dataInicial) => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${dataInicial}'&@dataFinalCotacao='${dataFinal}'&$top=100&$orderby=dataHoraCotacao%20desc&$format=json`
const getDate = () => {
    const dataInicial = new Date
    const dataFinal = new Date

    dataInicial.setDate(dataFinal.getDate()-3)

    return {
        dataFinal: `${ dataFinal.getMonth()+1 }-${ dataFinal.getDate() }-${ dataFinal.getFullYear() }`,
        dataInicial: `${ dataInicial.getMonth()+1 }-${ dataInicial.getDate() }-${ dataInicial.getFullYear() }`
    }
}
const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getCotacao = ({getDate, getUrl, getCotacaoAPI, extractCotacao}) => async () => {
    try {

        const {dataFinal, dataInicial} = getDate()
        console.log( dataFinal, dataInicial )
        const url = getUrl(dataFinal, dataInicial)
        const res = await getCotacaoAPI( url )
        const cotacao = extractCotacao(res)
        return cotacao
    } catch (err) {
        return ''
    }
}

module.exports = {
    getCotacaoAPI,
    extractCotacao,
    getCotacao: getCotacao({ getDate, getUrl, getCotacaoAPI, extractCotacao}),
    getUrl,
    getDate,
    pure: {
        getCotacao
    }
}