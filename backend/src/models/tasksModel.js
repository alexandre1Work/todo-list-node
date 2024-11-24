//importando conexão com o banco de dados
const conection = require('./conectionDb');

//Criando as funções do banco de dados
const getAll = async() => {
    //para salvar e retornar um unico array []
    const [tasks] = await conection.execute('SELECT * FROM task');
    return tasks;
};

//Inserir nova task
const createTask = async (task) => {

    //criando a data
    const dateUTC = new Date(Date.now()).toUTCString();

    // OU const title = task.title;
    const { title } = task;

    //para salvar e retornar um unico array []
    const [createdTask] = await conection.execute('INSERT INTO task(title, status, created_at) VALUES (?, ?, ?)', [title, 'pendente', dateUTC]);

    return {insertId: createdTask.insertId };
}

const deleteTask = async (id) => {
    const removeTask = await conection.execute('DELETE FROM task WHERE id = ?', [id]);
    return removeTask;
}

const updateTask = async (id, task) => {
    const query = 'UPDATE task SET title = ?, status = ? WHERE id = ?';

    //const title = task.title;
    //const status = task.status;
    const { title, status } = task;

    const updatedTask = await conection.execute(query, [title, status, id]);
    return updatedTask;
}

//para não exportar uma por um objeto, cria uma e exporta
module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};