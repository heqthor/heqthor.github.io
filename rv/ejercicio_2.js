var escena=new THREE.Scene();

var camara= new THREE.PerspectiveCamera();
camara.position.z=5;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);

var forma1 = new THREE.CylinderGeometry(5,5,30,64);
var material = new THREE.MeshLambertMaterial( {color: 0x79553d});
var tronco = new THREE.Mesh(forma,material);

escena.add(tronco);

renderizador.render(escena,camara);
