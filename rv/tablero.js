var tableroForma = new THREE.Geometry();
var color=0;
// var escena = new THREE.Scene();

for(var i=0;i<8;i++){
  for(var j=0;j<8;j++){
    var cuboForma=  new THREE.BoxGeometry(10,10,5);
    cuboForma.translate(-35+i*10,35-j*10,0);
    if(color%2==0){
    var materialCubo = new THREE.MeshLambertMaterial({color: 0x888888});
    }else{
    var materialCubo = new THREE.MeshLambertMaterial({color: 0xffffff});
    }
    var cuboMalla = new THREE.Mesh(cuboForma,materialCubo);
    color=color+1;
    cuboMalla.receiveShadow=true;
    escena.add(cuboMalla);
  }
  color=color+1;
}

/*
var  cuboForma = new Array(8);
var  materialCubo= new Array(8);
var  cuboMalla = new Array(8);

for(var i=0;i<8;i++){
  cuboForma[i]=new Array(8);
  materialCubo[i]=new Array(8);
  cuboMalla[i]=new Array(8);
  for(var j=0;j<8;j++){
    cuboForma[i][j]=  new THREE.BoxGeometry(10,10,5);
    cuboForma[i][j].translate(-35+i*10,35-j*10,0);
    if(color%2==0){
    materialCubo[i][j] = new THREE.MeshBasicMaterial({color: 0x888888});
    }else{
    materialCubo[i][j] = new THREE.MeshBasicMaterial({color: 0xffffff});
    }
    cuboMalla[i][j] = new THREE.Mesh(cuboForma,materialCubo);
    color=color+1;
  }
  color=color+1;
}
*/

var bordeForma = new THREE.BoxGeometry(100,100,5);
bordeForma.translate(0,0,-5);
var bordeMaterial = new THREE.MeshBasicMaterial({color: 0x6b4c1f});
var bordeMalla = new THREE.Mesh(bordeForma,bordeMaterial);
bordeMalla.castShadow=true;
bordeMalla.receiveShadow=true;

escena.add(bordeMalla);

/*
var camara = new THREE.PerspectiveCamera();
camara.position.x=0;
camara.position.y=-100;
camara.position.z=100;
camara.lookAt(new THREE.Vector3(0,0,0));

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement);
renderizador.render(escena,camara);
*/
