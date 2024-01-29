const { calcular_ir_progressiva_mensal, Calculo_ir_progressiva, calculo_por_faixa } = require('./calculo_progressiva.js');


let simulacao_referencia = new Calculo_ir_progressiva(
    new Date("2024-10-01T00:00:00Z"),// data_referencia, 
    0,// valor_bruto, 
    0,// contrib_previdencia_oficial, 
    0,// dependente_qtd, 
    0,// pensao_alimenticia, 
    0,// eh_declaracao_simplificada
    new Date()
)

// Padrão INSS vigente em 01/01/2024
let faixas_sem_teto_cobranca = [
    { ordem: 1, valor: 2112, ir: 0 },
    { ordem: 2, valor: 2826.65, ir: 7.5/100 },
    { ordem: 3, valor: 3751.05, ir: 15/100 },
    { ordem: 4, valor: 4664.68, ir: 22.5/100 },
    { ordem: 5, valor: 0, ir: 27.5/100 }
];

let faixas_com_teto_cobranca = [
    {ordem:1, valor:1000, ir:1/100},
    {ordem:2, valor:2000, ir:2/100}
]

test('Calculo por faixa de IR - sem teto de cobrança', ()=>{
    expect(calculo_por_faixa(faixas_sem_teto_cobranca, 2000)).toBeCloseTo(0,1)
    expect(calculo_por_faixa(faixas_sem_teto_cobranca, 2500)).toBeCloseTo(29.10,1)
    expect(calculo_por_faixa(faixas_sem_teto_cobranca, 3500)).toBeCloseTo(154.60,1)
    expect(calculo_por_faixa(faixas_sem_teto_cobranca, 4500)).toBeCloseTo(360.77,1)
    expect(calculo_por_faixa(faixas_sem_teto_cobranca, 5500)).toBeCloseTo(627.53,1)
})

test('Calculo por faixa de IR - com teto de cobrança', ()=>{
    expect(calculo_por_faixa(faixas_com_teto_cobranca, 900)).toBeCloseTo(9,1)
    expect(calculo_por_faixa(faixas_com_teto_cobranca, 1500)).toBeCloseTo(20,1)
    expect(calculo_por_faixa(faixas_com_teto_cobranca, 2000)).toBeCloseTo(30,1)
    expect(calculo_por_faixa(faixas_com_teto_cobranca, 2500)).toBeCloseTo(30,1)
})

test('IR sem deduções para R$ 0 (01/01/2024)', ()=>{
    let simulacao = simulacao_referencia;

    let resultado = calcular_ir_progressiva_mensal(simulacao);
    expect(resultado.valor_base).toBeCloseTo(0,2),
    expect(resultado.valor_liquido).toBeCloseTo(0,2),
    expect(resultado.imposto).toBeCloseTo(0,2),
    expect(resultado.aliquota_efetiva).toBeCloseTo(0,4)
})

test('IR  para R$ 15mil (01/01/2024) sem deduções', ()=>{
    let simulacao = simulacao_referencia;
    simulacao.valor_bruto = 15000;

    let resultado = calcular_ir_progressiva_mensal(simulacao);
    expect(resultado.valor_base).toBeCloseTo(15000,2),
    expect(resultado.valor_liquido).toBeCloseTo(11759.96,2),
    expect(resultado.imposto).toBeCloseTo(3240.04,2),
    expect(resultado.aliquota_efetiva).toBeCloseTo(0.2160,4)
})

test('IR para R$ 15mil (01/01/2024) opção por declaracao simplificada', ()=>{
    let simulacao = simulacao_referencia;
    simulacao.valor_bruto = 15000;
    simulacao.eh_declaracao_simplificada = 1;

    let resultado = calcular_ir_progressiva_mensal(simulacao);
    expect(resultado.valor_base).toBeCloseTo(14472.00,2),
    expect(resultado.valor_liquido).toBeCloseTo(11905.16,2),
    expect(resultado.imposto).toBeCloseTo(3094.84,2),
    expect(resultado.aliquota_efetiva).toBeCloseTo(0.2063,4)
})

test('IR para R$ 15mil (01/01/2024) contribuição previdência oficial R$ 1k', ()=>{
    let simulacao = simulacao_referencia;
    simulacao.valor_bruto = 15000;
    simulacao.contrib_previdencia_oficial = 1000;
    
    let resultado = calcular_ir_progressiva_mensal(simulacao);
    expect(resultado.valor_base).toBeCloseTo(14000,2),
    expect(resultado.valor_liquido).toBeCloseTo(12034.96,2),
    expect(resultado.imposto).toBeCloseTo(2965.04,2),
    expect(resultado.aliquota_efetiva).toBeCloseTo(0.1977,4)
})

test('IR para R$ 15mil (01/01/2024) contribuição previdência oficial R$ 1k e desconto por idade', ()=>{
    let simulacao = simulacao_referencia;
    simulacao.valor_bruto = 15000;
    simulacao.contrib_previdencia_oficial = 1000;
    simulacao.dataNascimento = new Date("1904-10-01T00:00:00Z")
    
    let resultado = calcular_ir_progressiva_mensal(simulacao);
    expect(resultado.valor_base).toBeCloseTo(11888,2),
    expect(resultado.valor_liquido).toBeCloseTo(12615.76,2),
    expect(resultado.imposto).toBeCloseTo(2384.24,2),
    expect(resultado.aliquota_efetiva).toBeCloseTo(0.1589,4)
})

test('IR para R$ 15mil (01/01/2024) contribuição previdência oficial R$ 1k e desconto por idade e 3 dependentes', ()=>{
    let simulacao = simulacao_referencia;
    simulacao.valor_bruto = 15000;
    simulacao.contrib_previdencia_oficial = 1000;
    simulacao.dataNascimento = new Date("1904-10-01T00:00:00Z");
    simulacao.dependente_qtd = 3;
    
    let resultado = calcular_ir_progressiva_mensal(simulacao);
    expect(resultado.valor_base).toBeCloseTo(11319.23,2),
    expect(resultado.valor_liquido).toBeCloseTo(12772.17,2),
    expect(resultado.imposto).toBeCloseTo(2227.83,2),
    expect(resultado.aliquota_efetiva).toBeCloseTo(0.1485,4)
})

test('IR para R$ 15mil (01/01/2024) contribuição previdência oficial R$ 1k e desconto por idade e 3 dependentes e R$ 1k pensão alimenticia', ()=>{
    let simulacao = simulacao_referencia;
    simulacao.valor_bruto = 15000;
    simulacao.contrib_previdencia_oficial = 1000;
    simulacao.dataNascimento = new Date("1904-10-01T00:00:00Z");
    simulacao.dependente_qtd = 3;
    simulacao.pensao_alimenticia = 1000;
    
    let resultado = calcular_ir_progressiva_mensal(simulacao);
    expect(resultado.valor_base).toBeCloseTo(10319.23,2),
    expect(resultado.valor_liquido).toBeCloseTo(13047.17,2),
    expect(resultado.imposto).toBeCloseTo(1952.83,2),
    expect(resultado.aliquota_efetiva).toBeCloseTo(0.1302,4)
})
