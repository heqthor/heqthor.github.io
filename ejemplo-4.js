var escena=new THREE.Scene();

var camara= new THREE.PerspectiveCamera();
camara.position.z=5;

var renderizador = new THREE.WebGLRenderer();
renderizador.setSize(windows.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderizador.domElement); <!--interfaz a la estructura del documento y a su contenido, lo inserta en la parte body del documento-->

var forma = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshNormalMaterial();
var cubo = new THREE.Mesh(forma,material);
cubo.rotateX(-Math.PI/4);
cubo.rotateY(Math.PI/4);

renderizador.render(escena,camara);
