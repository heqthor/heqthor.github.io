var Torre=function(textura){    
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
    
    THREE.Mesh.call(this, torreForma, new THREE.MeshLambertMaterial({map:textura}));
    this.castShadow=true;
    this.receiveShadow=true;
}
Torre.prototype=new Agent();


//------------PEON----------
var Peon=function(textura){    
    var puntospeon=[];
    
    puntospeon.push( new THREE.Vector2(0,0));
    puntospeon.push( new THREE.Vector2(20,0));
    puntospeon.push( new THREE.Vector2(20,10));
    puntospeon.push( new THREE.Vector2(15,10));
    puntospeon.push( new THREE.Vector2(15,15));
    puntospeon.push( new THREE.Vector2(10,15));
    puntospeon.push( new THREE.Vector2(5,25));
    puntospeon.push( new THREE.Vector2(5,35));
    puntospeon.push( new THREE.Vector2(15,35));
    puntospeon.push( new THREE.Vector2(0,40));

    var basePeonForma= new THREE.LatheGeometry(puntospeon);
    var basePeonMalla = new THREE.Mesh(basePeonForma);

    var peonForma= new THREE.Geometry();

    peonForma.merge(basePeonMalla.geometry, basePeonMalla.matrix);

    var puntaPeonForma = new THREE.SphereGeometry(10);
    puntaPeonForma.translate(0,45,0);
    var puntaPeonMalla =new THREE.Mesh(puntaPeonForma); 
    peonForma.merge(puntaPeonMalla.geometry, puntaPeonMalla.matrix);
        
    THREE.Mesh.call(this, peonForma, new THREE.MeshLambertMaterial({map:textura}));
    this.castShadow=true;
    this.receiveShadow=true;
    
}
Peon.prototype=new Agent();


//------------REY-----------
var Rey=function(textura){    
    var puntosrey=[];
    
    puntosrey.push( new THREE.Vector2(0,0));
    puntosrey.push( new THREE.Vector2(20,0));
    puntosrey.push( new THREE.Vector2(20,10));
    puntosrey.push( new THREE.Vector2(15,10));
    puntosrey.push( new THREE.Vector2(15,15));
    puntosrey.push( new THREE.Vector2(10,15));
    puntosrey.push( new THREE.Vector2(5,60));
    puntosrey.push( new THREE.Vector2(20,60));
    puntosrey.push( new THREE.Vector2(20,65));
    puntosrey.push( new THREE.Vector2(10,65));
    puntosrey.push( new THREE.Vector2(10,70));
    puntosrey.push( new THREE.Vector2(15,70));
    puntosrey.push( new THREE.Vector2(15,80));
    puntosrey.push( new THREE.Vector2(10,80));
    puntosrey.push( new THREE.Vector2(20,100));
    puntosrey.push( new THREE.Vector2(0,100));
    
    var baseRey= new THREE.LatheGeometry(puntosrey);
    var baseReyMalla= new THREE.Mesh( baseRey);
    
    var reyForma= new THREE.Geometry();

    reyForma.merge(baseReyMalla.geometry, baseReyMalla.matrix);
    
    var vertical= new THREE.BoxGeometry(10,20,10);
    vertical.translate(0,110,0);
    var verticalMalla= new THREE.Mesh(vertical);
    reyForma.merge(verticalMalla.geometry, verticalMalla.matrix);
    
    var horizontal= new THREE.BoxGeometry(20,10,10);
    horizontal.translate(0,110,0);
    var horizontalMalla= new THREE.Mesh(horizontal);
    reyForma.merge(horizontalMalla.geometry, horizontalMalla.matrix);
    
    THREE.Mesh.call(this, reyForma, new THREE.MeshLambertMaterial({map:textura}));
    this.castShadow=true;
    this.receiveShadow=true;
    
}

Rey.prototype=new Agent();



//------------ TABLERO------
var Tablero = function (texturaBlanco, texturaNegro,texturaMadera){
    var color=0;
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        var cuboForma=  new THREE.BoxGeometry(10,10,5);
        cuboForma.translate(-35+i*10,35-j*10,0);
        if(color%2===0){
          var material = new THREE.MeshLambertMaterial({map:texturaNegro});
        }else{
          var material = new THREE.MeshLambertMaterial({map: texturaBlanco});
        }
        var cuboMalla = new THREE.Mesh(cuboForma,material);
        color=color+1;
        cuboMalla.rotateX(-Math.PI/2);
        cuboMalla.rotateZ(-Math.PI/2);
          cuboMalla.receiveShadow=true;
        escena.add(cuboMalla);
      }
      color=color+1;
    }

    var bordeForma = new THREE.BoxGeometry(100,100,5);
    bordeForma.translate(0,0,-5);
    var bordeMaterial = new THREE.MeshLambertMaterial({map:texturaMadera});
    var bordeMalla = new THREE.Mesh(bordeForma,bordeMaterial);
    bordeMalla.rotateX(-Math.PI/2);
    bordeMalla.receiveShadow=true;
    escena.add(bordeMalla);
}

//------------ FUNCION CAMBIO VENTANA-----
function listener(){
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();
  renderizador.setSize( window.innerWidth, window.innerHeight );
}

//---------- SET UP--------
function setup(){
    var tipo_evento = 'resize';
    var cambioVentana = false;
    window.addEventListener( tipo_evento, listener, cambioVentana);
    
    escena=new Environment();
    camara = new THREE.PerspectiveCamera();
    camara.position.z = 30;
    
    setupDone=true;
    
    var luz=new THREE.PointLight(0xCCCCCC);
    luz.position.y=50;
    luz.position.z=100;
    
    var torre = new Agent.Torre(torreNegra);
    
    escena.add(torre);
    escena.add(luz);
  
}

var setupDone=false;

function loop(){
  requestAnimationFrame(loop);
  if(madera!==undefined && torreBlanca!==undefined && marmolBlanco!==undefined && marmolNegro!==undefined && !setupDone){
      setup();
  }
   renderizador.render(escena, camara);
}

var TexturaSetup= function(){
    var cargador = new THREE.TextureLoader();
    cargador.load("texturaMarmolNegro.jpg",
                  function(textura){ var torreNegra = textura;});
    cargador.load("texturaMarmolBlanco.jpg",
                  function(textura){ var torreBlanca = textura;});
    cargador.load("texturaMarmolBlanco.jpg",
                  function(textura){ var marmolBlanco = textura;});
    cargador.load("texturaMarmolNegro.jpg",
                  function(textura){ var marmolNegro = textura;});
    cargador.load("texturaMadera.jpg",
                  function(textura){ var madera = textura;});
    
}
    

TexturaSetup();
loop();
