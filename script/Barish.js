
export class Barish{
    color = 'white';
    constructor(){
        this.startPoint = new THREE.Vector3(0,0,0);
        this.endPoint = new THREE.Vector3(0,0,1);
        // Rain drops store karega
        this.particles = Array();
        // No. of rain drops
        this.n = 0;
        // Barish Region
        this.startX = -10 ; this.endX = 10 ;
        this.startY = -10 ; this.endY = 10 ;
        this.startZ = -10 ; this.endZ = 10 ;
    }
    
    drawBarish(particles){
        this.n = particles;
        
        const material = new THREE.PointsMaterial({
        color: this.color
        // linewidth : 20
        });
    
        const points = [];
        points.push( this.startPoint );
        points.push( this.endPoint );
            
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        // const line = new LineGeometry();
        // line.end = new THREE.Vector3(0,1,0);
        for (let i = 0; i < particles; i++) {

            const line = new THREE.Line( geometry, material ); 
            
            this.particles.push ( line );
               
        }
        
    }


    update(){
        for (let i = 0; i < this.n; i++){
            this.particles[i].position.set(
                this.randomInt(this.startX,this.endX),
                this.randomInt(this.startY,this.endY), 
                this.randomInt(this.startZ,this.endZ)
                )
        }
    }
    randomInt(min, max) { // min and max included 
        return Math.random() * (max - min + 1) + min
    }

}