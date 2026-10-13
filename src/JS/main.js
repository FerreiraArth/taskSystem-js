let tarefas = [];
let filtroAtual = "TODOS";
let proximoId = 1;

const tarefa = document.querySelector("#tarefa");
const adicionar = document.querySelector("#adicionar");
const listaTarefas = document.querySelector("#listaTarefas");
const contador = document.querySelector("#contador");
const filtros = document.querySelector("#filtros");

function renderizar(){
    listarTarefas(tarefas);
    atualizarContador();
}

function atualizarContador() {
    const totalTarefas = tarefas.length;
    const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

    contador.textContent = `Total: ${totalTarefas} | Conclídas: ${tarefasConcluidas}`

}

function listarTarefas(lista){
    listaTarefas.innerHTML = "";

    lista.forEach((tarefaAtual) => {
        const item = document.createElement("li");
        const checkbox = document.createElement("input");
        const label = document.createElement("label");
        const remover = document.createElement("button");

        checkbox.type = "checkbox";

        if (tarefaAtual.concluida) {
            checkbox.checked = true;
            item.classList.add("concluida");
        }

        label.textContent = tarefaAtual.nome;
        remover.textContent = "Remover";
        item.dataset.tarefa = tarefaAtual.id;

        item.appendChild(checkbox);
        item.appendChild(label);
        item.appendChild(remover);
        listaTarefas.appendChild(item);

        checkbox.addEventListener("change", (event) => {
            tarefaAtual.concluida = event.target.checked;

            renderizar();
        });
        
    });
}

adicionar.addEventListener("click", () => {
    const valorTarefa = tarefa.value.trim();

    if(valorTarefa) {
        tarefas.push({
            id: proximoId,
            nome: valorTarefa,
            concluida: false
        });

        proximoId++;

        tarefa.value = "";
        renderizar();
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

        renderizar();
    }
})