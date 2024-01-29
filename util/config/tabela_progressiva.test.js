const tabela_vigente = require('./tabela_progressiva');

test('existe tabela progressiva para 01/01/2024', ()=>{
    let tabela = tabela_vigente(new Date(2024,0,1))
    expect(tabela.faixas[0].ordem).toBe(1)
    expect(tabela.faixas[0].valor).toBe(2112)
    expect(tabela.faixas[0].ir).toBe(0)

    expect(tabela.faixas[1].ordem).toBe(2)
    expect(tabela.faixas[1].valor).toBe(2826.65)
    expect(tabela.faixas[1].ir).toBe(7.5/100)
    
    expect(tabela.faixas[2].ordem).toBe(3)
    expect(tabela.faixas[2].valor).toBe(3751.05)
    expect(tabela.faixas[2].ir).toBe(15/100)

    expect(tabela.faixas[3].ordem).toBe(4)
    expect(tabela.faixas[3].valor).toBe(4664.68)
    expect(tabela.faixas[3].ir).toBe(22.5/100)
    
    expect(tabela.faixas[4].ordem).toBe(5)
    expect(tabela.faixas[4].valor).toBe(0)
    expect(tabela.faixas[4].ir).toBe(27.5/100)

    expect(tabela.valor_deducao_declaracao_simplificada).toBe(528)
    expect(tabela.valor_deducao_por_dependente).toBe(189.59)

    expect(tabela.deducao_por_idade.idade).toBe(65)
    expect(tabela.deducao_por_idade.valor_deducao_por_idade).toBe(2112)
})

test('Não existe tabela progressiva para 01/01/1900', ()=>{
    let tabela = tabela_vigente(new Date(1900,0,1))
    expect(tabela.faixas[0].ordem).toBe(0)
    expect(tabela.faixas[0].valor).toBe(0)
    expect(tabela.faixas[0].ir).toBe(0)
    
    expect(tabela.valor_deducao_declaracao_simplificada).toBe(0)
    expect(tabela.valor_deducao_por_dependente).toBe(0)

    expect(tabela.deducao_por_idade.idade).toBe(0)
    expect(tabela.deducao_por_idade.valor_deducao_por_idade).toBe(0)
})