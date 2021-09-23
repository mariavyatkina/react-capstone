export function getFromStorage(key:any){
    if(!key){
        return null;
    }
    try{
        const valueStr = localStorage.getItem(key);
        if(valueStr){
            console.log(`valueStr = ${valueStr}`);
            console.log(`Returning ${JSON.parse(valueStr)}`)
            return JSON.parse(valueStr);
        }
        return null;
    } catch(err){
        return null;
    }   
}

export function setInStorage(key:any,obj:any){
    if(!key){
        console.error("Error: Key is missing")
    }

    try{
        localStorage.setItem(key, JSON.stringify(obj));
    } catch(err){
        console.error(err)
    }
}
