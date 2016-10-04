var PROTOTIPO = new Object();

PROTOTIPO.ArbolGeometry = function(){
  THREE.Geometry.call(this);
  
  var troncoForma = new THREE.CylinderGeometry(0.25,0.5,1);
  var esferaForma = new THREE.SphereGeometry(0.65);
  esferaForma.translate(0,1,0);
  
  var troncoMalla = new THREE.Mesh(troncoForma);
  var esferaMalla = new THREE.Mesh(esferaForma);
  
  this.merge(troncoMalla.geometry,troncoMalla.matrix);
  this.merge(esferaMalla.geometry,esferaMalla.matrix);
}

PROTOTIPO.ArbolGeometry.prototype = new THREE.Geometry();

PROTOTIPO.setup = function(){
  var arbol1 = new THREE.Mesh(new PROTOTIPO.ArbolGeometry(), new THREE.MeshNormalMaterial());
  var arbol2 = new THREE.Mesh(new PROTOTIPO.ArbolGeometry(), new THREE.MeshNormalMaterial());
  
  arbol1.position.x=5;
  arbol2.position.x=-5;
  
  PROTOTIPO.camara= new THREE.PerspectiveCamera();
  PROTOTIPO.camara.position. z= 20;
  
  PROTOTIPO.escena = new THREE.Scene();
  PROTOTIPO.escena.add(arbol1);
  PROTOTIPO.escena.add(arbol2);
  
  var lienzo = document.getElementById("ejemplo-prototipo");
  
  PROTOTIPO.renderizador = new THREE.WebGLRenderer({canvas: lienzo, antialias: true});
  
  PROTOTIPO.renderizador.setSize(600,600);
}

PROTOTIPO.loop = function(){
  requestAnimationFrame( PROTOTIPO.loop );
  PROTOTIPO.renderizador.render( PROTOTIPO.escena, PROTOTIPO.camara );
}

PROTOTIPO.setup();
PROTOTIPO.loop();
