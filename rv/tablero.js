var tableroForma = new THREE.Geometry();
var color=0;
var cuboForma = new THREE.BoxGeometry(10,10,5);

var escena = new THREE.Scene();

for(var i=0;i<=8;i++){
  for(var j=0;j<=8;j++){
    cuboForma.translate(-35+i*10,35-j*10,0);
    if(color%2==0){
    var materialCubo = new THREE.MeshBasicMaterial({color: 0x888888});
    }else{
    var materialCubo = new THREE.MeshBasicMaterial({color: 0xffffff});
    }
    var cuboMalla = new THREE.Mesh(cuboForma,materialCubo);
    escena.add(cuboMalla);
    color=color+1;
  }
}


var camara = new THREE.PerspectiveCamera();
camara.position.z=200;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);
renderizador.render(escena,camara);
