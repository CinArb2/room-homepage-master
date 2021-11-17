
// carousel
let track = document.querySelector('.carousel__track');
let boxList = document.querySelectorAll('.carousel__slide');
let btnContainer = document.querySelector('.btn-container');


//on load: 

  //Locate buttons

  const locateBtns = (containerBtn) => {
    if (window.matchMedia("(min-width: 650px)").matches){
      let contentSlide = document.querySelector('.current').lastElementChild;
      let widthBtn = contentSlide.getBoundingClientRect().width;
      containerBtn.style.right = `${widthBtn}px`;
    } else {
      containerBtn.style.right = `0`;
    }
  }

  locateBtns(btnContainer); // move to main - load

  //arrange the slides next to one another on load

  const positionElement = (list) => {
    let boxWidth = window.innerWidth;
    list.forEach((item, index) => {
    item.style.left = `${boxWidth * [index]}px`;
    });
  }

  positionElement(boxList); // move to main - load


// when user start to resize
  window.addEventListener('resize', () => {
    
    //position slides
    positionElement(boxList); // move to main  -resize

    //check new left

    const checkNewLeft = (track) => {
      let currentBox = track.querySelector('.current');
      let amountMove = currentBox.style.left;
      track.style.transform = `translateX(-${amountMove})`;
    }
    checkNewLeft(track);
    // let currentBox = track.querySelector('.current');
    // let amountMove = currentBox.style.left;
    // track.style.transform = `translateX(-${amountMove})`;
    
    //move buttons
    locateBtns(btnContainer); // move to main  -resize
  })

//when click:
  //move slide
  const moveSlide = (currentBox, target, amountMove) => {
    track.style.transform = `translateX(-${amountMove})`;
    currentBox.classList.remove('current');
    target.classList.add('current');
  }

  // check if button is enable
  const verifyDisabled = ( ) => {
    track.firstElementChild.classList.contains('current')
      ? btnContainer.firstElementChild.disabled = true
      : btnContainer.firstElementChild.disabled = false;
    
    track.lastElementChild.classList.contains('current')
      ? btnContainer.lastElementChild.disabled = true
      :btnContainer.lastElementChild.disabled = false;
  }


  btnContainer.addEventListener('click', (e) => {
    let currentBox = track.querySelector('.current');
    if (e.target.matches('.btnNext') || e.target.matches('.btnNext > *')) {
      if (!btnContainer.lastElementChild.disabled) {
        let NextBox = currentBox.nextElementSibling;
        let amountMove = NextBox.style.left;
        moveSlide(currentBox, NextBox, amountMove)
        verifyDisabled();
      }
    } else if (e.target.matches('.btnPrev') || e.target.matches('.btnPrev > *')) {
      if (!btnContainer.firstElementChild.disabled) {
        let prevBox = currentBox.previousElementSibling;
        let amountMove = prevBox.style.left;
        moveSlide(currentBox, prevBox, amountMove)
        verifyDisabled();
      }
    }
  })

// menu

let containerActive = document.querySelector('.nav__list');
let iconBtn = document.querySelector('.header__hamb');
let nav = document.querySelector('.header');

iconBtn.addEventListener('click', () => {
  nav.classList.toggle('overlay');
  if (iconBtn.getAttribute('data-status') === 'close') {
    containerActive.setAttribute('data-visible', 'true');
    iconBtn.setAttribute('data-status', 'open');
  } else {
    containerActive.setAttribute('data-visible', 'false');
    iconBtn.setAttribute('data-status', 'close');
  }
})


// scroll
window.addEventListener('scroll', (e) => {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    nav.style.backgroundColor = '#a3a3a3c4'
  } else {
    nav.style.removeProperty('background-color');
  }
})
