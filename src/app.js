//configuración de express app
import express from 'express';
//es para ver peticiones en consola
import morgan from 'morgan';
import cors from 'cors';
import indexRoute from './routes/routes';


const app = express();

app.set('port', process.env.PORT || 3000);

//para dejar que cualquier otro servidor pueda acceder , en origin ponemos las urls
//que pueden hacer peticiones, si se pone en blanco cors() dejamos que cualquiera haga peticiones
const corsOptions = {origin:'http://localhost:3000'}
app.use(cors(corsOptions));

app.use(morgan('dev'));
//Para que se puedan leer archivos json
app.use(express.json());
//para poder entender peticiones de formularios post usamos :
app.use(express.urlencoded({extended:false}));

app.use('/api', indexRoute);

app.get('/', (req, res) => {
    res.json({ message: "Welcome" })
})

export default app;