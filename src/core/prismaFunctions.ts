export const createRow = async (tableName:any,data:any) => {
    try {
        const result = await tableName.create({
            data: data
        });
        if (!result) return null;
        return result;
    } catch (error) {
        throw error;
    }
}

export const findAll = async (tableName:any) => {
    try {
        const result = await tableName.findMany();
        if (!result) return null;
        return result;
    } catch (error) {
        throw error;
    }
}

export const findFirst = async (tableName:any,data:any) => {
    try{
        const result = await tableName.findFirst({
            where:data
        });
        if (!result) return null;
        return result;
    }catch(error){
        throw error;
    }
}

export const findById = async(tableName:any,id:Number) => {
    try {
        const result = await tableName.findUnique({
            where: { id: id }
        });
        if (!result) return null;
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteById = async(tableName:any,id:Number)=>{
    try{
        const isExist = await findById(tableName, id);
        if (!isExist) {
            return null;
        }
        const result = await tableName.delete({
            where:{id:id}
        });

        return result;
    }catch(error){
        throw error;
    }
}