const app = require('./app');

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo correctamente ${app.get('port')}`);
});