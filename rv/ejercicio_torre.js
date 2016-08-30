var puntos=[];

puntos.push(new THREE.Vector2(0,0));
puntos.push(new THREE.Vector2(20,0));
puntos.push(new THREE.Vector2(20,10));
puntos.push(new THREE.Vector2(15,10));
puntos.push(new THREE.Vector2(15,15));
puntos.push(new THREE.Vector2(10,15));
puntos.push(new THREE.Vector2(10,40));
puntos.push(new THREE.Vector2(20,40));
puntos.push(new THREE.Vector2(20,45));
puntos.push(new THREE.Vector2(10,45));
puntos.push(new THREE.Vector2(10,50));
puntos.push(new THREE.Vector2(15,50));
puntos.push(new THREE.Vector2(15,60));
puntos.push(new THREE.Vector2(0,60));
puntos.push(new THREE.Vector2(0,0));

var torreForma= new THREE.LatheGeometry(puntos);

var material = new THREE.MeshNormalMaterial();
var torreMalla = new THREE.Mesh(torreForma, material);

var escena = new THREE.Scene();
escena.add(torreMalla);

var camara = new THREE.PerspectiveCamera();
camara.position.z=50;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);
renderizador.render(escena,camara);
