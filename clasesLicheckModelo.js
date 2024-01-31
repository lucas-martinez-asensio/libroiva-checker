class DataProcessor {
    constructor(numbers,types) {
        // ver si es necesario asignar a cada atributo el numbers así o ya spliteado por el '/n'
        // this.prefixes = fullNumbersSplitter(numbers.split('\n'), 0);
        // this.numbers = fullNumbersSplitter(numbers.split('\n'), 1);
        this.numbers = numbersHyphenRemover(numbers.split('\n'))
        this.types = typesAbreviator(types.split('\n'));
    }

    // static fullNumbersSplitter(fullNumbers, selector){         
    //     return fullNumbers.map(fullNumber => fullNumber.split('-')[selector]);
    // }

    static numbersHyphenRemover(numbers){
        return numbers.map(number => number.replace("-", ""));;
    }

    static typesAbreviator(types) {
        types.forEach(type => {
            type = type.replace('FACTURA ', 'F');
            type = type.replace('NOTA DE CRÉDITO ', 'NC');
            type = type.replace('NOTA DE DÉBITO ', 'ND');
        });

        return types;
    }

    inputsToInvoiceConsolidation(numbers, types) {
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] || types[i]) {
                consolidatedInvoices[i] = [numbers[i], types[i]];   
            }
        }
        consolidatedInvoices = consolidatedInvoices.filter(invoice => invoice !== undefined && invoice !== null);

        return consolidatedInvoices; 
    }
}