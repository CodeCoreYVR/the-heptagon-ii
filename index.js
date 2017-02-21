function Q (query) { return document.querySelector(query) }
function Qs (query) { return document.querySelectorAll(query) }


// LAB: Interactive Doggo Fight
// select .doggo.fighter on click helper function

// Create a few functions to help us manage selected doggos
function selectDoggo (doggoFighterNode) {
  // iterate over each .doggo.fighter to
  // add the selected class doggoFighterNode
  // and removing it from every other doggo
  Qs('.doggo.fighter').forEach(function (node) {
    node === doggoFighterNode
      ? node.classList.add('selected')
      : node.classList.remove('selected')
  })
}

// Returns the only doggo with a selected class
function getSelectedDoggo () {
  return Q('.doggo.fighter.selected');
}

// Removes the selected class from every doggo
function deselectAllDoggo () {
  Q('.doggo.fighter.selected').classList.remove('selected')
}

// A function to check if doggo are from different teams
function areFoes (firstDoggo, secondDoggo) {
  // if firstDoggo or secondDoggo doesn't exist, just return false
  console.log(firstDoggo, secondDoggo);
  if (!firstDoggo || !secondDoggo) return false
  // this gets the class name of the .team node ancestor of a doggo node
  const firstTeam = firstDoggo.parentElement.parentElement.className
  const secondTeam = secondDoggo.parentElement.parentElement.className

  return firstTeam !== secondTeam
}

Qs('.doggo.fighter').forEach(function (node) {
  // use a styled css class, hovered, to control the grayscale
  node.addEventListener('mouseenter', function (event) {
    const {currentTarget} = event;
    // we're using CSS to manage the gray scale
    // because modifying the .style property would inline it
    // giving that style the highest priority which would give us
    // issues for selecting doggos
    currentTarget.classList.add('hovered')
  })

  node.addEventListener('mouseleave', function (event) {
    const {currentTarget} = event;
    currentTarget.classList.remove('hovered')
  })

  // selecting .doggo.fighter on click
  node.addEventListener('click', function (event) {
    // we have to stop propagation to not trigger the listener on team
    // written below
    event.stopPropagation();
    const {currentTarget} = event;
    const selectedDoggo = getSelectedDoggo();

    // check if a doggo is already selected
    if (areFoes(currentTarget, selectedDoggo)) {
      if (confirm('Are you sure?')) {
        // BATTLE CODE HERE
      }
    } else {
      selectDoggo(currentTarget);
    }
  })
})

// if a team node is clicked, move doggo to that team
Qs('.team').forEach(function (node) {
  node.addEventListener('click', function (event) {
    const {currentTarget} = event;
    const selectedDoggo = getSelectedDoggo();

    if (selectedDoggo) {
      selectedDoggo.classList.remove('selected');
      // doggos are placed in the roster div
      currentTarget.querySelector('.roster').appendChild(selectedDoggo);
    }
  })
})

// LAB: Recruiting New Fighters

// grab the preview node
const blankDoggo = Q('.doggo.blank')
const blankDoggoH1 = blankDoggo.querySelector('h1')

// replace the contents of the H1 inside the blank doggo with
// the value of the name input every it changes
Q('#name').addEventListener('input', function (event) {
  blankDoggoH1.innerHTML = event.currentTarget.value;
})

// replace the background image of blank doggo only
// once a value that ends in jpg, gif or png is entered
Q('#picture-url').addEventListener('input', function (event) {
  const {currentTarget} = event;

  // check the last 3 characters of the picture url value to see
  if ((/jpg|gif|png/i).test(currentTarget.value.slice(-3))) {
    blankDoggo.style.backgroundImage = `url(${currentTarget.value})`;
  }
})

// replace the contents of the H1 inside the blank doggo with
// the value of the name input every it changes
Q('#team-name').addEventListener('input', function (event) {
  const {currentTarget} = event;

  if (/salmon/i.test(currentTarget.value)) {
    blankDoggo.style.border = 'solid medium salmon';
  } else if (/aquamarine/i.test(currentTarget.value)) {
    blankDoggo.style.border = 'solid medium aquamarine';
  }
})


// STRETCH
// create doggo from form
function createDoggoFighter (name, pictureURL) {
  const newDoggo = document.createElement('div')
  // replace all white space characters with dashes
  newDoggo.id = name.replace(/\s+/g, '-').toLowerCase();
  newDoggo.className = 'doggo fighter selected';
  // only be tested with local images such as
  // `images/moneybags_michael.jpg`
  newDoggo.style.backgroundImage = `url(${pictureURL})`;
  newDoggo.innerHTML = `
    <h1>${name}</h1>
    <div class="wins"></div>
    <div class="losses"></div>
  `

  return newDoggo;
}

Q('#application-form').addEventListener('submit', function (event) {
  // we need this otherwise the browser will make a web request when we submit 
  // the form
  event.preventDefault();

  const {currentTarget} = event;
  const team = currentTarget.querySelector('#team-name').value;
  const name = currentTarget.querySelector('#name').value;
  const pictureURL = currentTarget.querySelector('#picture-url').value;

  if (team === 'salmon' || team === 'aquamarine') {
    // select the team from team name form
    Q(`.team.${team} > .roster`).appendChild(createDoggoFighter(name, pictureURL))
  }
})
