/** Recebe capital, juros e tempo. E retorna o juros simples do período.
 * 
 * 
 * @param {Number} capital Capital inicial
 * @param {Number} juros Juros (em decimal. ex: 3,5% = 0.035) por tempo
 * @param {Number} tempo Período de tempo ao qual o juros é aplicado
 * @returns {Number} Juros simples
 */
const jurosSimples = (capital, juros, tempo) => capital * juros * tempo

/** Retorna o montante de juros simples
 * 
 * @param {Number} capital Capital inicial
 * @param {Number} juros Juros (em decimal. ex: 3,5% = 0.035) por tempo
 * @param {Number} tempo Período de tempo ao qual o juros é aplicado
 * @returns Quantia inicial acrescida dos juros
 */
const montanteJurosSimples = ({jurosSimples}) => (capital, juros, tempo) => capital + jurosSimples(capital,juros,tempo)

/** Recebe C (capital), i (juros em decimal) e t (tempo) e retorna o montante de Juros Compostos para o período, dado pela fórmula: M = C * (1 +  i) ^ n​.
 * 
 * @param {Number} capital Capital inicial
 * @param {Number} juros Juros (em decimal. ex: 3,5% = 0.035) por tempo
 * @param {Number} tempo Período de tempo ao qual o juros é aplicado
 * @returns Montante de juros compostos
 */
const montanteJurosCompostos = (capital, juros, tempo) => capital * (1 + juros) ** tempo

/** Retorna o valor dos juros compostos de um período 
 * 
 * 
 * @param {Number} capital Capital inicial
 * @param {Number} juros Juros (em decimal. ex: 3,5% = 0.035) por tempo
 * @param {Number} tempo Período de tempo ao qual o juros é aplicado
 * @returns Valor dos juros compostos
 */
const jurosCompostos = ({montanteJurosCompostos}) => (capital, juros, tempo) => montanteJurosCompostos(capital, juros, tempo) - capital

module.exports = {
    jurosSimples,
    jurosCompostos: jurosCompostos({montanteJurosCompostos}),
    montanteJurosSimples: montanteJurosSimples({montanteJurosCompostos}),
    montanteJurosCompostos,
    pure: {
        montanteJurosSimples,
        jurosCompostos
    }
}