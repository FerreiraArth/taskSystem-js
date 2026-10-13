let tarefas = [];
let filtroAtual = "TODOS";
let proximoId = 1;

const tarefa = document.querySelector("#tarefa");
const adicionar = document.querySelector("#adicionar");
const listaTarefas = document.querySelector("#listaTarefas");
const contador = document.querySelector("#contador");
const filtros = document.querySelector("#filtros");

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

    contador.textContent = `Total: ${totalTarefas} | Pendentes: ${tarefasPendentes} | Concluídas: ${tarefasConcluidas}`

}

function listarTarefas(lista){
    listaTarefas.innerHTML = "";

    lista.forEach((tarefaAtual) => {
        const item = document.createElement("li");
        const checkbox = document.createElement("input");
        const label = document.createElement("label");
        const remover = document.createElement("button");
        const id = document.createElement("span");

        checkbox.type = "checkbox";

        if (tarefaAtual.concluida) {
            checkbox.checked = true;
            item.classList.add("concluida");
        }

        label.textContent = tarefaAtual.nome;
        remover.textContent = "Remover";
        item.dataset.tarefa = tarefaAtual.id;
        id.textContent = `${tarefaAtual.id} - `;

        item.appendChild(id);
        item.appendChild(checkbox);
        item.appendChild(label);
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
        tarefas.push({
            id: proximoId,
            nome: valorTarefa,
            concluida: false,
        });

        proximoId++;

        tarefa.value = "";

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
    if(event.target.textContent === "Remover") {
        const item = event.target.parentElement;
        const idTarefa = item.dataset.tarefa;

        const atualizadas = tarefas.filter((tarefa) => {
            return tarefa.id !== Number(idTarefa);
        });

        tarefas = atualizadas;

        salvarTarefas();
        renderizar();
    }
});

recuperar();
renderizar();