export const createRow = async (tableName:any,data:any) => {
    try {
        const result = await tableName.create({
            data: data
        });
        return result;
    } catch (error) {
        console.error("Error creating record:", error);
        throw error;
    }
}

export const findAll = async (tableName:any) => {
    try {
        const result = await tableName.findMany();
        return result;
    } catch (error) {
        console.error("Error finding records:", error);
        throw error;
    }
}

export const findFirst = async (tableName:any,data:any) => {
    try{
        const result = await tableName.findFirst({
            where:data
        });
        return result;
    }catch(error){
        console.error("Error finding record:", error);
        throw error;
    }
}

export const findById = async(tableName:any,id:Number) => {
    try {
        const result = await tableName.findUnique({
            where: { id: id }
        });
        return result;
    } catch (error) {
        console.error("Error finding record by ID:", error);
        throw error;
    }
}

export const deleteById = async(tableName:any,id:Number)=>{
    try{
        const result = await tableName.delete({
            where:{id:id}
        });
        return result;
    }catch(error){
        console.error("Error occured",error);
        throw error;
    }
}