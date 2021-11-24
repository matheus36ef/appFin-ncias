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