var figura = new THREE.Shape();
var picos=4;
var long=20;

figura.moveTo(0,0);

for(var i=0; i<=picos*2-1;i++){
  if(i%2==0){
    long=20;
  }else{
    long=10;
  }
figura.lineTo(long*Math.cos(Math.PI*2/(picos*2-1)*i),long*Math.sin(Math.PI*2/(picos*2-1)*i));
}
var estrella= new THREE.ShapeGeometry(figura);
var estrellaMalla = new THREE.Mesh(estrella);



var escena = new THREE.Scene();
escena.add(estrellaMalla);

var camara = new THREE.PerspectiveCamera();
camara.position.z=500;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);
renderizador.render(escena,camara);
