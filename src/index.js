//solo se encarga de levantar el servidor en el puerto
import app from './app';
import './models/database';


app.listen(app.get('port'),()=>{
    console.log("Servidor levantado en puerto ",app.get('port'))
});

