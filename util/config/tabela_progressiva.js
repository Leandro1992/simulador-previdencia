function Tabela(faixas, valor_deducao_declaracao_simplificada, valor_deducao_por_dependente, deducao_por_idade) {
    this.faixas = faixas;
    this.valor_deducao_declaracao_simplificada = valor_deducao_declaracao_simplificada;
    this.valor_deducao_por_dependente = valor_deducao_por_dependente;
    this.deducao_por_idade = deducao_por_idade;


}

function get_tabela_progressiva_vigente(data){ 
    const dataReferencia = new Date(data);
    let faixas = [{ordem:0, valor:0, ir:0}]
    let valor_deducao_declaracao_simplificada = 0;
    let valor_deducao_por_dependente = 0;
    let deducao_por_idade = {idade: 0, valor_deducao_por_idade : 0};
    
    let tabela =  new Tabela(
        faixas, 
        valor_deducao_declaracao_simplificada, 
        valor_deducao_por_dependente, 
        deducao_por_idade );
    
    if(dataReferencia > new Date(2023,0,0)){
        faixas = [
            { ordem: 1, valor: 2112, ir: 0 },
            { ordem: 2, valor: 2826.65, ir: 7.5/100 },
            { ordem: 3, valor: 3751.05, ir: 15/100 },
            { ordem: 4, valor: 4664.68, ir: 22.5/100 },
            { ordem: 5, valor: 0, ir: 27.5/100 }
        ];

        // Força ordenação das faixas
        faixas.sort((a, b) => a.ordem - b.ordem)

        valor_deducao_declaracao_simplificada = 528;
        valor_deducao_por_dependente = 189.59;
        deducao_por_idade = {idade: 65, valor_deducao_por_idade : 2112};
       
        tabela = {
            faixas: faixas,
            valor_deducao_declaracao_simplificada: valor_deducao_declaracao_simplificada,
            valor_deducao_por_dependente : valor_deducao_por_dependente,
            deducao_por_idade : deducao_por_idade}
    }
    return tabela
}

module.exports = get_tabela_progressiva_vigente;