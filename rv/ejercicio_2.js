var escena=new THREE.Scene();

var camara= new THREE.PerspectiveCamera();
camara.position.z=100;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);

var formaTronco = new THREE.CylinderGeometry(5,5,5,64);
var materialTronco = new THREE.MeshBasicMaterial({color: 0x907736});
var tronco = new THREE.Mesh(formaTronco,materialTronco);

var formaHoja = new THREE.SphereGeometry(1,64,30);
var materialHoja = new THREE.MeshBasicMaterial({color: 0x35D02A});
var hoja = new THREE.Mesh(formaHoja,materialHoja);
hoja.position.y=15;

escena.add(tronco);
escena.add(hoja);

renderizador.render(escena,camara);
