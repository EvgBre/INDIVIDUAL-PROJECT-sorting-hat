const students = [
    {
      id: 1,
      name: 'Ronald Weasley',
      house: 'Gryffindor',
      type: 'student',
    },
    {
        id: 2,
        name: 'Hermione Granger',
        house: 'Ravenclaw',
        type: 'student'
    },
    {
        id: 3,
        name: 'Harry Potter',
        house: 'Hufflepuff',
        type: 'student'
    },
    {
        id: 4,
        name: 'Neville Longbottom',
        house: 'Gryffindor',
        type: 'student'
    }];
    const expelled = [

    {
        id: 1,
        name: 'Tom Riddle',
        reason: 'Petty Dark Lord',
        type: 'expelled'
    },
    {
        id: 2,
        name: 'Lucius Malfoy',
        reason: 'Worst father of the year!',
        type: 'expelled'
    }


    ];
    
    const renderToDom = (divId, html) => {
        const selectedDiv = document.querySelector(divId);
        selectedDiv.innerHTML = html;
      }

      //Hat card on Welcome screen
const welcomeCard = () => {
    let domString = `<div class="welcome-card">
    <div class="welcome-card-body" autofocus>
      <h5 class="card-title welcome-card-title">Greetings, young witches and wizards!</h5>
      <img src="https://pbs.twimg.com/media/DziBUnsWoAUcNGp.jpg:large" class="card-img-top" alt="The Sorting Hat">
      <p class="card-text welcome-card-text">Step forward when your name is called.</p>
      <a href="#" id="welcomeBtn" class="btn btn-dark">All aboard!</a>
    </div>
  </div>`;
  renderToDom('#welcome', domString);
}

const generate = () => {
    const domString = `
    <form id="form"> 
    <div class="input-group mb-3">
      <input type="text" class="form-control" id="name" placeholder="Tom Riddle">
      <button type="submit" class="btn btn-dark">Sort!</button>
    </div>
    <div class="btn-group" role="group">
        <button type="button" class="btn btn-secondary" id="show-all">All Houses</button>
        <button type="button" class="btn btn-danger" id="show-gryff">Gryffindor</button>
        <button type="button" class="btn btn-warning" id="show-huff">HufflePuff</button>
        <button type="button" class="btn btn-primary" id="show-raven">Ravenclaw</button>
        <button type="button" class="btn btn-success" id="show-slyth">Slytherin</button>
    </div>
    </form>`;
    welcomeDiv.style.display = 'none';
    cardGroups.style.display = 'flex';
    renderToDom('#houses', domString);
    cardsOnDom(students, '#student-cards');
    cardsOnDom(expelled, '#expelled-cards');
}

//Query Selectors
const sort = document.querySelector('#houses');
const welcomeDiv = document.querySelector('#welcome');
const welcomeBtn = document.querySelector('#welcomeBtn');
const cards = document.querySelector('#cards');
const cardGroups = document.querySelector('#card-groups');
const studentCards = document.querySelector('#student-cards');
const expelledCards = document.querySelector('#expelled-cards');

const cardsOnDom = (array, div) => {
    let domString = '';
    for (obj of array) {
        if (obj.type === 'student') {
            domString += `<div class="card"><div class="img-container ${obj.house}">
        <img class="card-img-top ${obj.house}" src="./images/${obj.house}.png" alt="${obj.house} Crest"></div>
        <div class="card-body ${obj.house}-card">
            <h5 class="card-title">${obj.name}</h5>
            <h6 class="">${obj.house}</h6>
            <a href="#" class="btn btn-sm ${obj.house} ${obj.house}-btn btn-dark card-btn" id="expel--${obj.id}">Never Return!</a>
        </div>
    </div>`
        array.sort((a,b) => a.house.localeCompare(b.house));
        } else if (obj.type === 'expelled') {
            domString += `<div class="card"><div class="img-container expelled-img">
          <img class="card-img-top" src="./images/death-eater.png" alt="Death Eater Image"></div>
          <div class="card-body expelled-card-body">
            <h6 class="card-title">${obj.name}</h6>
            <p class="card-text">${obj.reason}</p>
            <a href="#" class="btn btn-sm btn-dark card-btn delete-btn" id="become--${obj.id}">Sacrifice!</a>
          </div>
        </div>`
        }
    }
    renderToDom(div, domString)
};
//Rendors new students to a random house
const newStudent = (event) => {
    event.preventDefault();
    const randomHouse = () => {
      const randNum = Math.floor(Math.random() * 4 + 1);
      switch (randNum) {
        case 1:
          return 'Gryffindor'
          break;
        case 2:
          return 'Ravenclaw'
          break;
        case 3:
          return 'Slytherin'
          break;
        case 4:
          return 'Hufflepuff'
          break;
      }
    }
    const student =
    {
      id: students.length + 1,
      name: document.querySelector('#name').value,
      house: randomHouse(),
      type: 'student'
    }
    form.reset();
    students.push(student);
    cardsOnDom(students, '#student-cards');
  }
const houseFilter = (event) => {
    if (event.target.id === 'show-gryff') {
      const gryff = students.filter(obj => obj.house === "Gryffindor")
      cardsOnDom(gryff, '#student-cards');
    } else if (event.target.id === 'show-huff') {
      const puff = students.filter(obj => obj.house === "Hufflepuff")
      cardsOnDom(puff, '#student-cards');
    } else if (event.target.id === 'show-raven') {
      const raven = students.filter(obj => obj.house === "Ravenclaw")
      cardsOnDom(raven, '#student-cards');
    } else if (event.target.id === 'show-slyth') {
      const slither = students.filter(obj => obj.house === "Slytherin")
      cardsOnDom(slither, '#student-cards');
    } else if (event.target.id === 'show-all') {
      cardsOnDom(students, '#student-cards');
    }
  }

//Event Listeneers

welcomeDiv.addEventListener('click', e => {
    if (e.target.id === 'welcomeBtn') {
      generate();
    }
  });

  // Moves cards from Students to Expelled, and removes cards from Expelled.
cards.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.id.includes('expel')) {
      [, id] = e.target.id.split('--');
      const indexOfObj = students.findIndex(obj => obj.id === Number(id));
      const expelledStudent = students.splice(indexOfObj, 1);
      const newExpelled = {
        id: expelled.length + 1,
        name: expelledStudent[0].name,
        reason: "Voldy suckup.",
        type: 'expelled'
      }
      expelled.push(newExpelled);
    } else if (e.target.id.includes('become')) {
      [, id] = e.target.id.split('--');
      const indexOfObj = expelled.findIndex(obj => obj.id === Number(id));
      expelled.splice(indexOfObj, 1);
    }
    cardsOnDom(students, '#student-cards');
    cardsOnDom(expelled, '#expelled-cards');
  })


// Creates a new Student in array
sort.addEventListener('submit', newStudent)
// Filters by houses
sort.addEventListener('click', houseFilter)
//Page Load
const startApp = () => {
    welcomeCard();
}
startApp()