function init(p){
  malla= new THREE.Mesh(new THREE.BoxGeometry(p,p,p), new THREE.MeshNormalMaterial());
  escena = new THREE.Scene();
  escena.add(malla);
  
  camara = new THREE.PerspectiveCamera();
  camara.position.z=5*p;
  renderizador = new THREE.WebGLRenderer();
  renderizador.setSize(700,700);
  document.body.appendChild ( renderizador.domElement ); 
}


var main = function(p){
  //p(1);
  renderizador.render(escena,camara);
}

var loop = function(){
  requestAnimationFrame(loop);
  renderizador.render(escena,camara);
  malla.rotateY(0.01);
  malla.rotateX(0.01);
  malla.rotateZ(0.01);
  if(contX>350)
    enX=1;
  else if(contX<-350)
    enX=0;
  if(enX==1){
    contX++;
    malla.position.x=contX;}
  else{
    contX--;
      malla.position.x=contX;}
  
}

var enX,enY,contY,contX,malla,escena, camara, renderizador;///----No hay var en éstas porque son variables globales y no estaban declaradas

init(1);
//main();
loop();
//main(init);
