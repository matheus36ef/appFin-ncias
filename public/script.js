console.log("I LOVE JESUS ")

const Modal = {
    open(){
        // Abrir o modal
        // Adicional a class active ao modal        
        const modal = document.querySelector('.modal-overlay');
        modal.classList.remove('close');
        modal.classList.add('active');
    },
    close(){
        // Fechar o Modal
        // Remover a class active do modal
        const modal = document.querySelector('.modal-overlay');
        modal.classList.remove('active');
        modal.classList.add('close');        
    }
}

const Storage = {
    // Pegar as informações
    get() {
        /* Aqui estamos retornando um array, transformardo.
           a propriedade (.parse) irá transformar uma string em array ou objeto. 
        */
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
        /*Estamos falando: retorne JSON transformando em array, a string que está em localStorage.getItem('na chave dev.finances...') 
        caso não tenha essa chave me retorne um array vazio.
        */
    },

    // Guardar
    set(transactions) {
        /**
         * Aqui estámos colocando oque vem de transactions no localStorage, 
         * transformando em string. utilizando a propriedade stringify
         */
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions));
        // Estamos falanod: coloque em localstorage na chave "dev.finances:... transformando em string o (transactions)"
    }
}

const Transaction = {
    all: Storage.get(),

    add(transaction){
        Transaction.all.push(transaction);
        App.reload();
    },

    remove(index){
        Transaction.all.splice(index, 1);
        App.reload();
    },

    incomes() {
        let income = 0;
        // Somar entradas
        Transaction.all.forEach(transaction => {
            if ( transaction.amount > 0 ) {
                income += transaction.amount;
            }
        })

        return income;
    },

    expenses() {
        let expense = 0;
        // somar as saídas
        Transaction.all.forEach((transaction) => {
            if( transaction.amount < 0 ){
                expense += transaction.amount;
            }
        })


        return expense
    },

    total() {
        // entradas - saídas
        
        return Transaction.incomes() + Transaction.expenses();
    },
    
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transactions, index){
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransection(transactions, index);
        tr.dataset.index = index;

        DOM.transactionsContainer.appendChild(tr);
    },

    /*Criando a mascara, o template */
    innerHTMLTransection(transactions, index) {
        const CSSclass = transactions.amount > 0 ? "income" : "expense"
        
        const amoutn = Utils.formatCurrency(transactions.amount);

        

        

        const html = `
        <tr>
            <td class="description">${transactions.description}</td>
            <td class="${CSSclass}">${amoutn}</td>
            <td class="date">${transactions.date}</td>
            <td>
                <a href="#" class="botton_esclud">
                <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Botão de menos">
                </a>
            </td>
        </tr>
        
        `
        return html
    },

    /*Atualizando os valores de Entrada, saida e total */
    updateBalance() {
        document
            .getElementById('incomDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document   
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
            
    },

    //Limpando as transactions no html. (Isso não vai escluir nada)
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
}

const Utils = { // Formataçoes -- 
    // Formatação de valores do imput / form
    formatAmount(value){
        value = Number(value) * 100

        return value;        
    },

    // Formatação da data
    formatDate(date){
        const splittedDate = date.split("-");
        const formatDate = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
        
        return formatDate
    },

    // Formatação de moeda BRL
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";
        
        value = String(value).replace(/\D/g, "");
        
        value = Number(value) / 100;

        value = Number(value).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        })
        
        return (signal + value);
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),


    getValues() {

        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    // Validar valores importados
    validateField() {
        const { description, amount, date } = Form.getValues();
        if(
            description.trim() === "" || 
            amount.trim () === "" || 
            date.trim() === ""
        ) {
            throw new Error("Por favor, preencha todos os campos.");
        }
    },

    // Validar os valores importados.
    formatValues() {
        let { description, amount, date } = Form.getValues();

        // Formatação do amount:
        amount = Utils.formatAmount(amount);

        // Formatação da data:
        date = Utils.formatDate(date); 

        return {
            description,
            amount,
            date
        }
    },

    clearFields() {  
        Form.description.value = "",
        Form.amount.value = "",
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault(); // Está interrompendo o comportamento padrão do form.

        try {
            //----------------------------------------------------
            // Verificar se todas as informações foram preenchidas.
            Form.validateField();
            
            // Formatar os dados para salvar.
            const transaction = Form.formatValues();

            // Salvar.
            Transaction.add(transaction);

            // Apagar o formuladrio, para o proximo envio.
            Form.clearFields();

            // Modal feche.
            Modal.close();

            // Atualizar a aplicação.
            // A atualização ja está sendo feita na etapa 3(salvar).
            //----------------------------------------------------    
        } catch (error) {
            alert(error.message);
        }
    }
}

const App = {
    init() { 
        Transaction.all.forEach(DOM.addTransaction);

        DOM.updateBalance();

        Storage.set(Transaction.all);
    },
    
    reload() {
        DOM.clearTransactions();
        App.init();    
    },
}



App.init();


