let tarefas = [];
let filtroAtual = "TODOS";
let proximoId = 1;
let temporizador;
let idEmEdicao = null;

const tarefa = document.querySelector("#tarefa");
const adicionar = document.querySelector("#adicionar");
const listaTarefas = document.querySelector("#listaTarefas");
const contador = document.querySelector("#contador");
const filtros = document.querySelector("#filtros");
const mensagem = document.querySelector("#mensagem");

function notificacao(texto){  //funcao para que o texto seja exibido apenas por 3 segundos
    mensagem.textContent = texto;
    clearTimeout(temporizador);

    temporizador = setTimeout(() => {
        mensagem.textContent = ""
    }, 3000);
}

function salvarTarefas(){ // salvar tarefa usando localStorege, tranformando toda as tarefas de array para uma string em formato JSON
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function recuperar(){ // recupera o arquivo salvo e o converte em array para que seja usado, a funcao confere se existe tarefas salvas para serem resgatadas e as trata conforme condicao. A funcao tambem impede que seja criada uma mesma ID para diferentes tarefas
    const tarefasSalvas = localStorage.getItem("tarefas");

    if(tarefasSalvas === null) {
        tarefas = [];
        proximoId = 1;
    } else {
        tarefas = JSON.parse(tarefasSalvas);
        
        const maiorId = tarefas.reduce((maior, tarefaAtual) => {
            return tarefaAtual.id > maior ? tarefaAtual.id : maior;
        }, 0);

        proximoId = maiorId + 1;
    }
}

function renderizar(){ //resume o uso de listar tarefas
    listarTarefas(obterTarefasFiltradas(filtroAtual));
    atualizarContador();
}

function atualizarContador() { //atualiza  e exibe contador em tempo real
    const totalTarefas = tarefas.length;
    const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
    const tarefasPendentes = totalTarefas - tarefasConcluidas;

    contador.textContent = `Total: ${totalTarefas} | Pendentes: ${tarefasPendentes} | Concluídas: ${tarefasConcluidas}`;
}

function resetarFormularioEdicao() { //funcao para auxiliar na edicao, caso o usuario desista de cancelar uma edicao
    idEmEdicao = null;
    tarefa.value = "";
    adicionar.textContent = "Adicionar";
    
    // Procura se o botão de cancelar existe na tabela e o remove
    const botaoCancelarExistente = document.querySelector("#btn-cancelar");
    if (botaoCancelarExistente) {
        botaoCancelarExistente.remove(); // Remove o botão X da tela
    }
}

function listarTarefas(lista){
    listaTarefas.innerHTML = "";
    
    if (lista.length === 0) { //condicao amigavel para o caso de ainda nao ter nenhuma tarefa ja cadastrada
        const item = document.createElement("li");

        item.textContent = "Você ainda não tem tarefas. Que tal adicionar a primeira? 😊";

       listaTarefas.appendChild(item);
       return;
    }

    lista.forEach((tarefaAtual) => {
        //criando todos os elementos que seram usados para identificar, armazenar, criar, editar uma tarefa
        const item = document.createElement("li");
        const checkbox = document.createElement("input");
        const label = document.createElement("label");
        const remover = document.createElement("button");
        const id = document.createElement("span");
        const editar = document.createElement("button");

        checkbox.type = "checkbox";

        if (tarefaAtual.concluida) { //condicao para marcar o status de uma tarefa 
            checkbox.checked = true;
            item.classList.add("concluida");
        }

        remover.dataset.acao = "remover"; //identificados de botoes para edicao 
        editar.dataset.acao = "editar"; // utlizado esse metodo para que tenha uma identificacao unica, assim tendo mais liberdade na edicao de nomeclatura dos botoes

        label.textContent = tarefaAtual.nome;
        remover.textContent = "Remover";
        editar.textContent = "Editar";
        id.textContent = `${tarefaAtual.id} - `;
        item.dataset.tarefa = tarefaAtual.id;

        item.appendChild(id);
        item.appendChild(checkbox);
        item.appendChild(label);
        item.appendChild(editar);
        item.appendChild(remover);
        listaTarefas.appendChild(item);

        checkbox.addEventListener("change", (event) => {
            tarefaAtual.concluida = event.target.checked;

            salvarTarefas();
            renderizar();
        });
    });
}

function obterTarefasFiltradas(filtro) { //tratamento de filtros, fazendo disticao de qual filtro deve ser exibido
    if (filtro === "TODOS") {
        return tarefas;
    } else if (filtro === "PENDENTES"){
        return tarefas.filter((tarefa) => !tarefa.concluida);  //[OBSERVAÇÃO] - criar identificadores unicos para os tipos de filtro utilizando data-*
    } else if (filtro === "CONCLUÍDAS") {
        return tarefas.filter((tarefa) => tarefa.concluida);
    } else {
        return tarefas;
    }
}

function adicionarTarefa() {
    const valorTarefa = tarefa.value.trim(); //evitar espaços em branco 
    
    if(valorTarefa) { 
        if(idEmEdicao !== null){ //identifica se existe uma tarefa em edicao. Metodo utilizado para que essa condicional nao seja repassada todas as vezes
            const tarefaEncontrada = tarefas.find((tarefa) => tarefa.id === idEmEdicao); 
            
            if(tarefaEncontrada){
                tarefaEncontrada.nome = valorTarefa;
                notificacao("Tarefa editada com sucesso! ");
            } else {
                return;
            }
            
        } else {
            
            tarefas.push({
                id: proximoId,
                nome: valorTarefa,
                concluida: false,
            });
            
            notificacao("Tarefa adicionada com sucesso! 🎉");
            proximoId++; 
        }
        
        resetarFormularioEdicao();
        salvarTarefas();
        renderizar();
    }

}

filtros.addEventListener("click", (event) => { //disparo do filtro
    const filtroSelecionado = event.target.textContent;

    filtroAtual = filtroSelecionado

    renderizar();
});

adicionar.addEventListener("click", adicionarTarefa);

tarefa.addEventListener("keydown", (event) => { // ativando botao "ENTER", para enviar tarefas para a lista de tarefas
    if (event.key === "Enter"){
        adicionarTarefa();
    } 
});

listaTarefas.addEventListener("click", (event) => { //configurando botão de editar/remover

    if(event.target.dataset.acao === "remover") {

        const item = event.target.parentElement;
        const idTarefa = Number(item.dataset.tarefa);

        const atualizadas = tarefas.filter((tarefa) => {
            return tarefa.id !== idTarefa;
        });

        tarefas = atualizadas;

        if(idTarefa === idEmEdicao){ //se o id da tarefa for o mesmo que id em edicao sera resetado para que se o usuario quiser remover a tarefa que estava sendo editada, nao cause erro de permanecer mostrando o processo de edicao e travar a adicao de tarefa
            resetarFormularioEdicao();
        }

        salvarTarefas();
        notificacao("Tarefa removida com sucesso! 🗑️");
        renderizar();
    } else if (event.target.dataset.acao === "editar") {
        //[OBSERVAÇÃO] — Evitar que o usuário comece outra edição sem finalizar a anterior
        const item = event.target.parentElement;
        const idTarefa = Number(item.dataset.tarefa);
        const resultado = tarefas.find((tarefa) => tarefa.id === idTarefa);

        if (resultado) { //confere se existe uma tarefa para edicao
            adicionar.textContent = "Salvar edição"
            idEmEdicao = resultado.id;
            tarefa.value = resultado.nome;
        } else {
            return;
        }
        

        if(!document.querySelector("#btn-cancelar")){ //cria o botao de cancelar
            const tabela = document.querySelector("#campoFormulario");
            const cancelar = document.createElement("button");

            cancelar.textContent = "X";
            cancelar.id = "btn-cancelar";

            cancelar.addEventListener("click", resetarFormularioEdicao);

            tabela.appendChild(cancelar);
        }
    }
});

recuperar();
renderizar();