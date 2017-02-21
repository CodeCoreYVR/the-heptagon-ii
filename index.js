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
