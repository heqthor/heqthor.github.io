var tableroForma = new THREE.Geometry();

for(var i=0;i<=8;i++){
  for(var j=0;j<=8;j++){
    var cubo = new THREE.BoxGeometry(10,10,5);
    cubo.translate(-35+i*10,35-j*10,0);
    var cuboMalla = new THREE.Mesh(cubo);
    tableroForma.merge(cuboMalla.geometry,cuboMalla.matrix);
  }
}

var material = new THREE.MeshNormalMaterial();

var tableroMalla = new THREE.Mesh(tableroForma,material);

/*
var torreForma= new THREE.Geometry();

torreForma.merge(baseMalla.geometry, baseMalla.matrix);

for(var i=0; i<=6; i++){
var picoForma = new THREE.CylinderGeometry( 4, 2, 15, 32 );
  picoForma.translate(13*(Math.sin(Math.PI*2/6*i)),60,13*(Math.cos(Math.PI*2/6*i)));
var picoMalla =new THREE.Mesh(picoForma); 
  torreForma.merge(picoMalla.geometry, picoMalla.matrix);
}


var material = new THREE.MeshNormalMaterial();

var torreMalla = new THREE.Mesh(torreForma,material);

*/

var escena = new THREE.Scene();
escena.add(tableroMalla);

var camara = new THREE.PerspectiveCamera();
camara.position.z=200;
camara.rotateX(Math.PI/4);

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);
renderizador.render(escena,camara);
