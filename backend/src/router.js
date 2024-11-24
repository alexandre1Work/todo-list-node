const express = require('express');
const tasksController = require('./controllers/tasksController'); //funções
const tasksMiddlewares = require('./middlewares/tasksMiddlewares'); //função Middleware 
const router = express.Router();
/*
GET - PARA LISTAR
POST - PARA CADASTRAR

PADRÃO -> router.get('', () => {
            validar, chamar outras func, retorno de func, responder
            Então é ideal que crie um arquivo para guardar essas funções (controllers)
})
*/

router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddlewares.validateTitle, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', 
    tasksMiddlewares.validateTitle,
    tasksMiddlewares.validateStatus,
    tasksController.updateTask
);

module.exports = router;