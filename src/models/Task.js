import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const taskSchema = new Schema({
    title:{
        type:String,
        require:true,
        trim:true
    },
    description:{
        type:String,
        require:true,
        trim:true
    },
    done:{
        type:Boolean,
        default:false
    }
},{
    versionKey:false,//se genera automáticamente _v, esto hace que no lo haga
    timestamps:true//cuando crea un dato aparece direcatmente los campos
    //cratedAt, updatedAt
});


taskSchema.plugin(mongoosePaginate);
export default model('Task', taskSchema);