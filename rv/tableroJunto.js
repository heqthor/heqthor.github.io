var CONSTRUCTOR = new Object();


CONSTRUCTOR.Torre=function(textura){    
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
CONSTRUCTOR.Torre.prototype=new THREE.Mesh();


//------------PEON----------
CONSTRUCTOR.Peon=function(textura){    
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

CONSTRUCTOR.Peon.prototype=new THREE.Mesh();


//------------REY-----------
CONSTRUCTOR.Rey=function(textura){    
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

CONSTRUCTOR.Rey.prototype=new THREE.Mesh();



//------------ TABLERO------
CONSTRUCTOR.Tablero = function (texturaBlanco, texturaNegro,texturaMadera){
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
        CONSTRUCTOR.escena.add(cuboMalla);
      }
      color=color+1;
    }

    var bordeForma = new THREE.BoxGeometry(100,100,5);
    bordeForma.translate(0,0,-5);
    var bordeMaterial = new THREE.MeshLambertMaterial({map:texturaMadera});
    var bordeMalla = new THREE.Mesh(bordeForma,bordeMaterial);
    bordeMalla.rotateX(-Math.PI/2);
    bordeMalla.receiveShadow=true;
    CONSTRUCTOR.escena.add(bordeMalla);
}

//------------ FUNCION CAMBIO VENTANA-----
CONSTRUCTOR.listener = function(){
  CONSTRUCTOR.camara.aspect = window.innerWidth / window.innerHeight;
  CONSTRUCTOR.camara.updateProjectionMatrix();
  CONSTRUCTOR.renderizador.setSize( window.innerWidth, window.innerHeight );
}

//---------- SET UP--------
CONSTRUCTOR.setup = function(){
    var tipo_evento = 'resize';
    var cambioVentana = false;
    window.addEventListener( tipo_evento, CONSTRUCTOR.listener, cambioVentana);
    
    setupDone=true;
    
    var luz=new THREE.PointLight(0xCCCCCC);
    luz.position.y=50;
    luz.position.z=100;
    
    var torre1 = new CONSTRUCTOR.Torre(CONSTRUCTOR.torreBlanca);
    torre1.position.x=-35;
    torre1.position.y=2.5;
    torre1.position.z=-35;
    torre1.scale.x=0.2;
    torre1.scale.y=0.2;
    torre1.scale.z=0.2;
  
    var torre2 = new CONSTRUCTOR.Torre(CONSTRUCTOR.torreNegra);
    torre2.position.x=-35;
    torre2.position.y=2.5;
    torre2.position.z=35;
    torre2.scale.x=0.2;
    torre2.scale.y=0.2;
    torre2.scale.z=0.2;

    var torre3 = new CONSTRUCTOR.Torre(CONSTRUCTOR.torreBlanca);
    torre3.position.x=35;
    torre3.position.y=2.5;
    torre3.position.z=-35;
    torre3.scale.x=0.2;
    torre3.scale.y=0.2;
    torre3.scale.z=0.2;

    var torre4 = new CONSTRUCTOR.Torre(CONSTRUCTOR.torreNegra);
    torre4.position.x=35;
    torre4.position.y=2.5;
    torre4.position.z=35;
    torre4.scale.x=0.2;
    torre4.scale.y=0.2;
    torre4.scale.z=0.2;
    /*
    var peon1= new CONSTRUCTOR.Peon(CONSTRUCTOR.torreBlanca);
    peon1.position.x=-35;
    peon1.position.y=2.5;
    peon1.position.z=-25;
    peon1.scale.x=0.2;
    peon1.scale.y=0.2;
    peon1.scale.z=0.2;
    
    var peon2= new CONSTRUCTOR.Peon(CONSTRUCTOR.torreNegra);
    peon2.position.x=-35;
    peon2.position.y=2.5;
    peon2.position.z=25;
    peon2.scale.x=0.2;
    peon2.scale.y=0.2;
    peon2.scale.z=0.2;*/
    var peones=[];
    for(var i=0; i<=2;i++){
        peones[i]={};
        for(var j=0; j<=8;j++){
            if(i===0)
                peones[i][j]=new CONSTRUCTOR.Peon(CONSTRUCTOR.torreBlanca);
            else
                peones[i][j]=new CONSTRUCTOR.Peon(CONSTRUCTOR.torreNegra);
            peones[i][j].position.x=-50+10*j;
            peones[i][j].position.z=-40+80*i;
            peones[i][j].scale.x=0.2;
            peones[i][j].scale.y=0.2;
            peones[i][j].scale.z=0.2;
        }
    }
    
    var rey1= new CONSTRUCTOR.Rey(CONSTRUCTOR.torreBlanca);
    rey1.position.x=-5;
    rey1.position.y=2.5;
    rey1.position.z=-35;
    rey1.scale.x=0.2;
    rey1.scale.y=0.2;
    rey1.scale.z=0.2;
    
    var rey2= new CONSTRUCTOR.Rey(CONSTRUCTOR.torreNegra);
    rey2.position.x=-5;
    rey2.position.y=2.5;
    rey2.position.z=35;
    rey2.scale.x=0.2;
    rey2.scale.y=0.2;
    rey2.scale.z=0.2;

    //--------------- CAMARA ---------------
    CONSTRUCTOR.camara = new THREE.PerspectiveCamera();
    CONSTRUCTOR.camara.position.y = 100;
    CONSTRUCTOR.camara.position.x = 100;
    CONSTRUCTOR.camara.position.z = 100;
    CONSTRUCTOR.camara.lookAt(new THREE.Vector3(0,0,0));
    
    var lienzo = document.getElementById("tablero");
    CONSTRUCTOR.renderizador = new THREE.WebGLRenderer({canvas: lienzo, antialias: true});
    CONSTRUCTOR.renderizador.setSize(window.innerWidth,window.innerHeight);

    //------------ ESCENA
    CONSTRUCTOR.escena = new THREE.Scene();
    CONSTRUCTOR.Tablero(CONSTRUCTOR.marmolBlanco,CONSTRUCTOR.marmolNegro,CONSTRUCTOR.madera);
    CONSTRUCTOR.escena.add(torre1);
    CONSTRUCTOR.escena.add(torre2);
    CONSTRUCTOR.escena.add(torre3);
    CONSTRUCTOR.escena.add(torre4);
    for(var i=0;i<=1;i++){
        for(var j=0;j<=12;j++){
            CONSTRUCTOR.escena.add(peones[i][j]);
        }
    }
   // CONSTRUCTOR.escena.add(peones[1][1]);
    //CONSTRUCTOR.escena.add(peon1);
    //CONSTRUCTOR.escena.add(peon2);
    CONSTRUCTOR.escena.add(rey1);
    CONSTRUCTOR.escena.add(rey2);
    CONSTRUCTOR.escena.add(luz);
    CONSTRUCTOR.renderizador.shadowMapEnabled = true;
    luz.castShadow =true;
  
}

var setupDone=false;

CONSTRUCTOR.loop = function(){
  requestAnimationFrame( CONSTRUCTOR.loop);
  if(CONSTRUCTOR.madera!==undefined && CONSTRUCTOR.torreBlanca!==undefined && CONSTRUCTOR.marmolBlanco!==undefined && CONSTRUCTOR.marmolNegro!==undefined && !setupDone){
      CONSTRUCTOR.setup();
  }
   CONSTRUCTOR.renderizador.render(CONSTRUCTOR.escena, CONSTRUCTOR.camara);
}

CONSTRUCTOR.TexturaSetup= function(){
    var cargador = new THREE.TextureLoader();
    cargador.load("texturaMarmolNegro.jpg",
                  function(textura){ CONSTRUCTOR.torreNegra = textura;});
    cargador.load("texturaMarmolBlanco.jpg",
                  function(textura){ CONSTRUCTOR.torreBlanca = textura;});
    cargador.load("texturaMarmolBlanco.jpg",
                  function(textura){ CONSTRUCTOR.marmolBlanco = textura;});
    cargador.load("texturaMarmolNegro.jpg",
                  function(textura){ CONSTRUCTOR.marmolNegro = textura;});
    cargador.load("texturaMadera.jpg",
                  function(textura){ CONSTRUCTOR.madera = textura;});
    
}
    

CONSTRUCTOR.TexturaSetup();
CONSTRUCTOR.loop();
