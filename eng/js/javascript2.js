
let menuHamburger = document.querySelector('ul');
let menuButton = document.querySelector('.hamburger-button');
let menuOpen = false;
let bodyBackground = document.querySelector('.background-container');
let ship = document.querySelector('.ship');
let X;
let Y;
let translateShip = 1; 
let mouse = addEventListener('mousemove', (e) => {
   X = e.clientX;
   Y = e.clientY;
}) ;



let rotate = 0;
let index = 1
setInterval(() => {  

  if(X < window.innerWidth/2)  { 
    if(rotate > 10 ) {
      return;
    }else { 
    rotate+=0.05 ;
    }

  } if(X > window.innerWidth/2) {
    if(rotate < -10) {
      return;
    }
    else {
      rotate -= 0.05 ;
    }
  }


  bodyBackground.style.transform = 'rotate('+rotate +'deg)'; 

}, 10);

setInterval(() => {
  if (rotate > 0 ) {
    if (ship.getBoundingClientRect().right < window.innerWidth){
      translateShip += 0.2;

    }
      else {
        translateShip += 0;
      }
  }

  if (rotate < 0) {
    if(ship.getBoundingClientRect().x >= 0) {
      translateShip -= 0.2;  

    }
    else {
      translateShip += 0;
    }
  }
    



ship.style.transform ='translateX('+translateShip+'px) ';
  
}, 10);

function displayMenuBaseOnWindowInnerWidth() {
  if(document.documentElement.clientWidth < 768 ) {

    menuHamburger.style.display = 'none';
    menuButton.classList.remove('open');
  }
  if(document.documentElement.clientWidth >= 768 ) {
    menuHamburger.style.display = 'block';
    menuHamburger.classList.remove('open');

  }

}

window.addEventListener('resize', displayMenuBaseOnWindowInnerWidth);

menuButton.addEventListener('click', () => {
  if(!menuOpen) {    
    menuHamburger.classList.add('open');
    menuHamburger.style.display = 'block';
    menuOpen = true;
    menuButton.classList.add('open');

  } else {
 
    menuHamburger.style.display = 'none';
    
    menuHamburger.classList.remove('open');
    menuOpen = false;
    menuButton.classList.remove('open');

  }
});


function pageTransitionHorizontalBottom() {
  let tl = gsap.timeline();
  tl.to('.horizontal-bottom', {duration: .1, transformOrigin: "bottom", scaleY: 0.5, delay: .5, opacity: 1})
  tl.to('.horizontal-bottom', {duration: 2,  transformOrigin: "bottom", scaleY: -1, delay: .5, opacity: 1})
}

function pageTransitionHorizontalTop() {
  let tl = gsap.timeline();
  tl.to('.horizontal-top', {duration: .1, transformOrigin: "top", scaleY: 0.5, delay: .5, opacity: 1})
  tl.to('.horizontal-top', {duration: 2,  transformOrigin: "top", scaleY: -1, delay: .5, opacity: 1})
}

function pageTransitionVerticalLeft() {
  let tl = gsap.timeline();
  tl.to('.vertical-left', {duration: 0, transformOrigin: "left", opacity: 1, scaleX:0 })
  tl.to('.vertical-left', {duration: 0.5, transformOrigin: "left", opacity: 1, scaleX:0.5 })
  tl.to('.vertical-left', { duration: 0, transformOrigin: "left", opacity: 0, scaleX:0, delay: .2})
}

function pageTransitionVerticalRight() {
  let tl = gsap.timeline();
  tl.to('.vertical-right', {duration: 0, transformOrigin: "right", opacity: 1, scaleX:0 })
  tl.to('.vertical-right', {duration: .5, transformOrigin: "right", opacity: 1, scaleX:0.5})
  tl.to('.vertical-right', {duration: 0,  transformOrigin: "right",opacity: 0, scaleX:0, delay: .2})
}


function contentAnimation() {
  let tl = gsap.timeline();
  tl.from('main', {duration: 1,opacity: 1,scale:0.5, delay:0})
  tl.to('ul li', {duration: 1.1,opacity: 1, stagger: .15})
  if(document.querySelector(".technologies")) {
  tl.from('.technologies section li', {duration: 0.5, opacity: 0, stagger: 0.3 })
  }
}

function delay(n) { 
  n = n|| 2000;
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
}


barba.init({

  sync: true,

  transitions: [{
    async leave() {
      const done = this.async();
      pageTransitionVerticalRight();
      pageTransitionVerticalLeft();
      pageTransitionHorizontalBottom();
      pageTransitionHorizontalTop();
      await delay(900);
      done();
    },
    async enter() {
      contentAnimation(); 
      menuHamburger.style.display = 'none';            
      menuOpen = false;
      menuButton.classList.remove('open');
      menuHamburger.classList.remove('open');
      setTimeout(() => {
        menuHamburger = document.querySelector('ul');
      }, 1000)


    },
    
    async once() {
      contentAnimation();
    }
    
  }]
});



