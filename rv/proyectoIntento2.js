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

var tableroMovimientos=[];
for(var i=0; i<=7; i++){
	tableroMovimientos[i]=[];
	for(var j=0; j<=7; j++){
		tableroMovimientos[i][j]=0;
	}
}

function TorrePlan(x,y,team){
	x=(x+35)/10;
	y=(y+35)/10;
	
	console.log("x",x,"y",y);
	var i=x+1;
	while(i<=7){
		if(tablero[i][y]===null)
			tableroMovimientos[i][y]=1;
		else if(tablero[i][y]!==null && team!==tablero[i][y].team){
			tableroMovimientos[i][y]=1;
			i+=10;
		}else if(tablero[i][y]!==null && team===tablero[i][y].team){
			tableroMovimientos[i][y]=0;
			i+=10;
		}
		i++;
	}
	i=x-1;
	while(i>=0){
		if(tablero[i][y]===null)
			tableroMovimientos[i][y]=1;
		else if(tablero[i][y]!==null && team!==tablero[i][y].team){
			tableroMovimientos[i][y]=1;
			i-=10;
		}else if(tablero[i][y]!==null && team===tablero[i][y].team){
			tableroMovimientos[i][y]=0;
			i-=10;
		}
		i--;
	}
	var j=y+1;
	while(j<=7){
		if(tablero[x][j]===null)
			tableroMovimientos[x][j]=1;
		else if(tablero[x][j]!==null && team!==tablero[x][j].team){
			tableroMovimientos[x][j]=1;
			j+=10;
		}else if(tablero[x][j]!==null && team===tablero[x][j].team){
			tableroMovimientos[x][j]=0;
			j+=10;
		}
		j++;
	}
	j=y-1;
	while(j>=0){
		if(tablero[x][j]===null)
			tableroMovimientos[x][j]=1;
		else if(tablero[x][j]!==null && team!==tablero[x][j].team){
			tableroMovimientos[x][j]=1;
			j-=10;
		}else if(tablero[x][j]!==null && team===tablero[x][j].team){
			tableroMovimientos[x][j]=0;
			j-=10;
		}
		j--;
	}
					
}
	

//------------PEON----------
var Peon=function(textura){    
    Agent.call(this);
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
        
    //THREE.Mesh.call(this, peonForma, new THREE.MeshLambertMaterial({map:textura}));
    this.add(new THREE.Mesh(peonForma, new THREE.MeshLambertMaterial({map:textura})));
    this.castShadow=true;
	this.receiveShadow=true;
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
    this.primer=1;
    
}
Peon.prototype=new Agent();

function PeonPlan(x,y,team,primer){
	x=(x+35)/10;
	y=(y+35)/10;
	var primero=primer.primer;
	if(team===0){
		if(tablero[x][y-1]===null){
			tableroMovimientos[x][y-1]=1;
			if(primero===1){
				tableroMovimientos[x][y-2]=1;
				primer.primer=0;
			}
		}
		if( x-1>=0 && tablero[x-1][y-1]!==null && tablero[x-1][y-1].team!==team)
			tableroMovimientos[x-1][y-1]=1;
		if( x+1<=7 && tablero[x+1][y-1]!==null && tablero[x+1][y-1].team!==team)
			tableroMovimientos[x+1][y-1]=1;
	}else if(team===1){
		if(tablero[x][y+1]===null){
			if(primero===1){
				tableroMovimientos[x][y+2]=1;
				primer.primer=0;
			}
			tableroMovimientos[x][y+1]=1;
		}
		if( x-1>=0 && tablero[x-1][y+1]!==null && tablero[x-1][y+1].team!==team)
			tableroMovimientos[x-1][y+1]=1;
		if( x+1<=7 && tablero[x+1][y+1]!==null && tablero[x+1][y+1].team!==team)
			tableroMovimientos[x+1][y+1]=1;
	}
}
		


