//Bryam Barreto 
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera= new THREE.OrthographicCamera( //Vista Ortografica
  5, //left
  -5, //right
  5, // top
  -5, //bottom
  3,//near
  10); //far
var helper = new THREE.CameraHelper(camera);
camera.position.z = 4.5;
camera.position.x = -5.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);
scene.add(helper);

/*var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);

scene.add(camera);*/

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

//Prisma Hexagonal generado con vertices con ayuda de CHATGPT

function createHexPrismGeometry(side, height) {
  const geometry = new THREE.BufferGeometry();

  // Definir los vértices del prisma hexagonal en base al tamaño del lado y la altura
  const halfHeight = height / 2;
  const vertices = new Float32Array([
    -side/2, -halfHeight, -Math.sqrt(3)/2 * side,
     side/2, -halfHeight, -Math.sqrt(3)/2 * side,
     side, -halfHeight, 0,
     side/2, -halfHeight, Math.sqrt(3)/2 * side,
    -side/2, -halfHeight, Math.sqrt(3)/2 * side,
    -side, -halfHeight, 0,
    -side/2, halfHeight, -Math.sqrt(3)/2 * side,
     side/2, halfHeight, -Math.sqrt(3)/2 * side,
     side, halfHeight, 0,
     side/2, halfHeight, Math.sqrt(3)/2 * side,
    -side/2, halfHeight, Math.sqrt(3)/2 * side,
    -side, halfHeight, 0,
  ]);

  // Definir las caras del prisma hexagonal utilizando los índices de los vértices
  const indices = new Uint16Array([
    0, 1, 2,
    0, 2, 5,
    2, 3, 4,
    2, 4, 5,
    0, 5, 11,
    0, 11, 6,
    1, 0, 6,
    1, 6, 7,
    2, 1, 7,
    2, 7, 8,
    3, 2, 8,
    3, 8, 9,
    4, 3, 9,
    4, 9, 10,
    5, 4, 10,
    5, 10, 11,
    6, 11, 10,
    6, 10, 9,
    6, 9, 8,
    6, 8, 7,
  ]);

  // Agregar los vértices y las caras a la geometría
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));

  // Calcular las normales de la geometría para suavizar las caras
  geometry.computeVertexNormals();


  // Crear una malla utilizando la geometría y un material

  const color= new THREE.Color("rgb(0, 0, 0)"); //color
  const material = new THREE.MeshBasicMaterial({ color, wireframe: true });
  const mesh = new THREE.Mesh(geometry, material);
  // Agregar la malla a la escena
  scene.add(mesh);
  
}


//Renderizado de la animación
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();

createHexPrismGeometry(1.5, 5);
