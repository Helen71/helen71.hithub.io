// === SLIDER ======================================//

const next = document.querySelector('.btn-next');
const prev = document.querySelector('.btn-prev');
const slider = document.querySelector('.slider-window');

let elCounts = 5;
let current_1 = 1;
let  slide_Width= 100 / elCounts;
let shift = 0;

next.addEventListener('click', () => {
  if (current_1 < elCounts) {
    shift += slide_Width;
    slider.style.transform = `translateX(-${shift}%)`;
    current_1++;
  } else {
    shift = 0;
    current_1 = 1;
    slider.style.transform = `translateX(${shift}%)`;
  };
});

prev.addEventListener('click', () => {
  if (current_1 > 1) {
    shift -= slide_Width;
    current_1--;
    slider.style.transform = `translateX(-${shift}%)`;
  } else if (current_1 === 1) {
    shift = elCounts * slide_Width - slide_Width;
    slider.classList.toggle('move');
    slider.style.transform = `translateX(-${shift}%)`;
    current_1 = elCounts;
  };
});

// ================== CAROUSEL==================== //
(function () {
  const options = ['far-left', 'left', 'center', 'right', 'far-right'];
  const cards = document.querySelectorAll('.carousel__card');

  function addCardListeners() {
    cards.forEach(card => {
      card.addEventListener('click', cardEventListener);
    });
  };
  addCardListeners();

  function cardEventListener(e) {
    let parent = getParents(e.target, '.carousel__card')[0];
    let parentIndex = options.indexOf(parent.id);

    cards.forEach(function (card) {
      let index = options.indexOf(card.id);
      if (parentIndex > 2) {
        let previousIndex = index - 1 < 0 ? cards.length - 1 : index - 1;
        card.id = options[previousIndex];
      } else if (parentIndex < 2) {
        let nextIndex = index + 1 > cards.length - 1 ? 0 : index + 1;
        card.id = options[nextIndex];
      }
    });
  }

  function getParents(elem, selector) {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          const matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }
    window.onbeforeunload = function() {
      localStorage.setItem("email", document.getElementById('email').value);
      localStorage.setItem("subject", document.getElementById('subject').value);  
    } 
    
    window.onload = function() {
      let email = localStorage.getItem("email");
      let subject = localStorage.getItem("subject"); 
    
    
      if (email !== null) document.getElementById('email').value = fname;
      if (subject !== null) document.getElementById('subject').value = lname; 
    
    }
    //== Setup parents array ==//
    let parents = [];

    //=== Get matching parent elements ==//
    for (; elem && elem !== document; elem = elem.parentNode) {

      //== Add matching parents to array =====//
      if (selector) {
        if (elem.matches(selector)) {
          parents.push(elem);
        }
      } else {
        parents.push(elem);
      }
    }

    return parents;
  };
})();

// ================= NAVIGATION ==================//

const nav = document.querySelector('.navigation');
const openBtn = document.querySelector('.open');
const closeBtn = document.querySelector('.close');
const links = document.querySelectorAll('.link');
const sliderSection = document.querySelector('.slider');

openBtn.addEventListener('click', () => {
  nav.classList.add('active');
  nav.style.animation = 'navIn .3s forwards';
  document.body.style.overflowY = 'hidden';
});

const navRemFeatures = () => {
  nav.classList.remove('active');
  nav.removeEventListener('animationend', navRemFeatures);
  document.body.style.overflowY = 'scroll';
};

const navClose = () => {
  nav.style.animation = 'navOut .3s forwards';
  nav.addEventListener('animationend', navRemFeatures);
};

closeBtn.addEventListener('click', navClose);

links.forEach(link => {
  link.addEventListener('click', navClose);
});

//====== CHANGE COLOR OF OPENBTN==============//

window.onscroll = () => {
  const sliderPosTop = sliderSection.offsetTop;
  const sliderPosBottom = sliderPosTop + sliderSection.getBoundingClientRect().height;
  const actuallPos = window.pageYOffset;
  const correction = 25;

  (sliderPosTop < (actuallPos + correction) && sliderPosBottom > (actuallPos + correction)) ? openBtn.style.color = '#fff': openBtn.style.color = '#000';
};

// ======SAVING DATA=================//
document.getElementById("input-email").value = getSavedInputValue("input-email");    // set the value to this input

//Save the value function - save it to localStorage as (EMAIL, SUBJECT)
function saveInputValue(e) {
    var id = e.email;  // get the sender's id to save it . 
    var val = e.subject; // get the value. 
    localStorage.setItem(id, val);// Every time user writing something, the localStorage's value will override . 
}

//get the saved value function - return the value of "t" from localStorage. 
function getSavedInputValue(t) {
    if (!localStorage.getItem(t)) {
        return "";// You can change this to your defualt value. 
    }
    return localStorage.getItem(t);
}