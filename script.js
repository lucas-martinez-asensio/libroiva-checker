
function takeData() {
    let numbers = document.getElementById('numbersTextarea').value;
    let type = document.getElementById('typeTextarea').value;
    console.log(numbers + type)

    function Process(data, replaced) {
        dataSplited = data.split('\n');
        
        let dataReplacedFirst = [];
    
        for (let i = 0; i < dataSplited.length; i++) {
            dataReplacedFirst[i] = dataSplited[i].replace(replaced, '');
        }
        
        return dataReplacedFirst;
    }
    
    function Sort(data, dataBis) {
        let mergeData = [];
    
        for (let i = 0; i < dataBis.length; i++) {
            
            if (dataBis[i] === 'FACTURA B ' || dataBis[i] === 'FACTURA A ') {
                dataBis[i] = dataBis[i].replace('FACTURA ', 'F');
            }
            if (dataBis[i] === 'NOTA DE CRÉDITO B ' || dataBis[i] === 'NOTA DE CRÉDITO A ') {
                dataBis[i] = dataBis[i].replace('NOTA DE CRÉDITO ', 'NC');
            }
            if (dataBis[i] === 'NOTA DE DÉBITO B ' || dataBis[i] === 'NOTA DE DÉBITO A ') {
                dataBis[i] = dataBis[i].replace('NOTA DE DÉBITO ', 'ND');
            }
        }
    
        
        let size = data.length;
        let gapSize = Math.floor((size) / 2);
        while (gapSize > 0) {
            for(h=0; h < gapSize ; h++){
                for (i = gapSize; i < size; i = gapSize + i) {
                    let temp = data[i];
                    let tempB = dataBis[i];
                    for (j = i - gapSize; j >= 0 && data[j] > temp; j = j - gapSize) {
                        data[j + gapSize] = data[j];
                        dataBis[j + gapSize] = dataBis[j]
                    }
                    data[j + gapSize] = temp;
                    dataBis[j + gapSize] = tempB;
                }
            }
            gapSize = Math.floor(gapSize/2)
        }
    
        for (let i = 0; i < data.length; i++) {
            if (data[i] || dataBis[i]) {
                mergeData[i] = [data[i], dataBis[i]];   
            }
        }
        for (let i = 0; i < mergeData.length; i++) {
            if (!mergeData[i]) {
                mergeData.splice(i, 1)
                i--
            }
            
        }
        
        return mergeData
    
    }
    
    function SearchDuplicatesMissing(data) {
        let missing = [];
        let duplicates = [];
        let j = 0;
        let k = 0;
        
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i]) {
                let difference = data[i + 1][0] - data[i][0];
            
                if (data[i + 1][0] !== data[i][0]) {
                    
                    if (difference > 1) {
                        console.log('difference>1')
                        if (difference < 100 && data[i][1] === data[i + 1][1]) {// luego probar pasar esta condicion en la anterior
                            console.log('type==type')
                            if (difference === 2) {
                                console.log('difference==2')
                                missing[k] = `Comprobante faltante:  ${data[i][1]} ${parseInt(data[i][0]) + 1} <br>`;
                                k++;
                            } else {
                                console.log('else difference==2')
                                missing[k] = `Varios faltantes desde: ${data[i][1]} ${parseInt(data[i][0])} <br>`;
                                k++;
                            }
                        } else {
                            // let bFinded = 0;
                            
                            // console.log('else !=type')
                            // for (let j = i; j < data.length - 1; j++) {
                            //     if (data[i][0] + 1 === data[j][0] && data[i][1] + 1 === data[j][1] ) {
                            //         bFinded = 1;
                            //     }
                            //     if (!bFinded) {
                                    
                            //         console.log('faltante bfind')
                            //             missing[k] = `Comprobante faltante:  ${data[i][1]} ${parseInt(data[i][0]) + 1} <br>`;
                            //             k++;
                            //             console.log(data[i], data[j])
                            //     }
                            // }
                        }
                    } 
                    // else if (difference === 1 && data[i][1] !== data[i + 1][1]) {
                    //     let bFinded = 0;

                    //     for (let j = i; j < data.length - 1; j++) {
                    //         if ((data[i][0]) + 1 === data[j][0] && data[i][1] === data[j][1] ) {
                    //             bFinded = 1;
                    //         }
                    //     }
                    //     if (!bFinded) {
                    //             missing[k] = `Comprobante faltante:  ${data[i][1]} ${parseInt(data[i][0]) + 1} <br>`;
                    //             k++;
                    //             console.log(data[i], data[j])
                    //     }
                    // }
                } else {
                    if (data[i][1] === data[i + 1][1]) {
                        duplicates[j] = `Comprobante duplicado: ${data[i][1]} ${parseInt(data[i][0])} <br>`;
                        j++;
                    }
                }
            }
        }


        let result = missing.concat(duplicates);
        
        console.log(result)
        return result;
    }
    
    let processedNumber = Process(numbers,'-');
    let processedType = Process(type,'');
    console.log(processedNumber);
    console.log(processedType);
    let sortedInvoice = Sort(processedNumber, processedType);
    console.log(sortedInvoice);
    let searchedInvoice = SearchDuplicatesMissing(sortedInvoice); 
    

    console.log(sortedInvoice)
    if (sortedInvoice.length===0) {
        searchedInvoice = 'No ingresaste ningún dato'}
    else {
        if (processedNumber.length === 1 && processedNumber[0] === '') {
            searchedInvoice = 'No ingresaste numeración de comprobante'
        } else if (searchedInvoice.length === 0) {
            console.log(sortedInvoice)
            console.log(processedNumber)
            searchedInvoice = `Este Libro IVA es una maravilla. 
No existen faltantes, ni duplicados`
        } else {
            searchedInvoice = searchedInvoice.join(`
            `);
        }
    }

    let resultDiv = document.getElementById('result')
    resultDiv.innerHTML = searchedInvoice

}

