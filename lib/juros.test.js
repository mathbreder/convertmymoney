const { montanteJurosSimples, jurosCompostos } = require('./juros');
const juros = require('./juros');

test('jurosSimples', () => {
    expect(juros.jurosSimples(150,0.01,100)).toBe(150)
});

test('montanteJurosSimples', () => {
    const jurosSimples = jest.fn()
    jurosSimples.mockReturnValue(150)
    expect(juros.pure.montanteJurosSimples({jurosSimples})(150,0.01,100))
        .toBe(300)
});

test('montanteJurosCompostos', () => {
    expect(juros.montanteJurosCompostos(150,0.01,100))
        .toBe(405.7220744132293)
});

test('jurosCompostos', () => {
    const montanteJurosCompostos = jest.fn()
    montanteJurosCompostos.mockReturnValue(405.72)
    expect(juros.pure.jurosCompostos({montanteJurosCompostos})(150,0.01,100))
        .toBe(255.72000000000003)
});