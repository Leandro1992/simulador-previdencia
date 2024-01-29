const getIdade = require('./calculo_idade');

test('Cálculo de idade', () => {
    let dataNascimento = new Date("1989-08-31T00:00:00.00Z");
        expect(getIdade(dataNascimento, new Date("2024-01-01T03:24:00Z"))).toBe(34);
});