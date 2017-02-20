// create shortcut functions for .querySelector and .querySelectorAll
function Q(query) { return document.querySelector(query) }
function Qs(query) { return document.querySelectorAll(query) }

const toxicTim = Q('#toxic-tim');

// create an event listener the toxic tim's node.
// it will listen for any mouse click that happens inside
// the node.
// when a click is detected, the function in the second argument will
// be called with the event object
toxicTim.addEventListener('click', function (event) {
  console.log('Toxic Tim was clicked!');
  console.dir(event);
})

// the event object has many properties and methods that describe
// the state of program at the time the event was triggered

// the event.target property contains a reference to the node that originally
// triggered the event

// the event.currentTarget property contains a reference to the node that
// that was listening for the event

function logNodeInfo (event) {
  // 👇 (NEW!) More on destructuring
  const {currentTarget: cT, target: t} = event;
  // 👆 syntax sugar for 👇
  // const cT = event.currentTarget;
  // const t = event.target;

  // .matches is a node method that tests if the given node
  // matches a given CSS query
  // the .eventPhase property of event objects a number that refers to current
  // propagation phase. 3 refers to the bubbling phase and 1 refers to the capturing phase
  if (cT.matches && cT.matches('.team') && event.eventPhase === 3) {
    // this if checks if the currentTarget has a matches property
    // , if it matches the '.team' CSS query
    // and if it's happening during the bubbling phase
    console.dir(event);
    event.stopPropagation();
  }
  // .stopPropagation() is a method of the event object that halts all further propagation
  // of the event. In other words, it'll prevent it from trickling down or bubbling up

  console.log('------------------------');
  // You can use CSS to style console.[log|info|warn|error] output
  // Add %c to the beginning of text that you would like to style
  // write css rules in the second argument of the console loggin function
  // as shown below 👇
  console.info(
    `%ccurrentTarget:`, `font-weight: bold;`, cT.tagName, cT.id, cT.className
  );
  console.info(
    `%ctarget:`, `font-weight: bold;`, t.tagName, t.id, t.className
  );
}
const bumbleBertha = Q('#bumble-bertha');

/*
bumbleBertha.addEventListener('click', logNodeInfo)
bumbleBertha.parentElement.addEventListener('click', logNodeInfo) // .roster
bumbleBertha.parentElement.parentElement.addEventListener('click', logNodeInfo) // .team.salmon
bumbleBertha.parentElement.parentElement.parentElement.addEventListener('click', logNodeInfo) // .teams

document.body.addEventListener('click', logNodeInfo)
Q('html').addEventListener('click', logNodeInfo)
document.addEventListener('click', logNodeInfo)
*/

// 👇 DRYer version of 👆
if (false) {
  [
    bumbleBertha,
    bumbleBertha.parentElement,
    bumbleBertha.parentElement.parentElement,
    bumbleBertha.parentElement.parentElement.parentElement,
    document.body,
    Q('html'),
    document
  ].forEach(function (node) {
    // 👇 this listener will only trigger during the capture phase
    // in other words, when the event is trickling down from the eldest ancestor
    // to the descendent target
    node.addEventListener('click', logNodeInfo, {capture: true})
    // 👇 this listener will only trigger during the bubble phase (the default behaviour)
    // in other words, when the event bubbles back up from target to its eldest ancestor
    node.addEventListener('click', logNodeInfo)
  })
}

// MOUSE EVENTS
// dblclick

