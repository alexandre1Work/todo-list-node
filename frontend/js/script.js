const tbody = document.querySelector('tbody');
const addForm = document.querySelector('#add-form');
const inputTask = document.querySelector('#input-task');
const addButton = document.querySelector('#add-button');

//Função para extrair as task atráves de um arquivo json
const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks')
    const tasks = await response.json()
    console.log(tasks);
    return tasks;
  }

//função para adicionar uma tarefa
const addTask = async (event) => {
    event.preventDefault();

    const task = { title: inputTask.value };
  
    await fetch('http://localhost:3333/tasks', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    loadTasks();
    inputTask.value = '';
}

addButton.addEventListener('click', () => {
    inputTask.focus(); // Move o foco para o campo de entrada
});

// Evento para o botão de adicionar
addButton.addEventListener('click', () => {
    // Coloca o foco no campo de entrada
    inputTask.focus();
});

//função para deletar task
const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete',
    });

    loadTasks();
}

//função para editar task 
const updateTask = async (task) => {
    const {id, title, status} = task;

    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({title, status}),
    });

    loadTasks();
}

//função para criar uma função atráves da TAG passada
const createElement = (tag, innerText = '', className = '', innerHTML = '') => {
    const element = document.createElement(tag);

    if (innerText) {
        element.innerText = innerText;
    }

    if (className) {
        element.className = className; // Adiciona as classes do Tailwind
    }

    if (innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
}

//formatando a data
const formatDate = (dateUTC) => {
    const options = {
        dateStyle: 'long',
        timeStyle: 'short'
    }
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
}

//função para criar o select
const createSelect = (value) => {
    const options = `
        <option value="pendente" selected>pendente</option>
        <option value="em andamento">em andamento</option>
        <option value="concluída">concluída</option>
    `;

    const select = createElement('select', '', 'w-full border-none p-2 rounded-lg font-semibold capitalize bg-[#EBEBEB] hover:bg-[#DDD]', options);

    select.value = value;

    return select;
}

//função para criar elementos html
const createRow = (task) => {

    const { id, title, created_at, status } = task;

    const tr = createElement('tr', '', 'text-gray-800 font-semibold px-4 py-2 border border-[#DDD] text-center');
    const tdTitle = createElement('td', title, 'text-gray-800 font-semibold px-4 py-2 border border-[#DDD] text-center');
    const tdCreatedAt = createElement('td', formatDate(created_at), 'text-gray-800 font-semibold px-4 py-2 border border-[#DDD] text-center');
    const tdStatus = createElement('td', '', 'text-gray-800 font-semibold px-4 py-2 border border-[#DDD] text-center');
    const tdActions = createElement('td', '', 'text-gray-800 font-semibold px-4 py-2 border border-[#DDD] text-center');

    const select = createSelect(status);

    select.addEventListener('change', ({ target }) => {updateTask({...task, status: target.value })});

    tdStatus.appendChild(select);

    const editButton = createElement('button', '', 'border-none rounded-md p-2 text-white inline-flex items-center justify-center cursor-pointer bg-blue-500 mr-2', '<span><i class="fa-solid fa-pen-to-square"></i></span>')
    const deleteButton = createElement('button', '', 'border-none rounded-md p-2 text-white inline-flex items-center justify-center cursor-pointer bg-red-500 mr-2', '<span><i class="fa-solid fa-trash"></i></span>');

    const editForm = createElement('form', '', 'flex items-center gap-2');
    const editInput = createElement('input', '', 'w-auto p-2 border border-[#DDD] rounded-md outline-none text-base font-semibold');
    editInput.style.width = '100%';

    editInput.value = title;
    editForm.appendChild(editInput);

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        updateTask({ id, title: editInput.value, status });
    });

    // Salvar ao clicar fora
    editInput.addEventListener('blur', () => {
        updateTask({ id, title: editInput.value, status });
        tdTitle.innerText = editInput.value; 
    });

    editButton.addEventListener('click', () => {
        tdTitle.innerText = ''; 
        tdTitle.appendChild(editForm);
        editInput.focus(); 
    });

    deleteButton.addEventListener('click', () => {deleteTask(id)});

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);
    //se estivesse utilizando css e quisesse colocar uma classe
    // editButton.classList.add('btn-action');
    //deleteButton.classList.add('btn-action');
    
    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;
}

//função para percorrer o banco de dados e listar na tela as tasks
const loadTasks = async () => {
    const tasks = await fetchTasks();
  
    tbody.innerHTML = '';
  
    tasks.forEach(task => {
      const tr = createRow(task);
      tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);

loadTasks();