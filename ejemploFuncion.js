funcion init(p){
  var malla(new THREE.BoxGeometry(p,p,p), new THREE.MeshNormalMaterial());
  escena = new THREE.Scene();
  escena.add(malla);
  
  camara = new THREE.PerspectiveCamera();
  renderizador = new THREE.WebGLRenderer();
  renderizador.setSize(700,700);
  document.body.appendChild ( renderizador.domElement ); 
  renderizador.render(escena,camara);
}

/*
var main = funtion(p){
  renderizador.render(escena,camara);
}
*/
  
