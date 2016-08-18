var escena=new THREE.Scene();

var camara= new THREE.PerspectiveCamera();
camara.position.z=15;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);

var forma1 = new THREE.CylinderGeometry(5,5,30,64);
var material1 = new THREE.MeshLambertMaterial();
var tronco = new THREE.Mesh(forma1,material1);

escena.add(tronco);

renderizador.render(escena,camara);
