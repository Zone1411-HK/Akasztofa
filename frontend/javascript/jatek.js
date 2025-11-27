let randomWord = "";
document.addEventListener('DOMContentLoaded', ()=> {
    generateWord();
    //document.getElementById('wordSpan').innerText = "a";

    let buttons = document.querySelectorAll('.btn');
    console.log(buttons);
    for(const button of buttons){
        button.addEventListener('click', guess);
    }
});

async function generateWord() {
    try{
        const response = await GetFetch('/api/randomWord');
        randomWord = response.randomWord;
        const wordSpan = document.getElementById('wordSpan');

        let playWord = "";

        for(let i = 0; i < randomWord.length; i++){
            playWord += '-';
        }
        wordSpan.innerText = playWord;
    }
    catch (error) {
        console.error(`Hiba: ${error.message}`);
    }
}

function guess(){
    
    let lives = document.getElementById('lives').innerText.length;
    console.log(lives);
    if(lives > 0){
        let livesSpan = document.getElementById('lives');
        let isCorrect = false;
        let wordSpan = document.getElementById('wordSpan');
        let tempArr = "";
        for(let i = 0; i < randomWord.length; i++){
            if(randomWord[i].toLowerCase() == this.value.toLowerCase()){
                tempArr += this.value
                isCorrect = true;
            } else {
                tempArr += '-';
            }
        }
        if(!isCorrect){
            livesSpan.innerText = "";
            lives--;
            console.log(lives);
            for(let i = 0; i < lives; i++){
                livesSpan.innerText += '.';
            }
        }
        wordSpan.innerText = tempArr;
    }
}