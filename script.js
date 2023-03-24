function Simple() {
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
            
            if (dataBis[i] === 'FACTURA B ' || dataBis[i] === 'FACTURA A ' || dataBis[i] === 'FACTURA C ') {
                dataBis[i] = dataBis[i].replace('FACTURA ', 'F');
            }
            if (dataBis[i] === 'NOTA DE CRÉDITO B ' || dataBis[i] === 'NOTA DE CRÉDITO A '|| dataBis[i] === 'NOTA DE CRÉDITO C ') {
                dataBis[i] = dataBis[i].replace('NOTA DE CRÉDITO ', 'NC');
            }
            if (dataBis[i] === 'NOTA DE DÉBITO B ' || dataBis[i] === 'NOTA DE DÉBITO A '|| dataBis[i] === 'NOTA DE DÉBITO C ') {
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
                        console.log('difference>1' + i)
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
                        }
                        //  else if (difference > 1 && data[i][1] !== data[i + 1][1]) { // trabajar desde acá CONSUME EXCESIVOS RECURSOS
                        //     console.log('caso donde existe un faltante pero no es el consecutivo ya que está enmascarado por otros del mismo tipo' + i)
                        //     let bPossibleConsecutive = 0;
                        //     let bFindedConsecutive = 0;
                        //     let possibles = [];
                        //     for (let j = i + 1; j < data.length; j++) {
                        //         if ((data[j][0] - data[i][0]) < 100000000 && data[i][1] === data[j][1]) {
                        //             console.log(data[j])
                        //             possibles.push(data[j])
                        //             bPossibleConsecutive = 1;
                        //         }
                        //     }
                        //     console.log(possibles)
                        //     if (bPossibleConsecutive) { // hay posibles del mismo pv y tipo de comprob.
                        //         console.log('posible consecutivo')
                        //         for (let l = 0; l < possibles.length; l++) {
                        //             console.log(data[i], possibles[l])
                        //             if ((parseInt(data[i][0]) + 1) == parseInt(possibles[l][0])) {
                        //                 console.log(data[i], possibles[l])
                        //                 console.log('busca consecutivo')
                        //                 bFindedConsecutive=1
                        //             }
                        //             if (!bFindedConsecutive) {
                        //                 console.log('faltante bfind 2') // MUESTRA QUE HAY UN FALTANTE PERO NO SI ES UNO O VARIOS E IMPRIME VARIAS VECES A PESAR DE SER UN SOLO FALTANTE
                        //                 missing[k] = `Varios faltantes desde:  ${data[i][1]} ${parseInt(data[i][0]) + 1} <br>`;
                        //                 k++;
                        //             } else { // CASO DONDE EXISTEN 1 FB, 2 FA, 2 FB, 3FB  a pesar del siguiente no ser el consecutivo tiene que confirmar si después está ya que por ordenamiento de tipo puede situar una FB  después de una FA, dando un falso negativo. Con esto se corrige 
                        //                 console.log('consecutivo encontrado')
                        //             }
                        //         }
                        //     }
                        // }
                    } 
                    // else if (difference === 1 && data[i][1] !== data[i + 1][1]) { 
                    //     console.log(' CASO DONDE EXISTE UN COMPROBANTE DE OTRO TIPO CON MISMA NUMERACION QUE UN FALTANTE ENMASCARANDO EL FALTANTE')
                    //     let bPossibleConsecutive = 0;
                    //     let bFindedConsecutive = 0;
                    //     let possibles = [];
                    //     for (let j = i + 1; j < data.length; j++) {
                    //         if ((data[j][0] - data[i][0]) < 100000000 && data[i][1] === data[j][1]) {
                    //             console.log(data[j])
                    //             possibles.push(data[j])
                    //             bPossibleConsecutive = 1;
                    //         }
                    //     }
                    //     console.log(possibles)
                    //     if (bPossibleConsecutive) { // hay posibles del mismo pv y tipo de comprob.
                    //         console.log('posible consecutivo')
                    //         for (let l = 0; l < possibles.length; l++) {
                    //             console.log(data[i], possibles[l])
                    //             if ((parseInt(data[i][0]) + 1) == parseInt(possibles[l][0])) { // SEGUIR ACÁ !!!
                    //                 console.log(data[i], possibles[l])
                    //                 console.log('busca consecutivo')
                    //                 bFindedConsecutive=1
                    //             }
                    //             if (!bFindedConsecutive) {
                    //                 console.log('faltante bfind 3')
                    //                 missing[k] = `Comprobante faltante:  ${data[i][1]} ${parseInt(data[i][0]) + 1} <br>`;
                    //                 k++;
                    //             } else { // CASO DONDE EXISTEN 1 FB, 2 FA, 2 FB, 3FB  a pesar del siguiente no ser el consecutivo tiene que confirmar si después está ya que por ordenamiento de tipo puede situar una FB  después de una FA, dando un falso negativo. Con esto se corrige 
                    //                 console.log('consecutivo encontrado')
                    //             }
                    //         }
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

