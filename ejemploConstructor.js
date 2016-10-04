function Arbol(){
  var troncoForma = new THREE.CylinderGeometry(.25,.5,1);
  var esferaForma = new THREE.SphereGeometry(0.65);
  esferaForma.translate(0,1,0);

  var troncoMalla = new THREE.Mesh(troncoForma);
  var esferaMalla = new THREE.Mesh(esferaForma);
  
  var arbolForma = new THREE.Mesh(troncoForma);
  arbolForma.merge(troncoMalla.geometry, troncoMalla.matrix);
  arbolForma.merge(esferaMalla.geometry, esferaMalla.matrix);
  
  var material = new THREE.MeshNormalMaterial();
  this.malla = new THREE.Mesh(arbolForma, material); //se crea cada que se llama new
}

var CONSTRUCTOR = new Object();

CONSTRUCTOR.setup = fuction(){
  var arbol1 = new Arbol();
  var arbol2 = new Arbol();
  
  arbol1.malla.position.x=-5;
  arbol2.malla.position.x=5;
  
  CONSTRUCTOR.camara = new THREE.PerspectiveCamera();
  CONSTRUCTOR.camara.position.z = 20;
  
  var lienzo = document.getElementById("ejemplo-constructor");
  CONSTRUCTOR.renderizador = new THREE.WebGLRenderer({canvas: lienzo, antialias: true});
  
  CONSTRUCTOR.renderizador.render.setSize(600,600);
  
  CONSTRUCTOR.escena = new THREE.Scene();
  CONSTRUCTOR.escena.add(arbol1);
  CONSTRUCTOR.escena.add(arbol2);
  
  CONSTRUCTOR.renderizador.render(CONSTRUCTOR.escena, CONSTRUCTOR.camara);
}
  
