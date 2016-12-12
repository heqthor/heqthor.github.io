function Torre(textura){ 
    Agent.call(this);
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
    
    //THREE.Mesh.call(this, torreForma, new THREE.MeshLambertMaterial({map:textura}));
    this.add(new THREE.Mesh(torreForma, new THREE.MeshLambertMaterial({map:textura})));
    this.castShadow=true;
    this.receiveShadow=true;
    
    this.step = 0.1;
    this.colision = 0;
    this.radius = 4;
    this.sensor = new THREE.Raycaster(this.position, new THREE.Vector3(1,0,0)); //vector para detectar colisiones
    this.pie1= new THREE.Mesh(new THREE.BoxGeometry(10,10,30),new THREE.MeshBasicMaterial({color: 0xff0000}));
    this.pie2= new THREE.Mesh(new THREE.BoxGeometry(10,10,30),new THREE.MeshBasicMaterial({color: 0xff0000}));
    this.pie1.position.x=15;
    this.pie2.position.x=-15;

    this.add(this.pie1,this.pie2);
    if(textura===TEXTURAS.torreBlanca){
	    this.team=1;
	    this.pie1.position.z=10;
	    this.pie2.position.z=10;
    }
    else if(textura===TEXTURAS.torreNegra){
	    this.team=0;
	    this.pie1.position.z=-10;
	    this.pie2.position.z=-10;
    }
}
Torre.prototype=new Agent();
var movimiento=0;



//------------ TABLERO------
function Tablero (texturaBlanco, texturaNegro,texturaMadera){
    var color=0;
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        var cuboForma=  new THREE.BoxGeometry(10,5,10);
        cuboForma.translate(-35+i*10,0,35-j*10);
        if(color%2!==0){
          var material = new THREE.MeshLambertMaterial({map:texturaNegro});
        }else{
          var material = new THREE.MeshLambertMaterial({map: texturaBlanco});
        }
        var cuboMalla = new THREE.Mesh(cuboForma,material);
        color=color+1;
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


	
	
var torreN1,reyB;
var tablero=[];
var tabCol=[];
var turno=true;
//---------- SET UP--------
function setup(){
    var tipo_evento = 'resize';
    var cambioVentana = false;

    window.addEventListener( tipo_evento, listener, cambioVentana);
    
    camara.position.x = 100;    
    camara.position.y = 200;
    camara.position.z = 100;
    camara.lookAt(new THREE.Vector3(0,0,0));
    
    setupDone=true;
    
    var luz=new THREE.PointLight(0xCCCCCC);
    luz.position.y=50;
    luz.position.z=100;
    
    
    	torreN1 =new Torre(TEXTURAS.torreNegra);
	torreN1.scale.x=0.15;
	torreN1.scale.y=0.15;
	torreN1.scale.z=0.15;
	torreN1.position.y=5;
	torreN1.position.x=35;
	torreN1.position.z=35;
	torreN1.castShadow=true;
	torreN1.receiveShadow=true;
	tablero[7][7]=torreN1;


	escena.add(torreN1);
	escena.add(luz);
	Tablero(TEXTURAS.marmolNegro, TEXTURAS.marmolBlanco, TEXTURAS.madera);

	renderizador.setSize( window.innerWidth , window.innerHeight );
	document.body.appendChild( renderizador.domElement );
}

var setupDone=false;

function loop(){
  requestAnimationFrame(loop);
  if(TEXTURAS.madera!==undefined && TEXTURAS.torreBlanca!==undefined && TEXTURAS.marmolBlanco!==undefined && TEXTURAS.marmolNegro!==undefined && !setupDone){
      setup();
  }
    escena.sense();
    escena.plan();
    escena.act();
    renderizador.render(escena, camara);
}

var cargador = new THREE.TextureLoader();
function TexturaSetup(){
    cargador.load("texturaMarmolNegro.jpg",
                  function(textura){ TEXTURAS.torreNegra = textura;});
    cargador.load("texturaMarmolBlanco.jpg",
                  function(textura){ TEXTURAS.torreBlanca = textura;});
    cargador.load("texturaMarmolBlanco.jpg",
                  function(textura){ TEXTURAS.marmolBlanco = textura;});
    cargador.load("texturaMarmolNegro.jpg",
                  function(textura){ TEXTURAS.marmolNegro = textura;});
    cargador.load("texturaMadera.jpg",
                  function(textura){ TEXTURAS.madera = textura;});
    
}
var piezaTocada=new THREE.Object3D;
var m,xBef,zBef;
var banderaEvento=0;



//-----------------------------------------------------------------------------------------------------------------RAY
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var cubo=new THREE.Object3D();
function onMouseClick( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	var piezaX, piezaZ,tableX,tableZ;
	mouse.x = ( event.clientX / window.innerWidth ) *2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) *2 + 1;	
	//mouse.z = - ( event.clientZ / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camara );	
	var intersects = raycaster.intersectObjects( escena.children,true );
	if(intersects[0].point.y>=5 && !(intersects[0].object.parent instanceof Planos)){
		//intersects[ 0 ].object.material.color.set( 0xff0000 );
		piezaX=Redondeo(intersects[0].point.x);
		piezaZ=Redondeo(intersects[0].point.z);
		piezaTocada=tablero[(piezaX+35)/10][(piezaZ+35)/10];
	

		
	}else if(  movimiento==1){
		movimiento=0;			
		tableX=Redondeo(intersects[0].point.x);
		tableZ=Redondeo(intersects[0].point.z);
		Mueve(tableX,tableZ,piezaTocada);
	}
	
	
	console.log('wubba lubba dub dub');
}
 
function Redondeo(coor){
	if(coor>=-40 && coor<-30)
		coor=-35;
	else if(coor>=-30 && coor<-20)
		coor=-25;
	else if(coor>=-20 && coor<-10)
		coor=-15;
	else if(coor>=-10 && coor<0)
		coor=-5;
	else if(coor>=0 && coor<10)
		coor=5;
	else if(coor>=10 && coor<20)
		coor=15;
	else if(coor>=20 && coor<30)
		coor=25;
	else if(coor>=30 && coor<40)
		coor=35;
	return coor;
}


window.addEventListener( 'mousedown', onMouseClick, false );


function Mueve(x,y,pieza){
	
	var m=0;
		pieza.position.x=1*x;
		pieza.position.z=1*y;
		if(tablero[(x+35)/10][(y+35)/10]!==null ){
			var lugarOcu=new THREE.Object3D();
			lugarOcu=tablero[(x+35)/10][(y+35)/10];
			lugarOcu.position.y=5000;
			tablero[(x+35)/10][(y+35)/10]=null;
		}
		tablero[(x+35)/10][(y+35)/10]=pieza;
	
}
	

var TEXTURAS= new THREE.Object3D();
var escena = new Environment();
var camara = new THREE.PerspectiveCamera();
var renderizador = new THREE.WebGLRenderer();
TexturaSetup();
loop();
