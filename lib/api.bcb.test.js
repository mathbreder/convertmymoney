const api = require('./api.bcb');
const axios = require('axios')

jest.mock('axios')

test('getCotacaoAPI', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getCotacaoAPI('url').then(resp => {
        expect(resp).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toEqual('url')
    })
})

test('extractCotacao', () => {
    const cotacao = api.extractCotacao({
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    })
    expect(cotacao).toBe(3.90)
})

describe('getToday', () => {
    const RealDate = Date
    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor() {
                return new RealDate(date)
            }
        }
    }
    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2019-01-01T12:00:00z')
        const today = api.getDate()
        expect(today.dataFinal).toBe("1-1-2019")
        expect(today.dataInicial).toBe("12-29-2018")
    })
})

test('getUrl', () => {
    const url = api.getUrl('DATA-FINAL', 'DATA-INICIAL')
    expect(url).toBe(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='DATA-INICIAL'&@dataFinalCotacao='DATA-FINAL'&$top=100&$orderby=dataHoraCotacao%20desc&$format=json`)
});

test('getCotacao', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    }

    const getDate = jest.fn(),
        getUrl = jest.fn(),
        getCotacaoAPI = jest.fn(),
        extractCotacao = jest.fn()

    getDate.mockReturnValue({ dataFinal: '04-01-2021', dataInicial: '01-01-2021' })
    getUrl.mockReturnValue('url')
    getCotacaoAPI.mockResolvedValue(res)
    extractCotacao.mockReturnValue(3.9)

    api.pure.getCotacao({ getDate, getUrl, getCotacaoAPI, extractCotacao })()
        .then(res => expect(res).toBe(3.9))
});

test('getCotacao except', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    }

    const getDate =
        jest.fn(),
        getUrl = jest.fn(),
        getCotacaoAPI = jest.fn(),
        extractCotacao = jest.fn()

    getDate.mockReturnValue({ dataFinal: '04-01-2021', dataInicial: '01-01-2021' })
    getUrl.mockReturnValue('url')
    getCotacaoAPI.mockReturnValue(Promise.reject('err'))
    extractCotacao.mockReturnValue(3.9)

    api.pure.getCotacao({ getDate, getUrl, getCotacaoAPI, extractCotacao })()
        .then(res => expect(res).toBe(''))
});