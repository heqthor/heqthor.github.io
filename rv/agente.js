function Agent(x=0,y=0){
  THREE.Object3D.call(this);
  this.position.x = x;
  this.position.y = y;
}

Agent.prototype = new THREE.Object3D();

Agent.prototype.sense = function(envirnoment){};
Agent.prototype.plan = function(environment) {};
Agent.prototype.act = function(environment) {};

//-----El agente opera sobre un entorno, el cual está definido por el constructor Environment()

function Environment(){
  THREE.Scene.call(this);
}

Environment.prototype = new THREE.Scene();

Environment.prototype.sense = function(){
  for(var i=0; i<this.children.length;i++){
    if(this.children[i].sense !== undefined)
      this.children[i].sense(this);
  }
};

Environment.prototype.plan = function(){
  for(var i=0; i < this.children.length; i++){
    if(this.children[i].plan !== undefined )
      this.children[i].plan(this);
  }
};

Environment.prototype.act = function(){
  for(var i=0; i < this.children.length; i++){
    if(this.children[i].act !== undefined )
      this.children[i].act(this);
  }
};
