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

function notificacao(texto){
    mensagem.textContent = texto;
    clearTimeout(temporizador);

    temporizador = setTimeout(() => {
        mensagem.textContent = ""
    }, 3000);
}

function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function recuperar(){
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

function renderizar(){
    listarTarefas(obterTarefasFiltradas(filtroAtual));
    atualizarContador();
}

function atualizarContador() {
    const totalTarefas = tarefas.length;
    const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
    const tarefasPendentes = totalTarefas - tarefasConcluidas;

    contador.textContent = `Total: ${totalTarefas} | Pendentes: ${tarefasPendentes} | Concluídas: ${tarefasConcluidas}`;

}

function resetarFormularioEdicao() {
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
    
    if (lista.length === 0) {
        const item = document.createElement("li");

        item.textContent = "Você ainda não tem tarefas. Que tal adicionar a primeira? 😊";

       listaTarefas.appendChild(item);
       return;
    }

    lista.forEach((tarefaAtual) => {
        const item = document.createElement("li");
        const checkbox = document.createElement("input");
        const label = document.createElement("label");
        const remover = document.createElement("button");
        const id = document.createElement("span");
        const editar = document.createElement("button");

        checkbox.type = "checkbox";

        if (tarefaAtual.concluida) {
            checkbox.checked = true;
            item.classList.add("concluida");
        }

        remover.dataset.acao = "remover";
        editar.dataset.acao = "editar";

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

function obterTarefasFiltradas(filtro) {
    if (filtro === "TODOS") {
        return tarefas;
    } else if (filtro === "PENDENTES"){
        return tarefas.filter((tarefa) => !tarefa.concluida);
    } else if (filtro === "CONCLUÍDAS") {
        return tarefas.filter((tarefa) => tarefa.concluida);
    } else {
        return tarefas;
    }
}

function adicionarTarefa() {
    const valorTarefa = tarefa.value.trim();
    
    if(valorTarefa) {
        if(idEmEdicao !== null){
            const tarefaEncontrada = tarefas.find((tarefa) => tarefa.id === idEmEdicao); // Dentro do find(), não precisamos usar um if, porque o próprio método já procura o elemento que satisfaz a condição
            
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

filtros.addEventListener("click", (event) => {
    const filtroSelecionado = event.target.textContent;

    filtroAtual = filtroSelecionado

    renderizar();
});

adicionar.addEventListener("click", adicionarTarefa); //O addEventListener() aceita uma função como segundo argumento
tarefa.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        adicionarTarefa();
    } 
});

listaTarefas.addEventListener("click", (event) => {

    if(event.target.dataset.acao === "remover") {

        const item = event.target.parentElement;
        const idTarefa = Number(item.dataset.tarefa);

        const atualizadas = tarefas.filter((tarefa) => {
            return tarefa.id !== idTarefa;
        });

        tarefas = atualizadas;

        if(idTarefa === idEmEdicao){
            resetarFormularioEdicao();
        }

        salvarTarefas();
        notificacao("Tarefa removida com sucesso! 🗑️");
        renderizar();
    } else if (event.target.dataset.acao === "editar") {//Melhoria — Evitar que o usuário comece outra edição sem perceber
        
        const item = event.target.parentElement;
        const idTarefa = Number(item.dataset.tarefa);
        const resultado = tarefas.find((tarefa) => tarefa.id === idTarefa);

        if (resultado) {
            adicionar.textContent = "Salvar edição"
            idEmEdicao = resultado.id;
            tarefa.value = resultado.nome;
        } else {
            return;
        }
        

        if(!document.querySelector("#btn-cancelar")){
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