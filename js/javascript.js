
let scene = new THREE.Scene();
loadingManager = new THREE.LoadingManager();
const loadingScreen = document.querySelector('.loading-screen');
const percentLoaded = document.querySelector('.percent-loaded');
loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  percentLoaded.innerHTML = (itemsLoaded/itemsTotal * 100).toFixed(2) + '%';
};
loadingManager.onLoad = function ( ) {
  loadingScreen.style.display = 'none';
  animate();
};


let menuHamburger = document.querySelector('ul');
let menuButton = document.querySelector('.hamburger-button');
let menuOpen = false;
let number = 0;
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );


let textureLoader = new THREE.CubeTextureLoader(loadingManager);
textureLoader.setPath('../WebsitePortfolio/assets/background/');
const textureCube = textureLoader.load([
    'skybox_left.png',
    'skybox_right.png',
    'skybox_up.png',
    'skybox_down.png',
    'skybox_front.png',
    'skybox_back.png'
]);
scene.background = textureCube;
let renderer = new THREE.WebGLRenderer({ antialias: true });
document.body.appendChild( renderer.domElement );
renderer.setSize(window.innerWidth, window.innerHeight);
 const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.4, 1000);
 resize = window.addEventListener('resize', onWindowResize);  


 const cometObject = new THREE.Object3D();
 const gltfLoader = new THREE.GLTFLoader(loadingManager);
 gltfLoader.load('../WebsitePortfolio/assets/comets/meteorite/scene.gltf', (comet) => {
   cometObject.add(comet.scene);
   cometObject.scale.set(10, 10, 10);
   scene.add(cometObject);
 })
 setCometMovement(cometObject);

 const comet2Object = new THREE.Object3D();
 gltfLoader.load('../WebsitePortfolio/assets/comets/rock2/scene.gltf', (comet) => {
  comet2Object.add(comet.scene);
  comet2Object.scale.set(50, 50, 50);
   scene.add(comet2Object);
 })
 setCometMovement(comet2Object);

 
 const comet3Object = new THREE.Object3D();
 gltfLoader.load('../WebsitePortfolio/assets/comets/meteorite2/scene.gltf', (comet) => {
   comet3Object.add(comet.scene);
   comet3Object.scale.set(100, 100, 100);
   scene.add(comet3Object);
 })
 setCometMovement(comet3Object);


 
 const comet4Object = new THREE.Object3D();
 gltfLoader.load('../WebsitePortfolio/assets/comets/meteorite2/scene.gltf', (comet) => {
   comet4Object.add(comet.scene);
   comet4Object.scale.set(200, 200, 200);
   scene.add(comet4Object);
 })
 setCometMovement(comet4Object);
  
 const comet5Object = new THREE.Object3D();
 gltfLoader.load('../WebsitePortfolio/assets/comets/meteorite2/scene.gltf', (comet) => {
   comet5Object.add(comet.scene);
   comet5Object.scale.set(100, 100, 100);
   scene.add(comet5Object);
 })
 setCometMovement(comet5Object);

const interval = setInterval(() => {
  setCometMovement(cometObject);
  setCometMovement(comet2Object);
  setCometMovement(comet3Object);
  setCometMovement(comet4Object);
  setCometMovement(comet5Object);
 }, 15000);
 


function setCometMovement(comet) {  
  let num = Math.floor(Math.random()*199) + 100; // this will get a number between 1 and 99;
  num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases

  let directionY = (Math.random() * (3.620 - 1.5) + 1.5); // this will get a number between 1 and 99;
  directionY *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases

  let directionX = (Math.random() * (3.620 - 1.5) + 1.5); // this will get a number between 1 and 99;
  directionX *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases

  let directionZ = (Math.random() * (3.620 - 1.5) + 1.5); // this will get a number between 1 and 99;
  directionZ *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases

  let rotateY = (Math.random() * (0.00120 - 0.000200) + 0.00900); 
  rotateY *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

  let rotateZ = (Math.random() * (0.00120 - 0.000200) + 0.00900); 
  rotateZ *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

  let rotateX = (Math.random() * (0.00120 - 0.000200) + 0.00900); 
  rotateX *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

let scale = Math.floor(Math.random()*99) + 20
  comet.position.z=num;
  comet.position.x=num;
  comet.position.y=num;
  comet.scale.set(scale,scale,scale);
  comet.z = directionZ;
  comet.x = directionX;
  comet.y = directionY;
  comet.rotateY=rotateY;
  comet.rotateZ=rotateZ;
  comet.rotateX=rotateX;
}




function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  camera.rotation.x+=0.001;
  camera.rotation.z+=0.001;
  scene.children.forEach(element => {
    element.position.z+=element.z;
    element.position.x+=element.x;
    element.position.y+=element.y;
    element.rotation.y+=element.rotateY;
    element.rotation.x+=element.rotateX;
    element.rotation.z+=element.rotateZ;
  });
 }



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


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

