const SimuladorRegressivo = require('./simulador-regressivo.js');
const Simulador = require('./simulador-progressivo.js');
const AdmZip = require('adm-zip');
const formidable = require('formidable');
const util = require('../util/index.js');

exports.initControllers = (app) => {

    //SIMULAÇÃO REGRESSIVA
    app.post('/api/simulador', (req, res, next) => {
        console.log('/api/simulador')
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err)
                next(err);
                return;
            }
            console.log(fields, files)
            Simulador.simular(files, fields).then((result) => {
                res.send({ data: result });
            }).catch(err => {
                console.log(err)
                res.status(503).send({erro:"Falha ao processar cálculo"})
            })
        });
    });

    //SIMULAÇÃO PROGRESSIVA
    app.post('/api/simulador-progressivo', (req, res, next) => {
        console.log('/api/simulador-progressivo')
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err)
                next(err);
                return;
            }
            console.log(fields, files)
            SimuladorProgressio.simular(files, fields).then((result) => {
                res.send({ data: result });
            })
        });
    });
}