import './style.css'

import * as THREE from "three"

// enabling the mouse to move in the scene
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

// create the scene

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg")
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)


renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

// Lightening concept

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)

const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper, gridHelper)

// adding randomly genereted stars

function addStart() {
  const geometry = new THREE.SphereGeometry(0.25)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map( ()=> THREE.MathUtils.randFloatSpread(100) )

  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStart)

// adding images

const spaceTexture = new THREE.TextureLoader().load( 'https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' );
scene.background = spaceTexture


const robotTexture = new THREE.TextureLoader().load( 'https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' );

const robot = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: robotTexture})
)


const moonTexture = new THREE.TextureLoader().load( 'https://images.pexels.com/photos/73828/volcanic-eruption-eruption-volcano-volcanism-73828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' );

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({ map: moonTexture})
)

moon.position.z = 30
moon.position.setX(-10)
scene.add(moon)

// using the mouse
const controls = new OrbitControls(camera, renderer.domElement)

// tell the browser that you want to do animations

function animate(){
  requestAnimationFrame(animate)

  // add your animations
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()

  renderer.render(scene, camera)
}

// function to move the document on scroll

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  robot.rotation.y += 0.01;
  robot.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera

animate()