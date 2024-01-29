function getIdade(de, ate){
    let idade = Math.abs(new Date(ate) - de.getTime());
    idade = new Date(idade).getUTCFullYear() - 1970;
    return idade;
}

module.exports = getIdade;