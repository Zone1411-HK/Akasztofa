const GetFetch = async (url) => {
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`${response.status} ( ${response.statusText} )`);
        }
        return await response.json();
    } catch(error) {
        throw new Error(`Hiba: ${error.message}`)
    };
};

const PostFetch = async (url, data) => {
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error(`${response.status} ( ${response.statusText} )`);
        }
        return await response.json();
    } catch(error) {
        throw new Error(`Hiba: ${error.message}`)
    };
};