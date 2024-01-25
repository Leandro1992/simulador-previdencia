'use strict';

const util = require('../util')
const js2xmlparser = require("js2xmlparser");

//CONVERTE JSON EM XML, EXEMPLO
const GerarXML = async (sheets, fields, tipo) => {
    return new Promise(async (resolve, reject) => {
        // if (tipo == "ArquivoX") {
        //     let xmlTemp = JSON.parse(JSON.stringify(jsonBase9805));
        //     console.log("Gerando XML 9805...");
        //     for (const i of sheets['9805']) {
        //         let valor = {
        //             origem: i.origem,
        //             modalidadePagamento: i.modalidadePagamento,
        //             valorDevolvido: i.valorDevolvido,
        //             qtdCpfsBeneficiados: i.qtdCpfsBeneficiados
        //         }
        //         xmlTemp.valor.push(valor);
        //     }
        //     xmlTemp.tipoEnvio = fields.tipoEnvio;
        //     xmlTemp.dataBase = fields.database;
        //     xmlTemp.cnpjIf = fields.cnpj;
        //     resolve(js2xmlparser.parse("asvr9805", xmlTemp, { declaration: { encoding: "UTF-8" } }));
        // }
        resolve();
    });
};

exports.GerarXML = GerarXML;
