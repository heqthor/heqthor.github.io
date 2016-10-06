function Torre(){
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
    puntos.push(new THREE.Vector2(0,0));

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
    this.malla = new THREE.Mesh(torreForma,material);
}



var CONSTRUCTOR = new Object();


CONSTRUCTOR.setup = function(){
  var torre1 = new Torre();
  
  torre1.malla.position.x=-5;
  
  
  CONSTRUCTOR.camara = new THREE.PerspectiveCamera();
  CONSTRUCTOR.camara.position.z = 20;
  
  var lienzo = document.getElementById("ejemplo-constructor");
  CONSTRUCTOR.renderizador = new THREE.WebGLRenderer({canvas: lienzo, antialias: true});
  
  CONSTRUCTOR.renderizador.setSize(600,600);
  
  CONSTRUCTOR.escena = new THREE.Scene();
  CONSTRUCTOR.escena.add(torre1.malla);
  
}

CONSTRUCTOR.loop = function(){
  requestAnimationFrame( CONSTRUCTOR.loop);
  
  CONSTRUCTOR.renderizador.render(CONSTRUCTOR.escena, CONSTRUCTOR.camara);
}

CONSTRUCTOR.setup();
CONSTRUCTOR.loop();