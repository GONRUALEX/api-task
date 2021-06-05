import mongoose from 'mongoose';
import config from '../config'

(async()=>{

    try{
    //Para poder utilizar el archivo .env desde process debo instalar
    //npm i dotenv 
    console.log(config.mogodbURL);
    const db = await mongoose.connect(config.mogodbURL ,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useFindAndModify: false
    });
    console.log("Nombre de la base de datos",db.connection.name);
    }catch(error){
        console.log("no se conecta bd.",error)    
    }
})();

