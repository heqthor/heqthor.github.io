var puntos=[];

puntos.push(0,0);
puntos.push(20,0);
puntos.push(20,10);
puntos.push(15,10);
puntos.push(15,15);
puntos.push(10,15);
puntos.push(10,40);
puntos.push(20,40);
puntos.push(20,45);
puntos.push(10,45);
puntos.push(10,50);
puntos.push(15,50);
puntos.push(15,60);
puntos.push(0,60);
puntos.push(0,0);

var torreForma= new THREE.LatheGeometry(puntos);

var troncoForma = new THREE.CylinderGeometry(.25,.5,1);
var esferaForma = new THREE.SphereGeometry(.65);
esferaForma.translate(0,1,0);

var troncoMalla = new THREE.Mesh(troncoForma);
var esferaMalla = new THREE.Mesh(esferaForma);

var arbolForma = new THREE.Geometry();

arbolForma.merge(troncoMalla.geometry, troncoMalla.matrix);
arbolForma.merge(esferaMalla.geometry, esferaMalla.matrix);

var material = new THREE.MeshNormalMaterial();
var arbolMalla = new THREE.Mesh(torreForma, material);

var escena = new THREE.Scene();
escena.add(arbolMalla);

var camara = new THREE.PerspectiveCamera();
camara.position.z=100;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);
renderizador.render(escena,camara);
