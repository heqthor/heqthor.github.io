var escena=new THREE.Scene();

var camara= new THREE.PerspectiveCamera();
camara.position.z=50;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);

var formaTronco = new THREE.CylinderGeometry(5,5,30,64);
var materialTronco = new THREE.MeshBasicMaterial({color: 0x907736});
var tronco = new THREE.Mesh(formaTronco,materialTronco);

var formaHoja = new THREE.SphereGeometry(10,64,64);
var materialHoja = new THREE.MeshBasicMaterial({color: 0x35D02A});
var hoja = new THREE.Mesh(formaHoja,materialHoja);
hoja.position.y=30;

escena.add(tronco);
escena.add(hoja);

renderizador.render(escena,camara);
