
var CONSTRUCTOR = new Object();

CONSTRUCTOR.Torre=function(textura){
    THREE.Mesh.call(this);
    
    var puntos=[];

    puntos.push(new THREE.Vector2(0,0));
    puntos.push(new THREE.Vector2(20,0));
    puntos.push(new THREE.Vector2(20,10));
    puntos.push(new THREE.Vector2(15,10));
    puntos.push(new THREE.Vector2(15,15));
    puntos.push(new THREE.Vector2(10,15));
    puntos.push(new THREE.Vector2(10,40));
    puntos.push(new THREE.Vector2(20,40));
    puntos.push(new THREE.Vector2(20,45));
    puntos.push(new THREE.Vector2(10,45));
    puntos.push(new THREE.Vector2(10,50));
    puntos.push(new THREE.Vector2(15,50));
    puntos.push(new THREE.Vector2(15,60));
    puntos.push(new THREE.Vector2(0,60));
    //puntos.push(new THREE.Vector2(0,0));

    var baseForma= new THREE.LatheGeometry(puntos);
    var baseMalla = new THREE.Mesh(baseForma);

    var torreForma= new THREE.Geometry();

    torreForma.merge(baseMalla.geometry, baseMalla.matrix);

    for(var i=0; i<=6; i++){
    var picoForma = new THREE.CylinderGeometry( 4, 2, 15, 32 );
      picoForma.translate(13*(Math.sin(Math.PI*2/6*i)),60,13*(Math.cos(Math.PI*2/6*i)));
    var picoMalla =new THREE.Mesh(picoForma); 
      torreForma.merge(picoMalla.geometry, picoMalla.matrix);
    }
    

    var material = new THREE.MeshNormalMaterial();
    this.geometry = torreForma;
    
}

CONSTRUCTOR.Torre.prototype=new THREE.Mesh();

function Tablero(){
    
    var color=0;
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        var cuboForma=  new THREE.BoxGeometry(10,10,5);
        cuboForma.translate(-35+i*10,35-j*10,0);
        if(color%2===0){
          var material = new THREE.MeshBasicMaterial({color: 0xffffff});
        }else{
          var material = new THREE.MeshBasicMaterial({color: 0x888888});
        }
        var cuboMalla = new THREE.Mesh(cuboForma,material);
        color=color+1;
        cuboMalla.rotateX(-Math.PI/2);
        CONSTRUCTOR.escena.add(cuboMalla);
      }
      color=color+1;
    }


    var bordeForma = new THREE.BoxGeometry(100,100,5);
    bordeForma.translate(0,0,-5);
    var bordeMaterial = new THREE.MeshBasicMaterial({color: 0x6b4c1f});
    var bordeMalla = new THREE.Mesh(bordeForma,bordeMaterial);
    bordeMalla.rotateX(-Math.PI/2);
    CONSTRUCTOR.escena.add(bordeMalla);
}


var torre1 = new CONSTRUCTOR.Torre();

CONSTRUCTOR.setup = function(){
  
  torre1.position.x=-5;
  
  
  CONSTRUCTOR.camara = new THREE.PerspectiveCamera();
  CONSTRUCTOR.camara.position.z = 200;
  CONSTRUCTOR.camara.position.y = 200;
  CONSTRUCTOR.camara.lookAt(new THREE.Vector3(0,0,0));
  var lienzo = document.getElementById("tablero");
  CONSTRUCTOR.renderizador = new THREE.WebGLRenderer({canvas: lienzo, antialias: true});
  
  CONSTRUCTOR.renderizador.setSize(600,600);
  
  CONSTRUCTOR.escena = new THREE.Scene();
  Tablero();
  CONSTRUCTOR.escena.add(torre1.malla);
  
}

CONSTRUCTOR.loop = function(){
  requestAnimationFrame( CONSTRUCTOR.loop);
  torre1.malla.rotateY(0.01);
  CONSTRUCTOR.renderizador.render(CONSTRUCTOR.escena, CONSTRUCTOR.camara);
}

CONSTRUCTOR.setup();
CONSTRUCTOR.loop();
