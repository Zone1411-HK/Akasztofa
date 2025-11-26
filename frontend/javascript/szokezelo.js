document.addEventListener('DOMContentLoaded', () => {
    ListWords();
    document.getElementById('addWord').addEventListener('click', AddWord);
    document.getElementById('removeWord').addEventListener('click', RemoveWord);
});

async function RemoveWord(){
    try{
        const inputWord = document.getElementById('wordInput').value;
        if(inputWord != ''){

            const response = await PostFetch('/api/removeWord', {
                word: inputWord
            });
            ListWords();
        }
    } catch(error){
        console.error(`Hiba: ${error.message}`)
    }
}

async function AddWord(){
    try{ 
        const inputWord = document.getElementById('wordInput').value;
        if(inputWord != ''){
            
            console.log("asd");
            const response = await PostFetch('/api/addWord', {
                word: inputWord
            });
            ListWords();
        }
    } catch(error){
        console.error(`Hiba: ${error.message}`)
    }
}

async function ListWords() {
    try{
        const response = await GetFetch('/api/listWords');
        const wordArray = response.wordList;
        const wordDiv1 = document.getElementById('forWordList1');
        const wordDiv2 = document.getElementById('forWordList2');
        const ul1 = document.createElement('ul');
        const ul2 = document.createElement('ul');
        
        ul1.classList.add('list-group','w-100','text-center');
        ul2.classList.add('list-group','w-100','text-center');

        let i = 0;

        for(i = 0; i < wordArray.length / 2; i++){
            const li = document.createElement('li');
            li.innerText = wordArray[i];
            li.classList.add('list-group-item','list-group-item-primary', 'list-group-item-action');
            ul1.appendChild(li);
        }
        wordDiv1.replaceChildren(ul1);
        
        for(i = i; i < wordArray.length; i++){
            const li = document.createElement('li');
            li.innerText = wordArray[i];
            li.classList.add('list-group-item','list-group-item-primary', 'list-group-item-action');
            ul2.appendChild(li);
        }
        wordDiv2.replaceChildren(ul2);

    } catch (error) {
        console.error(`Hiba: ${error.message}`);
    }
}