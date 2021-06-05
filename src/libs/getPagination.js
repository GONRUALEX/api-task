//recibe un objeto del cliente y extrae la cantidad de documentos
//y paginas que vamos a querer con mongoosepagination
export const getPagination = (page, size)=>{
    //si existe size lo convierto en un number, si no le doy
    //un valor por defecto
    const limit = size ? +size : 3 ;
    const offset = page ? page*limit : 0;
    return { limit, offset };
}