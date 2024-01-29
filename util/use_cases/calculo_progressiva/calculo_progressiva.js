const tabela_vigente = require('../../config/tabela_progressiva');
const getIdade = require('../../shared/calculo_idade')


function Calculo_ir_progressiva(data_referencia, valor_bruto, contrib_previdencia_oficial, dependente_qtd, pensao_alimenticia, eh_declaracao_simplificada, dataNascimento) {
    this.data_referencia = new Date(data_referencia);
    this.valor_bruto = valor_bruto;
    this.contrib_previdencia_oficial = contrib_previdencia_oficial;
    this.dependente_qtd = dependente_qtd;
    this.pensao_alimenticia = pensao_alimenticia;
    this.eh_declaracao_simplificada = eh_declaracao_simplificada;
    this.dataNascimento = dataNascimento;
}


function calcular_ir_progressiva_mensal(Calculo_ir_progressiva) {
    let tabela = tabela_vigente(new Date(Calculo_ir_progressiva.data_referencia));

    let idade_simulado = getIdade(Calculo_ir_progressiva.dataNascimento, Calculo_ir_progressiva.data_referencia);
    
    let valor_referencia = Calculo_ir_progressiva.valor_bruto +0;
    let valor_contrib_previdencia_oficial = Calculo_ir_progressiva.contrib_previdencia_oficial +0;
    let valor_deducao_dependentes = tabela.valor_deducao_por_dependente*Calculo_ir_progressiva.dependente_qtd +0;
    let valor_pensao_alimenticia = Calculo_ir_progressiva.pensao_alimenticia +0;
    let valor_declaracao_simplificada = Calculo_ir_progressiva.eh_declaracao_simplificada === 1? tabela.valor_deducao_declaracao_simplificada+0:0;
    let idade_deducao_por_idade = tabela.deducao_por_idade.idade;
    let valor_deducao_por_idade = idade_simulado >= idade_deducao_por_idade ? tabela.deducao_por_idade.valor_deducao_por_idade : 0;
    
    let valor_deducoes = 
        (valor_contrib_previdencia_oficial + 
        valor_deducao_dependentes + 
        valor_pensao_alimenticia + 
        valor_deducao_por_idade) + 0 ;

    valor_deducoes = valor_declaracao_simplificada > valor_deducoes ? valor_declaracao_simplificada : valor_deducoes;
    

    let valor_base_calculo = valor_referencia - valor_deducoes;
    let imposto_cobrado = calculo_por_faixa(tabela.faixas, valor_base_calculo);
    
    let valor_base = parseFloat(valor_base_calculo + 0);
    let valor_liquido = parseFloat(valor_referencia-imposto_cobrado + 0);
    let imposto = parseFloat(imposto_cobrado + 0);
    let aliquota_efetiva = imposto === 0 ? 0:parseFloat(Number((imposto_cobrado/valor_referencia)).toFixed(4))
    
    return {
        valor_base : valor_base,
        valor_liquido : valor_liquido,
        imposto : imposto,
        aliquota_efetiva: aliquota_efetiva
    }
}

function calculo_por_faixa(faixas, valor){
    let contagem_faixas = faixas.length;    
    let imposto_cobrado = 0;
    let ultima_faixa_tem_limite_infinito = faixas[contagem_faixas-1].valor === 0 ? 1:0 
    let valor_limite_faixa_anterior = 0

    for (let i = 0; i < faixas.length - ultima_faixa_tem_limite_infinito; i++) {
        if(valor > faixas[i].valor){
            imposto_cobrado = imposto_cobrado + ((faixas[i].valor-valor_limite_faixa_anterior)*faixas[i].ir)
            valor_limite_faixa_anterior = faixas[i].valor
        }else{
            imposto_cobrado = imposto_cobrado + ((valor-valor_limite_faixa_anterior)*faixas[i].ir)
            valor_limite_faixa_anterior = faixas[i].valor
            break;
        }
    }
    
    if(ultima_faixa_tem_limite_infinito && (valor > valor_limite_faixa_anterior)){
        imposto_cobrado = imposto_cobrado + ((valor-valor_limite_faixa_anterior)*faixas[contagem_faixas-1].ir)
        
    }
    return Number(imposto_cobrado.toFixed(2))
}


module.exports = {
    calcular_ir_progressiva_mensal,
    Calculo_ir_progressiva,
    calculo_por_faixa
};