const validateTitle = (req, res, next) => {
    // OU const body = req.body;
    const { body } = req;

    if (body.title === undefined) {
        return res.status(400).json({ message: 'O campo "título" é obrigatório '})
    }

    if (body.title === '') {
        return res.status(400).json({ message: 'O campo "título" não pode ser vazio '})
    }

    next();
};

const validateStatus = (req, res, next) => {
    // OU const body = req.body;
    const { body } = req;

    if (body.title === undefined) {
        return res.status(400).json({ message: 'O campo "título" é obrigatório '})
    }

    if (body.title === '') {
        return res.status(400).json({ message: 'O campo "título" não pode ser vazio '})
    }

    if (body.status === undefined) {
        return res.status(400).json({ message: 'O campo "status" é obrigatório '})
    }

    if (body.status === '') {
        return res.status(400).json({ message: 'O campo "status" não pode ser vazio '})
    }

    next();
};

module.exports = {
    validateTitle,
    validateStatus,
}