//------------REY-----------
var Rey=function(textura){ 
    Agent.call(this);
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
    
    //THREE.Mesh.call(this, reyForma, new THREE.MeshLambertMaterial({map:textura}));
    this.add(new THREE.Mesh(reyForma, new THREE.MeshLambertMaterial({map:textura})));
    this.castShadow=true;
    this.receiveShadow=true;
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

Rey.prototype=new Agent();

function ReyPlan(x,y,team){
	x=(x+35)/10;
	y=(y+35)/10;
	
	if((y-1>=0 && x-1>=0)&& (tablero[x-1][y-1]===null || tablero[x-1][y-1].team!==team))
		tableroMovimientos[x-1][y-1]=1;
	if((y-1>=0 )&& (tablero[x][y-1]===null || tablero[x][y-1].team!==team))
		tableroMovimientos[x][y-1]=1;
	if((y-1>=0 && x+1<=7)&& (tablero[x+1][y-1]===null || tablero[x+1][y-1].team!==team))
		tableroMovimientos[x+1][y-1]=1;
	if((x+1<=7)&& (tablero[x+1][y]===null || tablero[x+1][y].team!==team))
		tableroMovimientos[x+1][y]=1;
	if((y+1<=7 && x+1<=7)&& (tablero[x+1][y+1]===null || tablero[x+1][y+1].team!==team))
		tableroMovimientos[x+1][y+1]=1;
	if((y+1<=7 )&& (tablero[x][y+1]===null || tablero[x][y+1].team!==team))
		tableroMovimientos[x][y+1]=1;
	if((y+1<=7 && x-1>=0)&& (tablero[x-1][y+1]===null || tablero[x-1][y+1].team!==team))
		tableroMovimientos[x-1][y+1]=1;
	if((x-1>=0)&& (tablero[x-1][y]===null || tablero[x-1][y].team!==team))
		tableroMovimientos[x-1][y]=1;
	
	
	console.log("rey",tableroMovimientos);
}


//---------------------ALFIL

function Alfil(textura){
	Agent.call(this);
	var puntos= [];
	puntos.push( new THREE.Vector2(0,0));
	puntos.push( new THREE.Vector2(20,0));
	puntos.push( new THREE.Vector2(20,10));
	puntos.push( new THREE.Vector2(15,10));
	puntos.push( new THREE.Vector2(15,15));
	puntos.push( new THREE.Vector2(10,15));
	puntos.push( new THREE.Vector2(5,60));
	puntos.push( new THREE.Vector2(20,60));
	puntos.push( new THREE.Vector2(25,65));
	puntos.push( new THREE.Vector2(5,65));
	puntos.push( new THREE.Vector2(5,70));
	puntos.push( new THREE.Vector2(15,70));
	puntos.push( new THREE.Vector2(15,77));
	puntos.push( new THREE.Vector2(25,80));
	puntos.push( new THREE.Vector2(0,80));

	var puntos2=[];

	for ( var i = 0; i < 47; i ++ ) {	
		puntos2.push( new THREE.Vector2( Math.sin(i*0.05 -40) * 25, i));	
	}
	var baseAlfil= new THREE.LatheGeometry(puntos);
	var baseAlfilMalla= new THREE.Mesh(baseAlfil);
	var gorroAlfil= new THREE.LatheGeometry(puntos2);
	gorroAlfil.translate(0,80,0);
	var gorroAlfilMalla= new THREE.Mesh(gorroAlfil);

	var puntitaAlfil = new THREE.SphereGeometry( 5 );
	puntitaAlfil.translate(0,130,0);
	var puntitaAlfilMalla= new THREE.Mesh(puntitaAlfil);
	var Alfil= new THREE.Geometry();

	Alfil.merge(baseAlfilMalla.geometry, baseAlfilMalla.matrix);
	Alfil.merge(gorroAlfilMalla.geometry, gorroAlfilMalla.matrix);
	Alfil.merge(puntitaAlfilMalla.geometry, puntitaAlfilMalla.matrix);
	var material= new THREE.MeshLambertMaterial({map:textura});
	this.add( new THREE.Mesh(Alfil, material));
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
Alfil.prototype=new Agent();

function AlfilPlan(x,y,team){
	x=(x+35)/10;
	y=(y+35)/10;
	
	var i=x-1;
	var j=y-1;
	while(i>=0 && j>=0){
		if(tablero[i][j]===null)
			tableroMovimientos[i][j]=1;
		else if(tablero[i][j].team!==team){
			tableroMovimientos[i][j]=1;
			i-=10;
			j-=10;
		}else if(tablero[i][j].team===team){
			i-=10;
			j-=10;
		}
		i--;
		j--;
	}
	
	i=x+1;
	j=y-1;
	while(i<=7 && j>=0){
		if(tablero[i][j]===null)
			tableroMovimientos[i][j]=1;
		else if(tablero[i][j].team!==team){
			tableroMovimientos[i][j]=1;
			i+=10;
			j-=10;
		}else if(tablero[i][j].team===team){
			i+=10;
			j-=10;
		}
		i++;
		j--;
	}
		
	i=x+1;
	j=y+1;
	while(i<=7 && j<=7){
		if(tablero[i][j]===null)
			tableroMovimientos[i][j]=1;
		else if(tablero[i][j].team!==team){
			tableroMovimientos[i][j]=1;
			i+=10;
			j+=10;
		}else if(tablero[i][j].team===team){
			i+=10;
			j+=10;
		}
		i++;
		j++;
	}
	
	i=x-1;
	j=y+1;
	while(i>=0 && j<=7){
		if(tablero[i][j]===null)
			tableroMovimientos[i][j]=1;
		else if(tablero[i][j].team!==team){
			tableroMovimientos[i][j]=1;
			i-=10;
			j+=10;
		}else if(tablero[i][j].team===team){
			i-=10;
			j+=10;
		}
		i--;
		j++;
	}
}

function Planos(){
	Agent.call(this);
	this.add(new THREE.Mesh( new THREE.PlaneGeometry( 10, 10, 32 ), 
						 new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} )));
}

