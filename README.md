# 📝 To-Do List

Uma lista de tarefas feita com HTML, CSS e JavaScript puro. Dá pra adicionar, editar, remover e concluir tarefas, e tudo fica salvo no navegador.

## ✨ O que ele faz
- Adiciona tarefas (pelo botão ou apertando **Enter**)
- Edita tarefas, com botão para cancelar a edição
- Remove tarefas
- Marca tarefas como concluídas
- Filtra por **Todos**, **Pendentes** e **Concluídas**
- Mostra um contador com total, pendentes e concluídas
- Exibe mensagens rápidas de confirmação (somem sozinhas após 3 segundos)
- Mostra uma mensagem amigável quando a lista está vazia
- Salva tudo no `localStorage`, então as tarefas continuam ali depois de recarregar a página

## 🛠️ Tecnologias
- HTML5
- CSS3
- JavaScript (ES6+)

## 🧠 Como funciona
Algumas decisões que tomei durante o projeto:

- **Salvamento:** as tarefas ficam em um array e, a cada mudança, eu transformo ele em texto com `JSON.stringify` para guardar no `localStorage`. Ao abrir a página, converto de volta com `JSON.parse`.
- **IDs sem repetição:** ao recuperar as tarefas salvas, procuro o maior ID existente e o próximo começa dele + 1. Assim nunca nascem duas tarefas com o mesmo ID, mesmo depois de remover algumas.
- **Botões com `data-acao`:** os botões de editar e remover são identificados por um atributo `data-acao`, e não pelo texto. Assim posso mudar o nome dos botões sem quebrar nada.
- **Um único ouvinte de clique na lista:** em vez de colocar um evento em cada botão, uso um só na lista inteira e descubro qual botão foi clicado.
- **Edição no mesmo campo:** ao clicar em "Editar", o texto da tarefa vai para o campo de cima, o botão vira "Salvar edição" e aparece um **X** para cancelar. Se eu remover a tarefa que estava sendo editada, o formulário é resetado para não travar a adição de novas tarefas.

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
- [ ] Usar atributos `data-*` nos filtros, em vez de depender do texto do botão
- [ ] Impedir que uma nova edição comece antes de terminar a anterior

## 📚 O que aprendi
- Manipulação do DOM (`createElement`, `appendChild`, `dataset`)
- Eventos de clique e teclado
- Métodos de array: `filter`, `find`, `reduce`, `forEach`
- Persistência de dados com `localStorage` e JSON

## 👤 Autor
Ferreira — [GitHub](https://github.com/FerreiraArth) · [LinkedIn](https://www.linkedin.com/in/arthur-ferreira-a82381244/)