
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
            mergeData[i] = [data[i], dataBis[i]];    
        }
       
        return mergeData
     
    }
    
    function SearchDuplicatesMissing(data) {
        let missing = [];
        let duplicates = [];
        let j = 0;
        let k = 0;
       
        for (let i = 0; i < data.length - 1; i++) {
            let difference = data[i + 1][0] - data[i][0];
       
            if ( data[i + 1][0] !== data[i][0]) {
               
                if (difference !== 1) {
                   
                    if (difference < 100 && (data[i][1] === data[i + 1][1])) {
                       
                        if (difference === 2) {
                            missing[k] = `Comprobante faltante: ${parseInt(data[i][0]) + 1}, ${data[i][1]}`;
                            k++;
                           
                        } else {
                            missing[k] = `
                            Varios faltantes desde: ${data[i]}`;
                            k++;
                        }
                    }
                }
            } else {
                duplicates[j] = `Comprobante duplicado: ${data[i]}`;
                j++;
            }
        }
        console.log(duplicates)
        console.log(missing + duplicates)
        return missing + duplicates;
    }
    
    let processedNumber = Process(numbers,'-');
    let processedType = Process(type,'');
    console.log(processedNumber);
    console.log(processedType);
    let sortedInvoice = Sort(processedNumber, processedType);
    console.log(sortedInvoice);
    let searchedInvoice = SearchDuplicatesMissing(sortedInvoice); 
    
    console.log(searchedInvoice)
    console.log(typeof(searchedInvoice))
    

    let resultDiv = document.getElementById('result')
    resultDiv.innerHTML = searchedInvoice

}

