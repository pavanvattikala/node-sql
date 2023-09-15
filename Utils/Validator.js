const getErors = (dataFelids, requiredFields) => {

    let errors={};

    for (const field of requiredFields) {
       
        if (!(field in dataFelids)) {
            console.log(field);
            errors[field] = field+" is Missing";
        }
    }
        
    let errorCount = Object.keys(errors).length

    if(errorCount>0){
        return JSON.stringify(errors);
    }
    else {
        return null; // No errors
    }
}

module.exports = getErors;