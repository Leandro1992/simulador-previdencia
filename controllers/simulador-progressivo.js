'use strict';

const util = require('../util')
const {Calculo_ir_progressiva, calcular_ir_progressiva_mensal} = require('../util/use_cases/calculo_progressiva/calculo_progressiva')
const excelToJson = require('convert-excel-to-json');

const checkSheetsData = (files) => {
    return new Promise((resolve, reject) => {
        let sheets = {};
        if (files && files.sheets && files.sheets.path) {
            sheets = excelToJson({
                sourceFile: files.sheets.path,
                sheets: [
                    {
                        name: 'Simulaçao Progressiva',
                        columnToKey: {
                            A: 'Data',
                            B: 'Cotas',
                            C: 'Valor',
                        },
                        header: {
                            rows: 1
                        }
                    }
                ]
            });
            resolve(sheets)
        } else {
            reject("erro ao buscar os dados da planilha")
        }
    })
}


//START, RECEBE A PLANILHA E CHAMA OS SERVIÇOS PARA TRATAMENTO
const simular = async (sheets, fields) => {
    console.log("Iniciando cálculo simulação de tribuição no modelo progressiva")
    return new Promise(async (resolve, reject) => {
        try {
            let data = await checkSheetsData(sheets)
            
            console.log(data, fields)
            //REALIZAR CÁLCULO OU CHAMAR FUNÇÕES EM UTILS E PRIVADAS PARA PROCESSAR A LÓGICA (FABIAN)
            
            let calculo_ir_progressiva = new Calculo_ir_progressiva(
                new Date(fields.data_referencia),// data_referencia, 
                fields.valor_bruto,// valor_bruto, 
                fields.contrib_previdencia_oficial,// contrib_previdencia_oficial, 
                fields.dependente_qtd,// dependente_qtd, 
                fields.pensao_alimenticia,// pensao_alimenticia, 
                fields.eh_declaracao_simplificada,// eh_declaracao_simplificada
                new Date(fields.nascimento), //data nascimento
                fields.outras_deducoes,// outras_deducoes
            )
            console.log(calculo_ir_progressiva, "objeto simulação")

            let result = calcular_ir_progressiva_mensal(calculo_ir_progressiva)

            console.log("aliquota_efetiva " + result.aliquota_efetiva)
            console.log("imposto " + result.imposto)
            console.log("valor_base " + result.valor_base)
            console.log("valor_liquido " + result.valor_liquido)

            resolve(result)
        } catch (error) {
            reject(error)
        }
    });
};

exports.simular = simular;
