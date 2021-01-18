

// ********* Dom elements ************


const monsterContainer = document.querySelector('#monster-container');
const forwardBtn = document.querySelector('#forward');
const backBtn = document.querySelector('#back');

const createMonsterDiv = document.querySelector('#create-monster');
const monsterForm = document.querySelector('#monster-form')






// ********* Event listeners ************


forwardBtn.addEventListener('click', () => {changePage(1)})
backBtn.addEventListener('click', () => {changePage(-1)})
monsterForm.addEventListener('submit', grabFormInputs);





// ********* Network Requests ************

let monsters;

let page = 1;

function loadMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(fiftyMonsterArray => createToDivCards(fiftyMonsterArray))
}
loadMonsters()

function loadAllMonsters(){
    return fetch(`http://localhost:3000/monsters`)
    .then(res => res.json())
    .then(monsterArray => {
        monsters =  monsterArray;
    })
}

function createMonsterInDb(monsterObj) {
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(monsterObj)
    } )
    .then(res => res.json())
    // .then(slapMonsterOnDom)
    .then(lastPage)
}




// ********* Dom manipulation / logique ************


function createToDivCards(fiftyMonsterArray){
    fiftyMonsterArray.forEach(monster => {
        const monsterCard = document.createElement('div');
        const monsterName = document.createElement('h2');
        const monsterAge = document.createElement('p');
        const monsterDescription = document.createElement('p');
        monsterName.innerText = monster.name;
        monsterAge.innerText = monster.age;
        monsterDescription.innerText = monster.description;

        monsterCard.append(monsterName, monsterAge, monsterDescription);

        monsterContainer.append(monsterCard);
    })
}


function clearMonsters(){
    monsterContainer.innerHTML = ""
}

function changePage(direction){
    page += direction;
    clearMonsters()
    console.log("cleared")
    loadMonsters();
    console.log("loaded")
}


function grabFormInputs(e){
    e.preventDefault();

   const monsterObj = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    }
    createMonsterInDb(monsterObj)
}

// function slapMonsterOnDom(monster){
//     const monsterCard = document.createElement('div');
//     const monsterName = document.createElement('h2');
//     const monsterAge = document.createElement('p');
//     const monsterDescription = document.createElement('p');
//     monsterName.innerText = monster.name;
//     monsterAge.innerText = monster.age;
//     monsterDescription.innerText = monster.description;

//     monsterCard.append(monsterName, monsterAge, monsterDescription);

//     monsterContainer.append(monsterCard);

// }

function lastPage(){
    loadAllMonsters().then(()=>{
         page = Math.ceil(monsters.length/50);
        clearMonsters();
        loadMonsters();
    })
   
}
