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
}
Torre.prototype=new Agent();
var movimiento=0;
function Torreplan(pieza){
	var lugarOcupado=new THREE.Raycaster(new THREE.Vector3(0,0,0), new THREE.Vector3(1,0,0));
	var tablero=new Array(8);
	for(var i=0;i<=7;i++){
		tablero[i]=new Array(8);
		for(var j=0;j<=7;j++){
			lugarOcupado.set(new THREE.Vector3(-35+10*j,5.1,-35+10*i),
					 new THREE.Vector3(0,1,0));
			tablero[i][j]=lugarOcupado.intersectObjects(escena.children,true);
		}
	}
	console.log(tablero);
	
	movimiento=1;
}



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
var torreN1;
//---------- SET UP--------
function setup(){
    var tipo_evento = 'resize';
    var cambioVentana = false;
	var cubito=new THREE.Mesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshBasicMaterial());
	cubito.position.y=5;
	escena.add(cubito);
	
    window.addEventListener( tipo_evento, listener, cambioVentana);
    
    camara.position.x = 100;    
    camara.position.y = 100;
    camara.position.z = 100;
    camara.lookAt(new THREE.Vector3(0,0,0));
    
    setupDone=true;
    
    var luz=new THREE.PointLight(0xCCCCCC);
    luz.position.y=50;
    luz.position.z=100;
    
    
    torreN1 =new Torre(TEXTURAS.torreNegra);
    torreN1.scale.x=0.2;
    torreN1.scale.y=0.2;
    torreN1.scale.z=0.2;
    torreN1.position.y=5;
    torreN1.position.x=37.5;
    torreN1.position.z=37.5;
    torreN1.castShadow=true;
    torreN1.receiveShadow=true;
    
    var torreN2 = new Torre(TEXTURAS.torreNegra);
    torreN2.scale.x=0.2;
    torreN2.scale.y=0.2;
    torreN2.scale.z=0.2;
    torreN2.position.y=5;
    torreN2.position.x=-32.5;
    torreN2.position.z=37.5;
    
    var torreB1 = new Torre(TEXTURAS.torreBlanca);
    torreB1.scale.x=0.2;
    torreB1.scale.y=0.2;
    torreB1.scale.z=0.2;
    torreB1.position.y=5;
    torreB1.position.x=-32.5;
    torreB1.position.z=-32.5;
    
    var torreB2 = new Torre(TEXTURAS.torreBlanca);
    torreB2.scale.x=0.2;
    torreB2.scale.y=0.2;
    torreB2.scale.z=0.2;
    torreB2.position.y=5;
    torreB2.position.x=37.5;
    torreB2.position.z=-32.5;
    
    escena.add(torreN1);
    escena.add(torreN2);
    escena.add(torreB1);
    escena.add(torreB2);
    escena.add(luz);
    Tablero(TEXTURAS.marmolNegro, TEXTURAS.marmolBlanco, TEXTURAS.madera);
    
    renderizador.setSize( window.innerWidth , window.innerHeight );
    document.body.appendChild( renderizador.domElement );
    xGoal=torreN1.position.x;
    zGoal=torreN1.position.z;
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