Planos.prototype=new Agent();


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

//--------------------------------ANIMACION
var animar=0;
var aniX;
var aniY;
var angulo=0,incre=0.1;
function Animar(pieza){
	if(pieza.position.x!==aniX || pieza.position.z!==aniY){
		if(Math.abs(pieza.position.x-aniX)<=0.1)
			pieza.position.x=aniX;
		else
			if(pieza.position.x-aniX>0)
				pieza.position.x-=0.1;
			else 
				pieza.position.x+=0.1;

		if(Math.abs(pieza.position.z-aniY)<=0.1)
			pieza.position.z=aniY;
		else
			if(pieza.position.z-aniY>0)
				pieza.position.z-=0.1;
			else
				pieza.position.z+=0.1;
		if(Math.abs(angulo)>1)
			incre=-incre;
		pieza.pie1.rotateX(angulo);
		pieza.pie2.rotateX(-angulo);
		angulo+=incre;
		console.log("posicion",pieza.position.x, pieza.position.z);
	}else 
		animar=0;
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
    
    for(var i=0;  i<=7; i++){
	    tablero[i]=[];
	    for(var j=0; j<=7; j++){
		    tablero[i][j]=null;
	    }
    }
	
	for(var i=0; i<=7; i++){
		tabCol[i]=[];
		for(var j=0; j<=7; j++){
			var plane= new Planos();
			plane.position.x=i*10-35;
			plane.position.z=j*10-35;
			plane.position.y=500;
			plane.rotateX(Math.PI/2);
			tabCol[i][j]=plane;
			escena.add(plane);
		}
	}
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


	var torreN2 = new Torre(TEXTURAS.torreNegra);
	torreN2.scale.x=0.15;
	torreN2.scale.y=0.15;
	torreN2.scale.z=0.15;
	torreN2.position.y=5;
	torreN2.position.x=-35;
	torreN2.position.z=35;	
	tablero[0][7]=torreN2;

	var torreB1 = new Torre(TEXTURAS.torreBlanca);
	torreB1.scale.x=0.15;
	torreB1.scale.y=0.15;
	torreB1.scale.z=0.15;
	torreB1.position.y=5;
	torreB1.position.x=-35;
	torreB1.position.z=-35;	
	tablero[0][0]=torreB1;

	var torreB2 = new Torre(TEXTURAS.torreBlanca);
	torreB2.scale.x=0.15;
	torreB2.scale.y=0.15;
	torreB2.scale.z=0.15;
	torreB2.position.y=5;
	torreB2.position.x=35;
	torreB2.position.z=-35;		
	tablero[7][0]=torreB2;

	reyB=new Rey(TEXTURAS.torreBlanca);
	reyB.scale.x=0.2;
	reyB.scale.y=0.2;
	reyB.scale.z=0.2;
	reyB.position.y=5;
	reyB.position.x=5;
	reyB.position.z=-35;	
	tablero[3][0]=reyB;

	var reyN=new Rey(TEXTURAS.torreNegra);
	reyN.scale.x=0.2;
	reyN.scale.y=0.2;
	reyN.scale.z=0.2;
	reyN.position.y=5;
	reyN.position.x=5;
	reyN.position.z=35;	
	tablero[3][7]=reyN;

	    for(var i=0; i<=7; i++){
		    var peon=new Peon(TEXTURAS.torreBlanca);
		    peon.position.x=i*10-35;
		    peon.position.z=-25;
		    peon.position.y=5;
		    peon.scale.x=0.15;
		    peon.scale.y=0.15;
		    peon.scale.z=0.15;
		    escena.add(peon);
		    tablero[i][1]=peon;
	    }
	    for(var i=0; i<=7; i++){
		    var peon=new Peon(TEXTURAS.torreNegra);
		    peon.position.x=i*10-35;
		    peon.position.z=25;
		    peon.position.y=5;
		    peon.scale.x=0.15;
		    peon.scale.y=0.15;
		    peon.scale.z=0.15;
		    escena.add(peon);
		    tablero[i][6]=peon;
	    }
	
	var alfilB1=new Alfil(TEXTURAS.torreBlanca);
	alfilB1.scale.x=0.10;
	alfilB1.scale.y=0.15;
	alfilB1.scale.z=0.10;
	alfilB1.position.x=-15;
	alfilB1.position.z=-35;
	alfilB1.position.y=5;
	tablero[2][0]=alfilB1;
	
	var alfilB2=new Alfil(TEXTURAS.torreBlanca);
	alfilB2.scale.x=0.10;
	alfilB2.scale.y=0.15;
	alfilB2.scale.z=0.10;
	alfilB2.position.x=15;
	alfilB2.position.z=-35;
	alfilB2.position.y=5;
	tablero[5][0]=alfilB2;
	
	var alfilN1=new Alfil(TEXTURAS.torreNegra);
	alfilN1.scale.x=0.10;
	alfilN1.scale.y=0.15;
	alfilN1.scale.z=0.10;
	alfilN1.position.x=-15;
	alfilN1.position.z=35;
	alfilN1.position.y=5;
	tablero[2][7]=alfilN1;
	
	var alfilN2=new Alfil(TEXTURAS.torreNegra);
	alfilN2.scale.x=0.10;
	alfilN2.scale.y=0.15;
	alfilN2.scale.z=0.10;
	alfilN2.position.x=15;
	alfilN2.position.z=35;
	alfilN2.position.y=5;
	tablero[5][7]=alfilN2;
	
	escena.add(alfilB1);
	escena.add(alfilB2);
	escena.add(alfilN1);
	escena.add(alfilN2);
	escena.add(torreN1);
	escena.add(torreN2);
	escena.add(torreB1);
	escena.add(torreB2);
	escena.add(reyB);
	escena.add(reyN);
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
    if(animar===1)
	    Animar(piezaTocada);
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
		ResetMoves();
		Descoloreo();
		//intersects[ 0 ].object.material.color.set( 0xff0000 );
		piezaX=Redondeo(intersects[0].point.x);
		piezaZ=Redondeo(intersects[0].point.z);
		piezaTocada=tablero[(piezaX+35)/10][(piezaZ+35)/10];
		if((turno===true && piezaTocada.team===1) || (turno===false && piezaTocada.team===0)){
			movimiento=1;
			if(piezaTocada instanceof Torre)
				TorrePlan(piezaX,piezaZ,piezaTocada.team);		
			else if(piezaTocada instanceof Rey)
				ReyPlan(piezaX,piezaZ,piezaTocada.team);
			else if(piezaTocada instanceof Peon)
				PeonPlan(piezaX,piezaZ,piezaTocada.team,piezaTocada);
			else if(piezaTocada instanceof Alfil)
				AlfilPlan(piezaX,piezaZ,piezaTocada.team);
			Coloreo();

			console.log(piezaX,piezaZ);
		}
	}else if( (intersects[0].object.parent instanceof Planos || intersects[1].object.parent instanceof Planos) && movimiento==1){
		movimiento=0;			
		tableX=Redondeo(intersects[0].point.x);
		tableZ=Redondeo(intersects[0].point.z);
		console.log("plano",tableX,tableZ);
		Mueve(tableX,tableZ,piezaTocada);
	}
	
	
	console.log('wubba lubba dub dub');	
	console.log( intersects[0].object);
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

