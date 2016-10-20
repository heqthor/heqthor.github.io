function Pieza(){
  THREE.Object3D.call(this);
  this.piernaIzq = new THREE.Mesh(new THREE.BoxGeometry(1,5,1));
  this.piernaDer = new THREE.Mesh(new THREE.BoxGeometry(1,5,1));
  var cuerpo = new THREE.Mesh(new THREE.BoxGeometry(5,10,5));
  this.add(this.piernaIzq,this.piernaDer,cuerpo);
  this.piernaIzq.position.z=-2;
  this.piernaIzq.position.y=-2.5;
  this.piernaDer.position.z=2;
  this.piernaDer.position.y=-2.5;
  cuerpo.position.y=2.5;
}

Pieza.prototype = new THREE.Object3D;

function setup(){
  pieza = new Pieza();
  escena = new THREE.Scene();
  escena.add(pieza);
  
  camara = new THREE.PerspectiveCamera();
  camara.position.z=50;
  renderizador = new THREE.WebGLRenderer();
  renderizador.setSize(500,500);
  document.body.appendChild ( renderizador.domElement ); 

}
function loop(){
  
  requestAnimationFrame(loop);
  
  if(Math.abs(angulo)>=Math.PI/4){
    inclinacion=-inclinacion;
  }
  angulo=angulo+inclinacion;
  pieza.piernaIzq.rotateZ(inclinacion);
  pieza.piernaDer.rotateZ(-inclinacion);
  pieza.position.x=movX;
  movX=movX+posX;
  if(Math.abs(movX)>=15){
    posX=-posX;
    pieza.rotateY(Math.PI);
  }
  
  renderizador.render(escena,camara);
}


  
var inclinacion=0.1;
var angulo=0;
var posX=0.1;
var movX=0;
setup();
loop();