function TexturaSetup(){
    var cargador = new THREE.TextureLoader();
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
var xGoal=0;
var zGoal=0;
var m,xBef,zBef;
var banderaEvento=0;
//------------- EVENTOS TECLADO-----------
var keyDown = function(event){
    /*switch(event.keyCode){
        case 97: //a
        case 65: //A
            xGoal=-0.1;
            break;
        case 83: //s
            zGoal=0.1;
            break;
        case 68:
            xGoal=0.1;
            break;
        case 87:
            zGoal=-0.1;
            break;
                        }*/
    if(banderaEvento==0){
        switch(event.keyCode){
            case 97: //a
            case 65: //A
                xGoal=-35;
                break;
            case 98: //b
            case 66: //B
                xGoal=-25;
                break;
            case 99:
            case 67:
                xGoal=-15;
                break;
            case 100:
            case 68:
                xGoal=-5;
                break;
            case 101:
            case 69:
                xGoal=5;
                break;
            case 102: //f
            case 70: //F
                xGoal=15;
                break;
            case 103:
            case 71:
                xGoal=25;
                break;
            case 104: //h
            case 72: //H
                xGoal=35;
                break;
        }
        banderaEvento=2;
    }else if(banderaEvento==1){
        switch(event.keyCode){
            case 49: //1
                zGoal=-35
                break;
            case 50: //2
                zGoal=-25
                break;
            case 51: //3
                zGoal=-15
                break;
            case 52: //4
                zGoal=-5
                break;
            case 53: //5
                zGoal=5
                break;
            case 54: //6
                zGoal=15
                break;
            case 55: //7
                zGoal=25
                break;
            case 56: //8
                zGoal=35
                break;
        }
        banderaEvento=3;
    }
}
    
var keyUp = function(event){
    /*xGoal=0;
    zGoal=0;*/
    if(banderaEvento==2){
        banderaEvento=1;
    }else if(banderaEvento==3){
        banderaEvento=0;
    }
}
document.addEventListener( 'keydown', keyDown, false );
document.addEventListener( 'keyup', keyUp, false );

function movement(pieza){
    /*pieza.position.x+=xGoal;
    pieza.position.z+=zGoal;*/
    var m=(zGoal-pieza.position.z);
    if(xGoal-pieza.position.x!==0)
        m=m/(xGoal-pieza.position.x);
    var b=zGoal-m*xGoal;
    var posX,posZ;
    if(pieza.position.x!==xGoal || pieza.position.z!==zGoal){ 
        if(pieza.position.x!==xGoal){
            if(pieza.position.x<xGoal)
                pieza.position.x+=0.1;
            else
                pieza.position.x-=0.1;
            pieza.position.z=m*pieza.position.x+b;
        }else if(pieza.position.z!==zGoal){
            if(pieza.position.z<zGoal)
                pieza.position.z+=0.1;
            else
                pieza.position.z-=0.1;
            
            if(xGoal-pieza.position.x!==0)
                pieza.position.x=(pieza.position.z-b)/m;
        }else
            banderaEvento=0;
        console.log(pieza.position.x,',',pieza.position.z);
    }
}

//-----------------------------------------------------------------------------------------------------------------RAY
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseClick( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) *2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) *2 + 1;	
	//mouse.z = - ( event.clientZ / window.innerHeight ) * 2 + 1;
	//raycaster.setFromCamera( mouse, camara );	
	raycaster.set(mouse,new THREE.Vector3(0,-1,0));
	var intersects = raycaster.intersectObjects( escena.children,true );
	
	for ( var i = 0; i < intersects.length; i++ ) {
		if(intersects[i].object.parent instanceof Torre){
			intersects[ i ].object.material.color.set( 0xff0000 );
			piezaTocada=intersects[i].object;
			console.log(intersects[i].point.x,intersects[i].point.z,intersects[i].uv.x,intersects[i].uv.z,intersects[i].uv);
		}
		else{
			if(movimiento==1){
				intersects[ i ].object.material.color.set( 0x00ff00 );
				console.log(intersects[i].point.x,mouse.y);
				movimiento=0;
				Mueve(intersects[i].object.position.x,intersects[i].object.position.z,piezaTocada);
			}
		}
	
	}
	
	
	console.log('wubba lubba dub dub');	
	console.log( intersects[0].object);
	Torreplan(intersects[0].object);
}
 

window.addEventListener( 'mousedown', onMouseClick, false );

function Mueve(x,y,pieza){
	var m=0;
	
	while(Math.abs(pieza.position.x-x)>0.1 && Math.abs(pieza.position.z-y)>0.1){
		if((pieza.position.x-x)!=0){
			m=(pieza.position.z-y)/(pieza.position.x-x);
			if(Math.abs(pieza.position.x-x)>0.1 && (pieza.position.x-x)>=0)
				pieza.position.x-=0.01;
			if(Math.abs(pieza.position.x-x)>0.1 && (pieza.position.x-x)<=0)
				pieza.position.x+=0.01;
			pieza.position.z=m*pieza.position.x;
		}else{
			if(Math.abs(pieza.position.z-y)>0.1 && (pieza.position.z-y)>=0)
				pieza.position.z-=0.1;
			else if(Math.abs(pieza.position.z-y)>0.1 && (pieza.position.z-y)<=0)
				pieza.position.z+=0.1;
		}
		console.log("piezaX:",pieza.position.x,"piezaZ:",pieza.position.z);
		console.log("casillaX:",x,"casillaZ:",y);
	}
	console.log("piezaX:",pieza.position.x,"piezaZ:",pieza.position.z);
		console.log("casillaX:",x,"casillaZ:",y);
}
	

var TEXTURAS= new THREE.Object3D();
var escena = new Environment();
var camara = new THREE.PerspectiveCamera();
var renderizador = new THREE.WebGLRenderer();
TexturaSetup();
loop();











