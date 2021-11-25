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

const transections = [
    {
        id: 1,
        description: 'Luz',
        amount: -50015,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Criação website',
        amount: +500000,
        date: '23/01/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    },
    {
        id: 4,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    },
    {
        id: 5,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    },
    {
        id: 6,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    }
]

const Transaction = {
    incomes() {
        // somar as entradas
    },
    expenses() {
        // somar as saídas
    },
    total() {
        // entradas - saídas
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transections, index){
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransection(transections);
        

        DOM.transactionsContainer.appendChild(tr)
    },

    /*Criando a mascara, o template */
    innerHTMLTransection(transections) {
        const CSSclass = transections.amount > 0 ? "income" : "expense"
        
        const amoutn = Utils.formatCurrency(transections.amount);

        

        const html = `
        <tr>
            <td class="description">${transections.description}</td>
            <td class="${CSSclass}">${amoutn}</td>
            <td class="date">${transections.date}</td>
            <td>
                <a href="#" class="botton_esclud">
                <img src="./assets/minus.svg" alt="Botão de menos">
                </a>
            </td>
        </tr>
        
        `
        return html
    }
}

const Utils = {
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


transections.forEach((transection) => {
  DOM.addTransaction(transection)
})


