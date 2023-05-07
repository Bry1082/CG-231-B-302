//Bryam Barreto 
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
camera.position.z = 4.5;
camera.position.x = -5.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);
scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);




//Luz del escenario sacado de un repositorio del semestre
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);

const size = 150;
const divisions = 160;
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

//Figura de dodecaedro 12 caras
function figura(){
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  // Definimos los vértices del icosaedro
  const vertices = [
    -1, goldenRatio, 0,
    1, goldenRatio, 0,
    -1, -goldenRatio, 0,
    1, -goldenRatio, 0,
    0, -1, goldenRatio,
    0, 1, goldenRatio,
    0, -1, -goldenRatio,
    0, 1, -goldenRatio,
    goldenRatio, 0, -1,
    goldenRatio, 0, 1,
    -goldenRatio, 0, -1,
    -goldenRatio, 0, 1,
  ];
  
  // Definimos los índices de los triángulos del icosaedro
  const indices = [
    0, 11, 5,
    0, 5, 1,
    0, 1, 7,
    0, 7, 10,
    0, 10, 11,
    1, 5, 9,
    5, 11, 4,
    11, 10, 2,
    10, 7, 6,
    7, 1, 8,
    3, 9, 4,
    3, 4, 2,
    3, 2, 6,
    3, 6, 8,
    3, 8, 9,
    4, 9, 5,
    2, 4, 11,
    6, 2, 10,
    8, 6, 7,
    9, 8, 1,
  ];
  
  
  // Creamos los buffers de la geometría
  const positionBuffer = new Float32Array(vertices);
  const indexBuffer = new Uint16Array(indices);
  
  // Creamos la geometría del icosaedro
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positionBuffer, 3));
  geometry.setIndex(new THREE.BufferAttribute(indexBuffer, 1));
  const color= new THREE.Color("rgb(0, 0, 0)"); //color
  const material = new THREE.MeshStandardMaterial({ color, wireframe: true });
  const malla = new THREE.Mesh(geometry, material);
  scene.add(malla);
}
 figura();


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}



render(); // Llama a la función render después de agregar la esfera a la escena




