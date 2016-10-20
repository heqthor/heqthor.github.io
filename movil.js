function Pieza(){
  THREE.Object3D.call(this);
  this.piernaIzq = new THREE.Mesh(new THREE.BoxGeometry(1,5,1));
  this.piernaDer = new THREE.Mesh(new THREE.BoxGeometry(1,5,1));
  var cuerpo = new THREE.Mesh(new THREE.BoxGeometry(5,10,5));
  this.add(this.piernaIzq,this.piernaDer,cuerpo);
  this.piernaIzq.position.z=-2;
  this.piernaIzq.position.y=-2.5;
  this.piernaDer.position.z=-2;
  this.piernaDer.position.y=-2.5;
  cuerpo.position.z=2.5;
}

Pieza.prototype = new THREE.Object3D;

function setup(){
  pieza = new Pieza();
  escena = new THREE.Scene();
  escena.add(pieza);
  
  camara = new THREE.PerspectiveCamera();
  camara.position.z=20;
  renderizador = new THREE.WebGLRenderer();
  renderizador.setSize(700,700);
  document.body.appendChild ( renderizador.domElement ); 

}

function loop(){
  requestAnimationFrame(loop);
  pieza.rotateY(0.01);
  renderizador.render(escena,camara);
}

setup();
loop();
