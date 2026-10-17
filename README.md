# 📝 To-Do List

Uma lista de tarefas feita com HTML, CSS e JavaScript puro. Dá pra adicionar, editar, remover e concluir tarefas, e tudo fica salvo no navegador.

## ✨ O que ele faz
- Adiciona tarefas (pelo botão ou apertando **Enter**)
- Edita tarefas, com botão **X** para cancelar a edição
- Remove tarefas
- Marca tarefas como concluídas (o texto fica riscado e mais apagado)
- Filtra por **Todas as tarefas**, **Em andamento** e **Finalizadas**, com destaque no filtro selecionado
- Mostra um contador com total, pendentes e concluídas
- Exibe avisos rápidos de confirmação, que aparecem com animação e somem sozinhos após 3 segundos
- Mostra uma mensagem amigável quando a lista está vazia
- Salva tudo no `localStorage`, então as tarefas continuam ali depois de recarregar a página
- Layout responsivo, que se ajusta para telas menores

## 🛠️ Tecnologias
- HTML5
- CSS3 (variáveis, flexbox, media queries e animações)
- JavaScript (ES6+)

## 🗂️ Estrutura do projeto
```
├── index.html
└── src
    ├── css
    │   ├── style.css          # variáveis globais e importação dos outros arquivos
    │   ├── main.css           # cartão principal e título
    │   ├── formulario.css     # campo de texto e botões do formulário
    │   ├── filtros.css        # botões de filtro
    │   ├── listaTarefas.css   # lista, botões e checkbox personalizado
    │   ├── contador.css
    │   ├── notificacao.css    # aviso de confirmação e animação
    │   └── media.css          # ajustes para telas menores
    └── JS
        └── main.js
```

## 🧠 Como funciona
Algumas decisões que tomei durante o projeto:

- **Salvamento:** as tarefas ficam em um array e, a cada mudança, eu transformo ele em texto com `JSON.stringify` para guardar no `localStorage`. Ao abrir a página, converto de volta com `JSON.parse`.
- **IDs sem repetição:** ao recuperar as tarefas salvas, procuro o maior ID existente e o próximo começa dele + 1. Assim nunca nascem duas tarefas com o mesmo ID, mesmo depois de remover algumas.
- **Botões com `data-*`:** os botões de editar e remover usam `data-acao`, e os filtros usam `data-filtro`. Assim eu identifico cada botão pelo atributo e não pelo texto, e posso mudar os nomes sem quebrar nada.
- **Um único ouvinte de clique na lista:** em vez de colocar um evento em cada botão, uso um só na lista inteira e descubro qual botão foi clicado com `closest()`.
- **Edição no mesmo campo:** ao clicar em "Editar", o texto da tarefa vai para o campo de cima, o botão vira "Salvar edição" e aparece um **X** para cancelar. Se eu remover a tarefa que estava sendo editada, o formulário é resetado para não travar a adição de novas tarefas.
- **Formulário de verdade:** usei o evento `submit`, então o Enter funciona sem eu precisar tratar o teclado.
- **CSS organizado:** separei o estilo em arquivos por parte da tela e guardei as cores em variáveis no `:root`. Para trocar o tema, mudo só em um lugar.

## 🚀 Como executar
1. Clone o repositório:
```bash
   git clone https://github.com/FerreiraArth/taskSystem-js
```
2. Abra o `index.html` no navegador.

## 📸 Preview
![Preview do projeto](./preview.png)

## 🔗 Demo
[Ver online](https://ferreiraarth.github.io/taskSystem-js/)

## 🔜 Próximos passos
Ainda estou trabalhando nisso:
- [ ] Impedir que uma nova edição comece antes de terminar a anterior

## 📚 O que aprendi
- Manipulação do DOM (`createElement`, `appendChild`, `dataset`, `closest`)
- Eventos de clique e de formulário
- Métodos de array: `filter`, `find`, `reduce`, `forEach`
- Persistência de dados com `localStorage` e JSON
- Organização de CSS em arquivos, variáveis e responsividade

## 👤 Autor
Ferreira — [GitHub](https://github.com/FerreiraArth) · [LinkedIn](https://www.linkedin.com/in/arthur-ferreira-a82381244/)