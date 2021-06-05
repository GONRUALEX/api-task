import { config } from 'dotenv';
//al ejecutar config() podré acceder a la variable .env
config();
export default {
    mogodbURL: process.env.MONGODB_URI || 'mongodb://localhost/documentapi'
}