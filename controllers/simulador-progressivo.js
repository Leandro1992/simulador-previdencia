'use strict';

const util = require('../util')
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
            resolve(data)
        } catch (error) {
            reject(error)
        }
    });
};

exports.simular = simular;
