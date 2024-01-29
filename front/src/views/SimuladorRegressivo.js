import React, { useState } from "react";
import '../App.css';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SimuladorProgressivo from './SimuladorProgressivo';
// import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    myButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        color: 'white',
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(0),
        marginBottom: '30px',
        minWidth: '100%',
    },
}));

function SimuladorRegressivo() {

    const classes = useStyles();

    const handleSaveXml = (filename, dataXml) => {
        let dataUrl = `data:application/xml;charset=utf-8,${dataXml}`
        let link = document.createElement('a');
        link.download = `${filename}.xml`;
        link.href = dataUrl;
        link.click();
    }

    const handleImageInput = event => {
        setPath(event.target.files[0])
    }

    const resetForm = () => {
        setDatabase("");
        setPensaoAlimenticia(0);
        setPath(null);
        setOpen(false);
        setContribPrevidenciaOficial(0);
        setDependenteQtd(0);
        setEhDeclaracaoSimplificada(0);
        setNascimento("");
        setOutrasDeducoes(0);
        setValorBruto(0);
    }

    const [database, setDatabase] = useState("");
    const [valorBruto, setValorBruto] = useState(0);
    const [path, setPath] = useState(null);
    const [open, setOpen] = useState(false);
    const [openSucesso, setOpenSucesso] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [contribPrevidenciaOficial, setContribPrevidenciaOficial] = useState(0);
    const [dependenteQtd, setDependenteQtd] = useState(0);
    const [pensaoAlimenticia, setPensaoAlimenticia] = useState(0);
    const [ehDeclaracaoSimplificada, setEhDeclaracaoSimplificada] = useState(0);
    const [nascimento, setNascimento] = useState("");
    const [outrasDeducoes, setOutrasDeducoes] = useState(0);

    const generateFile = () => {
        setOpenSucesso(false);
        setOpen(false);
        let form = new FormData();
        let errors = [];
        form.append("sheets", path);
        form.append("data_referencia", database);
        form.append("valor_bruto", valorBruto);
        form.append("contrib_previdencia_oficial", contribPrevidenciaOficial);
        form.append("dependente_qtd", dependenteQtd);
        form.append("pensao_alimenticia", pensaoAlimenticia);
        form.append("eh_declaracao_simplificada", ehDeclaracaoSimplificada);
        form.append("nascimento", nascimento);
        form.append("outras_deducoes", outrasDeducoes);

        //EXEMPLO DE VALIDAÇÕES DE INPUT

        // if (!path || !path.name) errors.push("Selecione uma planilha!")
        // if (!database) errors.push("Preencha a data de geração do arquivo!")
        // if (!instituicao) errors.push("Preencha os dados da instituição!")
        // if (!remessa) errors.push("Preencha o tipo de envio!")
        // if (!mes) errors.push("Preencha os dados do mês do registro!")
        // if (!ano) errors.push("Preencha os dados do ano do registro!")
        // if (!nomeResp) errors.push("Preencha os dados do nome do responsável!")
        // if (!emailResp) errors.push("Preencha os dados do email do responsável!")
        // if (!telResp) errors.push("Preencha os dados do telefone do responsável!")
        // if (database.toString().length > 10) errors.push("Data de geração do arquivo deve seguir o padrão (AAAA-MM-DD). EX: 2023-03-10")
        // if (database.toString().length < 10) errors.push("Data de geração do arquivo deve seguir o padrão (AAAA-MM-DD). EX: 2023-03-10")
        // if (instituicao.toString().length > 8) errors.push("O CNPJ da Instituição deve seguir o padrão (00000000). EX: 12345678")
        // if (telResp.toString().length != 11) errors.push("O campo telefone aceita apenas 11 dígitos. EX: 99999999999")
        // if (ano.toString().length != 4) errors.push("O campo ano aceita apenas 4 dígitos. EX: 2024")
        // if (mes.toString().length != 2) errors.push("O campo mes aceita apenas 2 dígitos. EX: 10")

        if (errors.length > 0) {
            let stringError = "Erros encontrados: "
            for (let index = 0; index < errors.length; index++) {
                stringError = stringError.concat(errors[index] + " ")

            }
            console.log(stringError);
            setErrorMsg(stringError);
            setOpen(true);
        } else {
            setOpenSucesso(true);
            console.log(path, database, form);
            axios.post('http://localhost:3001/api/simulador', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res, "Retornou")
                if (res?.data && !res?.data?.err) {
                    //PROCESSA DOWNLOAD AQUI FABIAN É NECESSÁRIO PENSAR NO FORMATO DE SAÍDA, UMA NOVA INTERFACE OU UM RESULTADO NA PRÓPRIA TELA, AQUI ELE VAI PEGAR O RETORNO E JOGAR PARA UM XML
                    // handleSaveXml(instituicao, res.data.data);
                    // resetForm()
                    console.log(res, "retornooou")
                }
                if (res.data?.err) {
                    setErrorMsg(res.data.err);
                    setOpen(true);
                }
            }).catch(err => {
                console.log(err, "Retornou erro")
                resetForm();
                setOpenSucesso(false);
                setErrorMsg(err);
                setOpen(true);
            });
        }
    }

    return (
        <header className="App-header">
            <Container >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <SimuladorProgressivo />
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Alert severity="info"> Simulador Regressivo de renda
                            </Alert>
                            <Collapse in={open}>
                                <Alert
                                    variant="outlined"
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    {errorMsg}
                                </Alert>
                            </Collapse>
                            <Collapse in={openSucesso}>
                                <Alert
                                    variant="outlined"
                                    severity="warning"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpenSucesso(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    VAMOS COLOCAR AQUI OS RESULTADOS DO CALCULO
                                </Alert>
                            </Collapse>
                        </Box>
                        <TextField
                            fullWidth
                            margin="normal"
                            value={valorBruto}
                            onChange={(e) => setValorBruto(e.target.value)}
                            label="Valor Bruto"
                            type="number"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="date"
                            fullWidth
                            label="Data-base da informação (AAAA-MM-DD)"
                            margin="normal"
                            value={database}
                            onChange={(e) => setDatabase(e.target.value)}
                            type="date"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="contribprevoficial"
                            fullWidth
                            margin="normal"
                            value={contribPrevidenciaOficial}
                            onChange={(e) => setContribPrevidenciaOficial(e.target.value)}
                            label="Valor de contribuição de previdência oficial"
                            type="number"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="depqtd"
                            fullWidth
                            margin="normal"
                            value={dependenteQtd}
                            onChange={(e) => setDependenteQtd(e.target.value)}
                            label="Quantidade de dependentes"
                            type="number"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="pensaoalim"
                            fullWidth
                            margin="normal"
                            value={pensaoAlimenticia}
                            onChange={(e) => setPensaoAlimenticia(e.target.value)}
                            label="Valor pensão alimentícia"
                            type="number"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="declaracaosimplif"
                            fullWidth
                            margin="normal"
                            value={ehDeclaracaoSimplificada}
                            onChange={(e) => setEhDeclaracaoSimplificada(e.target.value)}
                            label="É declaração simplificada"
                            type="number"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="nascimento"
                            fullWidth
                            margin="normal"
                            value={nascimento}
                            onChange={(e) => setNascimento(e.target.value)}
                            label="Data de nascimento"
                            type="date"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="outrasdeducoes"
                            fullWidth
                            margin="normal"
                            value={outrasDeducoes}
                            onChange={(e) => setOutrasDeducoes(e.target.value)}
                            label="Outras deduções"
                            type="number"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="filled-full-width"
                            label="Planilha base"
                            placeholder="Import file"
                            fullWidth
                            margin="normal"
                            onChange={handleImageInput}
                            type="file"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                        <Button className={classes.myButton} variant="contained" onClick={generateFile} color="primary">Gerar</Button>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Container>
        </header>
    );

}

export default SimuladorRegressivo;