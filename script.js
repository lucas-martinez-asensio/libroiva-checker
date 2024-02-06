class DataProcessor {
    constructor(numbers,types) {
        this.numbers = this.numbersHyphenRemover(numbers.split('\n'));
        this.types = this.typesAbreviator(types.split('\n'));
    }

    numbersHyphenRemover(numbers){
        return numbers.map(number => number.replace("-", ""));
    }

    typesAbreviator(types) {
        types.map((type, index, array) => {
            if(type.includes("FACTURA ")){
                type = type.replace("FACTURA ", "F");
                array[index] = type;
            }
            if(type.includes("NOTA DE CRÉDITO ")){
                type = type.replace("NOTA DE CRÉDITO ", "NC");
                array[index] = type;
            }
            if(type.includes("NOTA DE DÉBITO ")){
                type = type.replace("NOTA DE DÉBITO ", "ND");
                array[index] = type;
            }
        });

        return types;
    }
    
    invoiceConsolidation() {
        this.consolidatedInvoices = [];
        
        for (let i = 0; i < this.numbers.length; i++) {
            if (this.numbers[i]) {
                if(this.types[i])
                    this.consolidatedInvoices[i] = [parseInt(this.numbers[i]), this.types[i].trim()];
                else
                    this.consolidatedInvoices[i] = [parseInt(this.numbers[i]), "n/a"];
            }
        }

        return this.consolidatedInvoices = this.consolidatedInvoices.filter(invoice => invoice !== undefined && invoice !== null);
    }

    static SearchDuplicatesAndMissings(invoices) {
        let missing = [];
        let duplicates = [];
        
        invoices.forEach((invoice,index,array) => {
                const lastIndex = array.length - 1;
                
                if(index !== lastIndex){    
                    const nextInvoice = array[index + 1];
                    const difference = nextInvoice[0] - invoice[0];
                    const normalDifference = 1;
                    const prefixDifference = 1000000;
    
                    if(nextInvoice[0] != invoice[0]){
                        if(difference > normalDifference){
                            if (difference < prefixDifference && invoice[1] === nextInvoice[1])
                                difference === 2 ? missing.push(`Comprobante faltante:  ${invoice[1]} ${parseInt(invoice[0]) + 1} <br>`) : missing.push( `Varios faltantes desde: ${invoice[1]} ${parseInt(invoice[0])} <br>`); 
                        }
                    } else {
                        if(invoice[1] === nextInvoice[1])
                            duplicates.push(`Comprobante duplicado: ${invoice[1]} ${parseInt(invoice[0])} <br>`);
                    }
                }
        });
    
        return this.result = missing.concat(duplicates);
    }
}

function main(){
    const numbersInput = document.getElementById('numbersTextarea').value;
    const typesInput = document.getElementById('typeTextarea').value;
    
    const invoiceProcessed = new DataProcessor(numbersInput,typesInput);
    const invoiceConsolidated = invoiceProcessed.invoiceConsolidation();

    const missingsAndDuplicatesList = [];
    const invoiceTypes = ["NCA","NCB","NCC","FA","FB","FC","n/a"];
    invoiceTypes.forEach(invoiceType => {
        const invoicePerType = invoiceConsolidated.filter(invoice => invoice[1] === invoiceType);
        const invoiceOrderedPerType = invoicePerType.sort(([a],[z]) => a - z);
        const missingsDuplicatesPerType = DataProcessor.SearchDuplicatesAndMissings(invoiceOrderedPerType); 

        if(missingsDuplicatesPerType[0])
            missingsAndDuplicatesList.push(missingsDuplicatesPerType);
    });
    const missingsAndDuplicates = missingsAndDuplicatesList.join();
    
    let resultDiv = document.getElementById('result');
    
    if (numbersInput === '' && typesInput === '') {
        resultDiv.innerHTML = 'No ingresaste ningún dato';
    } else if (numbersInput === '' && typesInput !== '') {
        resultDiv.innerHTML = "No ingresaste numeración de comprobante";
    } else if (!missingsAndDuplicates[0]){
        resultDiv.innerHTML = `Este Libro IVA es una maravilla. 
        No existen faltantes, ni duplicados`;
    } else {
        resultDiv.innerHTML = missingsAndDuplicates;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', () => main());
});



//Bootstrap tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));