Qs('.doggo.fighter').forEach(function (node) {
  node.addEventListener('dblclick', function (event) {
    // 👇 (NEW!) More on destructuring
    const {currentTarget: {style}} = event;
    // 👆 this is syntax sugar for
    // const style = event.currentTarget.style

    // check if the sub-string '180deg' is inside
    // of style.transform
    /180deg/.test(style.transform)
      ? style.transform = 'rotate(0)'
      : style.transform = 'rotate(180deg)'
  })

  // mousedown & mouseup
  node.addEventListener('mousedown', function (event) {
    const {currentTarget: {style}} = event;

    // using the CSS property transform, the node is rotated 5 degrees and
    // scaled 110%
    style.transform = 'rotate(5deg) scale(1.1)';
  })

  node.addEventListener('mouseup', function (event) {
    const {currentTarget: {style}} = event;

    style.transform = '';
  })

  // Exercise: Crouching Mouse Hidden Doggo
  // 2.
  node.addEventListener('mouseenter', function (event) {
    const {currentTarget} = event;
    const nameH1 = currentTarget.querySelector('h1');

    currentTarget.style.filter = 'grayscale(0)';
    nameH1.style.visibility = 'visible';
  })

  node.addEventListener('mouseleave', function (event) {
    const {currentTarget} = event;
    const nameH1 = currentTarget.querySelector('h1');

    currentTarget.style.filter = 'grayscale(0.9)';
    nameH1.style.visibility = 'hidden';
  })
})

// 3.
function createDogFaceIcon () {
  const img = document.createElement('img');
  img.className = 'icon';
  img.src = 'images/dog_face.svg';
  return img;
}

Q('#toxic-tim').addEventListener('dblclick', function (event) {
  const winsDiv = event.currentTarget.querySelector('.wins');
  winsDiv.appendChild(createDogFaceIcon())
})

// FORM & INPUT EVENTS
// input

// playing sounds in the browser
// use the Audio constructor as follows
// 👇 the argument given to the constructor is a url to a sound file
// it can be local or anywhere from the internet
const explosion =  new Audio('sounds/small-explosion.wav');
// 👆 this will create an <audio> node that's unattached to browser
// call .play() to hear the sound

function random (n) { return Math.floor(Math.random() * n) }
function keyTap () { return new Audio(`sounds/vintage-keyboard-${random(5) + 1}.wav`) }
function bark () { return new Audio(`sounds/dog-bark-${random(4) + 1}.wav`) }


Qs('#application-form input').forEach(function (node) {
  node.addEventListener('input', function (event) {
    keyTap().play();
  })
})

Q('#application-form').addEventListener('submit', function (event) {
  // the .preventDefault() method will stop an event from doing what it usually does
  // (e.g. forms will stop causing the browser to make browser queries,
  // anchors will no redirect the user to href, etc)
  event.preventDefault();
  bark().play();
})

// KEYBOARD EVENTS

// keypress
document.addEventListener('keypress', function (event) {
  // panic nyan cat shortcut
  // 👇 if the ctrl key was held whil
  // the key 'n' was pressed redirect user to nyan.cat
  if (event.ctrlKey && event.key === 'n') {
    console.dir(event);
    // the .key property of KeyboardEvent is not always supported
    // in the case where it isn't use String.fromCharCode(event.charCode)
    window.location.replace('http://www.nyan.cat');
  }
})

// Exercise: Shortcuts of the Ninja

// 2.

document.addEventListener('keydown', function (event) {
  const {ctrlKey, altKey, keyCode} = event;
  if (ctrlKey && altKey && (/d/i).test(String.fromCharCode(keyCode))) {
    console.log('Hide the body! ');
    document.body.style.visibility = 'hidden';

    setTimeout(function () {
      document.body.style.visibility = 'visible';
    }, 2000);
  }
});

// 3.
// this function is an IIF (Immediately Invoked Function)
// it's a function that is declared and called at the same time
// it is usually used to isolate variables from the global scope
// via closures
(function () {
  let keyLog = '';

  document.addEventListener('keypress', function (event) {
    const {ctrlKey, altKey, keyCode} = event;
    const char = String.fromCharCode(keyCode);

    // 👇 only keep the last 5 characters
    keyLog = (keyLog + char).slice(-5)

    // check if keyLog matches panic ignoring case
    if ((/panic/i).test(keyLog)) {
      window.location.replace('http://www.hackertyper.net')
      // clear log
      keyLog = '';
    }
  })
})();


























/* */
