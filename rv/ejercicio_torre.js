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

var baseForma= new THREE.LatheGeometry(puntos);
var baseMalla = new THREE.Mesh(baseForma);

var torreForma= new THREE.Geometry();

torreForma.merge(baseMalla.geometry, baseMalla.matrix);

for(var i=0; i<=6; i++){
  var picoForma = new THREE.CylinderGeometry( 4, 2, 15, 32 );
  picoForma.translate(13*(Math.sin(Math.PI*2/6*i)),65,13*(Math.cos(Math.PI*2/6*i)));
var picoMalla =new THREE.Mesh(picoForma); 
  torreForma.merge(picoMalla.geometry, picoMalla.matrix);
}

/*var troncoMalla = new THREE.Mesh(troncoForma);
var esferaMalla = new THREE.Mesh(esferaForma);

var arbolForma = new THREE.Geometry();

arbolForma.merge(troncoMalla.geometry, troncoMalla.matrix);
arbolForma.merge(esferaMalla.geometry, esferaMalla.matrix);
*/
var material = new THREE.MeshNormalMaterial();

var torreMalla = new THREE.Mesh(torreForma,material);

//torreMalla.rotateX(Math.PI/4);

var escena = new THREE.Scene();
escena.add(torreMalla);

var camara = new THREE.PerspectiveCamera();
camara.position.z=500;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);
renderizador.render(escena,camara);
