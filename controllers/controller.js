const SimuladorRegressivo = require('./simulador-regressivo.js');
const SimuladorProgressio = require('./simulador-progressivo.js');
const AdmZip = require('adm-zip');
const formidable = require('formidable');
const util = require('../util/index.js');

exports.initControllers = (app) => {

    //SIMULAÇÃO REGRESSIVA
    app.post('/api/simulador-regressivo', (req, res, next) => {
        console.log('/api/simulador-regressivo')
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