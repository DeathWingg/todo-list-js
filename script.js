// Pega os elementos do HTML que vamos usar
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Função principal que adiciona a tarefa
function addTask() {
    const taskText = taskInput.value.trim(); // Pega o texto e tira espaços vazios
    
    if (taskText === "") {
        alert("Por favor, digite uma tarefa!");
        return;
    }

    // Cria o elemento da lista (li)
    const li = document.createElement('li');
    li.innerText = taskText;

    // Evento: ao clicar no texto, ele risca a tarefa (completa)
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Cria o botão de deletar
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "X";
    deleteBtn.style.backgroundColor = "#da3633"; // Cor vermelha
    deleteBtn.style.padding = "5px 10px";
    
    // Evento: ao clicar no botão X, apaga a tarefa
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede que o clique apague e marque como concluído ao mesmo tempo
        li.remove();
    });

    // Adiciona o botão vermelho dentro da tarefa
    li.appendChild(deleteBtn);
    
    // Adiciona a tarefa na lista do HTML
    taskList.appendChild(li);

    // Limpa o campo de texto para a próxima tarefa
    taskInput.value = "";
    taskInput.focus(); // Coloca o cursor de volta no input
}

// Escuta o clique do botão "Adicionar"
addBtn.addEventListener('click', addTask);

// Escuta a tecla "Enter" para também adicionar
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});