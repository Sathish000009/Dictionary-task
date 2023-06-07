let form = document.querySelector('.dictform');

let wordinput = document.querySelector('.wordinput');

let wordInfo = document.querySelector('.meaningforward');

let searchbutton = document.querySelector('.searchbutton');

async function getmeaning(word) {
    try{

        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        let data = await response.json();

        let paragraph = document.createElement('p');

        wordInfo.innerHTML = '';

        let audioSource = data[0].phonetics[0].audio;

        paragraph.innerHTML = `
        <span class='fas fa-volume-up audio-icon'></span>
        <audio class='audio'>
           <source src=${audioSource} type='audio/mpeg'>
        </audio>
        Word: <b>${data[0].word}</b>`;

        wordInfo.appendChild(paragraph);

        document.querySelector('.audio-icon').addEventListener('click',
          Event => {
            document.querySelector('.audio').play();
          
    });

        let list = document.createElement('ul');
        list.style.listStyleType = 'none';   
         let meanings = data[0].meanings;

        for(let meaning of meanings){

            let listItem = document.createElement('li');

            listItem.innerHTML = `${meaning.partOfSpeech}`;

            let subList = document.createElement('ul');
            subList.style.listStyleType = 'disc';

            let definitions = meaning.definitions;

            for(let definition of definitions){

                let subListItem = document.createElement('li');

                subListItem.innerHTML = `<em>${definition.definition}</em>`;

                subList.appendChild(subListItem);
            }

            listItem.appendChild(subList);

            list.appendChild(listItem);
        }

        wordInfo.appendChild(list);

    } catch (error) {
        console.error('error fetching the meaning of the word');
    }
}

function handlesubmit(event) {
    event.preventDefault();

    let word = wordinput.value;

    getmeaning(word);
}


form.addEventListener('submit', handlesubmit);
searchbutton.addEventListener('click',handlesubmit);