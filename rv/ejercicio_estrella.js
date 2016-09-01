var puntos=[];
var picos=4;
var long=20;

for(var i=0; i<=picos*2-1;i++){
  if(i%2==0){
    long=20;
  }else{
    long=10;
  }
  puntos.push(new THREE.Vector2(long*Math.cos(Math.PI*2/(picos*2-1)*i),long*Math.sin(Math.PI*2/(picos*2-1)*i)));
}
var material = new THREE.MeshNormalMaterial();
var estrella = new THREE.Geometry(puntos);

var estrellaMalla = new THREE.Mesh(estrella,material);



var escena = new THREE.Scene();
escena.add(estrellaMalla);

var camara = new THREE.PerspectiveCamera();
camara.position.z=500;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);
renderizador.render(escena,camara);
