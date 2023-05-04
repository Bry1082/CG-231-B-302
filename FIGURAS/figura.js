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

function generarEsfera3D(vertices, radio) {
  // Generar caras de la esfera utilizando triangulación
  const faces = THREE.ShapeUtils.triangulateShape(vertices, []);

  // Convertir los vértices a un arreglo de Float32Array
  const position = new Float32Array(vertices.length * 3);
  for (let i = 0; i < vertices.length; i++) {
    position[i * 3] = vertices[i].x * radio;
    position[i * 3 + 1] = vertices[i].y * radio;
    position[i * 3 + 2] = vertices[i].z * radio;
  }

  // Crear la geometría de la esfera con los vértices y caras
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geometry.setIndex(faces);

  // Crear la malla de la esfera con la geometría y material
  
  const color= new THREE.Color("rgb(0, 0, 0)"); //color
  const material = new THREE.MeshBasicMaterial({ color, wireframe: true });
  const sphere = new THREE.Mesh(geometry, material);

  return sphere;
}
const vertices = [
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(0, 0, -1),
  new THREE.Vector3(0, -1, 0),
];

const esfera = generarEsfera3D(vertices, 3);
scene.add(esfera);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render(); // Llama a la función render después de agregar la esfera a la escena
s

