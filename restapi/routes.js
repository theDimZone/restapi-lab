const db = require('./db');

const router = app => {
    app.get('/', (request, response) => {
        const data = db.read();
        response.send(data);
    });

    app.get('/:id', (request, response) => {
        const data = db.read();
        const user = data.find(u => u.id == request.params.id);
        response.send(user);
    });

    app.delete('/:id', (request, response) => {
        let data = db.read();
        data = data.filter(u => u.id != request.params.id);
        db.write(data);
        response.send(data);
    });

    app.post('/', (request, response) => {
        const data = db.read();
        //const id = data.length;
        let id = 1;
        if(data.length > 0) id = data[data.length - 1].id + 1;
        const user = {
            id: id,
            name: request.body.name,
            email: request.body.email
        };

        data.push(user)
        db.write(data);

        response.send(user);
    });

    app.put('/:id', (request, response) => {
        const data = db.read();
        const i = data.findIndex(u => u.id == request.params.id);
        data[i].name = request.body.name;
        data[i].email = request.body.email;

        db.write(data);
        response.send(data[i]);
    });
}

module.exports = router;