function Coloreo(){
	for(var i=0; i<=7; i++){
		for(var j=0; j<=7; j++){
			if(tableroMovimientos[i][j]===1){
				tabCol[i][j].position.y=5.1;
			}
		}
	}
}

function Descoloreo(){
	for(var i=0; i<=7; i++){
		for(var j=0; j<=7; j++){
			tabCol[i][j].position.y=500;
		}
	}
}
							 
function ResetMoves(){
	for(var i=0; i<=7;i++){
		for(var j=0; j<=7; j++){
			tableroMovimientos[i][j]=0;
		}
	}
}

function Mueve(x,y,pieza){
	Descoloreo();
	var m=0;
	if(tableroMovimientos[(x+35)/10][(y+35)/10]===1){
		tablero[(pieza.position.x+35)/10][(pieza.position.z+35)/10]=null;
		//pieza.position.x=1*x;
		//pieza.position.z=1*y;
		if(tablero[(x+35)/10][(y+35)/10]!==null ){
			var lugarOcu=new THREE.Object3D();
			lugarOcu=tablero[(x+35)/10][(y+35)/10];
			lugarOcu.position.y=5000;
			tablero[(x+35)/10][(y+35)/10]=null;
		}
		tablero[(x+35)/10][(y+35)/10]=pieza;
	}
	for(var i=0; i<=7; i++){
		for(var j=0; j<=7; j++){
			tableroMovimientos[i][j]=0;
		}
	}
	turno=!turno;
	animar=1;
	aniX=x;
	aniY=y;
	//delete pieza;
	/*while(Math.abs(pieza.position.x-x)>0.1 && Math.abs(pieza.position.z-y)>0.1){
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
	}*/
	
	
}
	

var TEXTURAS= new THREE.Object3D();
var escena = new Environment();
var camara = new THREE.PerspectiveCamera();
var renderizador = new THREE.WebGLRenderer();
TexturaSetup();
loop();
