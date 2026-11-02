// Pegando os elementos do HTML
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Carrega as tarefas salvas no navegador ou cria uma lista vazia
let tasks = JSON.parse(localStorage.getItem('tarefas_salvas')) || [];

// Função que desenha a lista na tela
function renderTasks() {
    taskList.innerHTML = ""; // Limpa a tela antes de desenhar
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerText = task.texto;

        // Se a tarefa estiver concluída, aplica o risco
        if (task.concluida) {
            li.classList.add('completed');
        }

        // Clicar no texto marca/desmarca como concluída
        li.addEventListener('click', () => {
            tasks[index].concluida = !tasks[index].concluida;
            salvarNoNavegador();
            renderTasks();
        });

        // Botão de deletar
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "X";
        deleteBtn.style.backgroundColor = "#da3633";
        deleteBtn.style.padding = "5px 10px";
        
        // Clicar no X apaga a tarefa
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            tasks.splice(index, 1); // Remove do array
            salvarNoNavegador();
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Salva o array no localStorage em formato de texto (JSON)
function salvarNoNavegador() {
    localStorage.setItem('tarefas_salvas', JSON.stringify(tasks));
}

// Função de adicionar nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Por favor, digite uma tarefa!");
        return;
    }

    // Adiciona ao array como um objeto
    tasks.push({ texto: taskText, concluida: false });
    salvarNoNavegador();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

// Eventos de clique e teclado
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Roda a função assim que a página carrega para mostrar as tarefas salvas!
renderTasks();