function Exhaust() {
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

    function Sort (data) {
        let size = data.length;
        let gapSize = Math.floor((size) / 2);
        while (gapSize > 0) {
            for(h=0; h < gapSize ; h++){
                for (i = gapSize; i < size; i = gapSize + i) {
                    let temp = data[i];
                    for (j = i - gapSize; j >= 0 && data[j] > temp; j = j - gapSize) {
                        data[j + gapSize] = data[j];
                    }
                    data[j + gapSize] = temp;
                }
            }
            gapSize = Math.floor(gapSize/2)
        }

        return data
    }

    function SearchDuplicateNMissing(data) {
        let missing = [];
        let duplicates = [];
        let j = 0;
        let k = 0;
        
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i]) {
                let difference = data[i + 1][0] - data[i][0];
            
                if (data[i + 1][0] !== data[i][0]) {
                    
                    if (difference > 1) {

                        if (difference < 100 && data[i][1] === data[i + 1][1]) {// luego probar pasar esta condicion en la anterior

                            if (difference === 2) {

                                missing[k] = `Comprobante faltante:  ${data[i][1]} ${parseInt(data[i][0]) + 1} <br>`;
                                k++;
                            } else {

                                missing[k] = `Varios faltantes desde: ${data[i][1]} ${parseInt(data[i][0])} <br>`;
                                k++;
                            }
                        } else {
                        }
                    } 
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
    
    function Merge(data, dataBis, orderFx) {
        let mergeData = [];
    
        
        for (let i = 0; i < dataBis.length; i++) {
            
            if (dataBis[i] === 'FACTURA B ' || dataBis[i] === 'FACTURA A ' || dataBis[i] === 'FACTURA C ') {
                dataBis[i] = dataBis[i].replace('FACTURA ', 'F');
            }
            if (dataBis[i] === 'NOTA DE CRÉDITO B ' || dataBis[i] === 'NOTA DE CRÉDITO A ' || dataBis[i] === 'NOTA DE CRÉDITO C ') {
                dataBis[i] = dataBis[i].replace('NOTA DE CRÉDITO ', 'NC');
            }
            if (dataBis[i] === 'NOTA DE DÉBITO B ' || dataBis[i] === 'NOTA DE DÉBITO A ' || dataBis[i] === 'NOTA DE DÉBITO C ') {
                dataBis[i] = dataBis[i].replace('NOTA DE DÉBITO ', 'ND');
            }
        }
    
        for (let i = 0; i < data.length; i++) {
            if (data[i] || dataBis[i]) {
                mergeData[i] = [data[i], dataBis[i]];   
            }
        }
        for (let i = 0; i < mergeData.length; i++) {
            if (!mergeData[i]) {
                mergeData.splice(i, 1);
                i--;
            }
            
        }

        console.log(data, dataBis)

        let resultData = [];


        let ncaList = mergeData.filter(invoice => invoice[1] === 'NCA ');
        let ncbList = mergeData.filter(invoice => invoice[1] === 'NCB ');
        let nccList = mergeData.filter(invoice => invoice[1] === 'NCC ')
        let faList = mergeData.filter(invoice => invoice[1] === 'FA ');
        let fbList = mergeData.filter(invoice => invoice[1] === 'FB ');
        let fcList = mergeData.filter(invoice => invoice[1] === 'FC ');

        orderFx(ncaList);
        orderFx(ncbList);
        orderFx(nccList);
        orderFx(faList);
        orderFx(fbList);
        orderFx(fcList);

        let resultNca = SearchDuplicateNMissing(ncaList);
        let resultNcb = SearchDuplicateNMissing(ncbList);
        let resultNcc = SearchDuplicateNMissing(nccList);
        let resultFa = SearchDuplicateNMissing(faList);
        let resultFb = SearchDuplicateNMissing(fbList);
        let resultFc = SearchDuplicateNMissing(fcList);

        console.log(ncaList, ncbList, nccList, faList, fbList, fcList);
        console.log(resultFa, resultFb)

        if (resultNca.length > 0) {
            resultData.push(resultNca)
        }
        if (resultNcb.length > 0) {
            resultData.push(resultNcb)
        }
        if (resultNcc.length > 0) {
            resultData.push(resultNcc)
        }
        if (resultFa.length > 0) {
            resultData.push(resultFa)
        }
        if (resultFb.length > 0) {
            resultData.push(resultFb)
        }
        if (resultFc.length > 0) {
            resultData.push(resultFc)
        }
        console.log(resultData)

        return resultData;
    
    }
    




    
    let processedNumber = Process(numbers,'-');
    let processedType = Process(type,'');

    console.log(processedNumber);
    console.log(processedType);
    let sortedInvoice = Merge(processedNumber, processedType, Sort);

    console.log(sortedInvoice);
    

    if (processedNumber.length === 1 && processedType.length === 1 && processedNumber === [''] && processedType === [''] ) {
        sortedInvoice = 'No ingresaste ningún dato'}
    else {
        if (processedNumber.length === 1 && processedNumber[0] === '') {
            sortedInvoice = 'No ingresaste numeración de comprobante'
        } else if (sortedInvoice.length === 0) {
            console.log(sortedInvoice)
            console.log(processedNumber)
            sortedInvoice = `Este Libro IVA es una maravilla. 
No existen faltantes, ni duplicados`
        } else {
            sortedInvoice = sortedInvoice.join(`
            `);
        }
    }

    let resultDiv = document.getElementById('result')
    resultDiv.innerHTML = sortedInvoice

}

document.getElementById('submit').addEventListener('click', function() {
    let activeElement = document.querySelector('input[name="radio"]:checked');

    if(activeElement.value === 'simpleCheckbox') {
        Simple();
    } else {
        Exhaust();
    }
});

const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );