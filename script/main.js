
import { Barish } from "./Barish.js";


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x51afed );

// Lights
const light = new THREE.AmbientLight( 'white' , 0.1 ); // soft white light

scene.add( light );


const pointLight = new THREE.PointLight('white', 1)
pointLight.position.x = 250
pointLight.position.y = 0
pointLight.position.z = 0
pointLight.castShadow = true;
// pointLight.target(0,0,0);
const helper = new THREE.PointLightHelper( pointLight, 5 );
scene.add( helper );
scene.add(pointLight)
const views = [
    // Main view 
    {
        left: 0, bottom: 0, 
        width: 0.5, height: 1,
        position: [-20,150,150] ,
        lookAt : [0 , 0 , 0],
        camera : new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000),
        
        
    },
    // Chowrangi wala camera
    {
        left: 0.5, bottom: 0, 
        width: 0.5, height: 0.3,
        position: [-8,80,-8] ,
        lookAt : [18 , 30 , 18],
        
        camera : new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000),
        
    },
    // Mountain view 
    {
        left: 0.5, bottom: 0.3, 
        width: 0.5, height: 0.3,
        position: [-50,60,200] ,
        lookAt : [0 , 30 , -50],
        
        camera : new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000),
        
    },
    // Top View 
    {
        left: 0.5, bottom: 0.6, 
        width: 0.5, height: 0.4,
        position: [0,250,0] ,
        lookAt : [0 , 0 , 0],
        background: new THREE.Color( 0.7, 0.5, 0.5 ),
        camera : new THREE.PerspectiveCamera(75, (sizes.width) / (sizes.height), 0.1, 2000),
        
    }
];

for ( let i = 0; i < views.length; ++ i ) {

    const view = views[ i ];
    const camera = view.camera ;
    camera.position.set(view.position[0],view.position[1],view.position[2]);
    camera.lookAt( view.lookAt[0],view.lookAt[1],view.lookAt[2]);
    scene.add(camera)
    view.camera = camera;
    if(i == 0){
        const controls = new THREE.OrbitControls(camera, canvas)
        controls.enableDamping = true
    }
    
}



//Sizes


window.addEventListener('resize', () =>
{
    console.log("window.addEventListener");
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height

    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
camera.position.x = 0
camera.position.y = 300
camera.position.z = 150
scene.add(camera)

// Controls


// Axes Helper
const axesHelper = new THREE.AxesHelper( 500 );
scene.add( axesHelper );

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled =true;


let loader = new THREE.TextureLoader();

let gltfLoader = new THREE.GLTFLoader();
const total_cars = 1;
let cars = [[undefined , 1],[undefined , 7] , [undefined , 5]];
function car_on_road(){
    gltfLoader.load('model/white/scene.gltf', function(gltf){
    cars[0][0] = gltf.scene.children[0];
    cars[0][0].castShadow = true;
    cars[0][0].scale.set(0.7,0.7,0.7);
    cars[0][0].position.set(-4 ,1,200);
    scene.add(gltf.scene);

    });
    // gltfLoader.load('model/orange/scene.gltf', function(gltf){
    //     cars[1][0] = gltf.scene.children[0];
    //     cars[1][0].castShadow = true;
    //     cars[1][0].scale.set(3,3,3);
    //     cars[1][0].position.set(-4 ,1,-100);
    //     scene.add(gltf.scene);
    
    // });
    // gltfLoader.load('model/blue/scene.gltf', function(gltf){
    //     cars[2][0] = gltf.scene.children[0];
    //     cars[2][0].castShadow = true;
    //     cars[2][0].scale.set(0.3,0.3,0.3);
    //     cars[2][0].position.set(-40 ,1,4);
    //     // cars[2][0].rotation.z = Math.PI/2;
    //     scene.add(gltf.scene);
    
    // });
}


let cloud ;
function clouds(){
    for(let i = 0 ; i < 10 ;i++){
        gltfLoader.load('model/cloud1/scene.gltf', function(gltf){
            
            cloud = gltf.scene.children[0];
            cloud.traverse((node) => {
                if(node.isMesh) node.castShadow = true;
            })
            let sc = randomInt(3,10);
            cloud.scale.set(5,5,5);
            cloud.position.set(randomInt(-areaX/2,areaX/2) ,100,randomInt(-areaZ/2,areaZ/2) );
            cloud.rotation.x = Math.PI * Math.random();
            scene.add(gltf.scene);
            
            });
        }    
}

// clouds();


// create_raining_clouds()
/**
 * Animate
 */

const areaX = 250 , areaZ = 250;
const total_areaX = 450 , total_areaZ = 450;
const plane_geometry = new THREE.PlaneGeometry( total_areaX, total_areaZ , 500,500);
const plane_material = new THREE.MeshPhongMaterial( {
    // color: 0x07f707, 
    side: THREE.DoubleSide,
    map : loader.load('texture/mountain-texture6.png'),
    displacementMap : loader.load('texture/Untitled1.png'),
    displacementScale : 200
} );
const plane = new THREE.Mesh( plane_geometry, plane_material );
// plane.castShadow = true; 
plane.receiveShadow = true;
// plane.scale.y = 1.2
scene.add( plane );
plane.rotation.x = Math.PI/2;
plane.position.set(0,200,0);



let width_of_road = 8 , height_of_road = 1;
const road_material = new THREE.MeshStandardMaterial( {color: 0x808080} );
function main_road(){
    let z = total_areaZ;
    const road_geometry = new THREE.BoxGeometry(width_of_road , height_of_road , z );
    
    let road = new THREE.Mesh( road_geometry, road_material );
    road.position.set(width_of_road/2,height_of_road/2,0);
    road.receiveShadow = true; //default
    scene.add( road );
    
    road = new THREE.Mesh( road_geometry, road_material );
    road.position.set(-width_of_road/2 , height_of_road/2 ,0);
    road.receiveShadow = true; //default
    scene.add( road );
}
function cross_road(){
    let x = total_areaX ;
    //                                          w=x , h=y , d=z
    const road_geometry = new THREE.BoxGeometry(x , height_of_road ,width_of_road );
    
    let road = new THREE.Mesh( road_geometry, road_material );
    road.position.set(0,height_of_road/2,width_of_road/2);
    road.receiveShadow = true; //default
    scene.add( road );
 
    road = new THREE.Mesh( road_geometry, road_material );
    road.position.set(0,height_of_road/2,-width_of_road/2);
    road.receiveShadow = true; //default
    scene.add( road );
}

let roadStartWidth = width_of_road ;
let roadEndWidth = -width_of_road;

let width_of_footpath = 3 , height_of_footpath = 1.5;

function main_footpath(){
    let x = 2 , y = 1.5;

    let midpoint = ((total_areaZ)/2 + roadStartWidth) / 2;
    let dist = ((total_areaZ)/2 - roadStartWidth)

    let road_geometry = new THREE.BoxGeometry( width_of_footpath , height_of_footpath , dist );
    let road_material = new THREE.MeshStandardMaterial( {
        color: 0xffffff
        // map :footpath_texture
    });
    let road_cube = new THREE.Mesh( road_geometry, road_material );
    road_cube.position.set(roadEndWidth - width_of_footpath/2,height_of_footpath/2, midpoint);

    road_cube.castShadow = true; //default is false
    road_cube.receiveShadow = true; //default
    scene.add( road_cube );

    road_cube = new THREE.Mesh( road_geometry, road_material );
    road_cube.position.set(roadStartWidth + width_of_footpath/2 , height_of_footpath/2 ,midpoint);
    road_cube.castShadow = true; //default is false
    road_cube.receiveShadow = true; //default
    scene.add( road_cube );

    midpoint = ( -(total_areaZ)/2 + roadEndWidth ) / 2;
    dist = ( (total_areaZ)/2 + roadEndWidth);

    // dist = ( -(areaZ+50)/2 - roadEndWidth )
    road_geometry = new THREE.BoxGeometry(width_of_footpath , height_of_footpath , dist );
    road_cube = new THREE.Mesh( road_geometry , road_material );
    road_cube.position.set(roadEndWidth - width_of_footpath/2 , height_of_footpath/2 , midpoint );
    road_cube.castShadow = true; //default is false
    road_cube.receiveShadow = true; //default
    scene.add( road_cube );

    road_cube = new THREE.Mesh( road_geometry, road_material );
    road_cube.position.set(roadStartWidth + width_of_footpath/2 , height_of_footpath/2 ,midpoint );
    road_cube.castShadow = true; //default is false
    road_cube.receiveShadow = true; //default
    scene.add( road_cube );
}

function cross_footpath(){
    // z is width of footpath (for "cross footpath")
    // y is height of footpath
    let z = 2 , y = 1.5;
    // x is length of footpath (for "cross footpath")
    // midpoint is used to evenly distribute length both sides of midpoint 
    let midpoint = ((total_areaX)/2 + roadStartWidth) / 2;
    // distance b/w planeGeometry end point and cross road 
    let dist = ((total_areaX)/2 - roadStartWidth)

    let road_geometry = new THREE.BoxGeometry( dist , height_of_footpath , width_of_footpath );
    let road_material = new THREE.MeshStandardMaterial( {
        color: 0xffffff
        // map :footpath_texture
    });

    let road_cube = new THREE.Mesh( road_geometry, road_material );
    road_cube.position.set(midpoint, height_of_footpath/2 ,roadEndWidth - width_of_footpath/2);
    road_cube.castShadow = true; //default is false
    road_cube.receiveShadow = true; //default
    scene.add( road_cube );

    road_cube = new THREE.Mesh( road_geometry, road_material );
    road_cube.position.set( midpoint, height_of_footpath/2 ,roadStartWidth + width_of_footpath/2);
    road_cube.castShadow = true; //default is false
    road_cube.receiveShadow = true; //default
    scene.add( road_cube );

    midpoint = ( -(total_areaX)/2 + roadEndWidth ) / 2;
    dist = ( (total_areaX)/2 + roadEndWidth);
    road_geometry = new THREE.BoxGeometry(dist , height_of_footpath , width_of_footpath );

    road_cube = new THREE.Mesh( road_geometry, road_material );
    road_cube.position.set( midpoint, height_of_footpath/2 ,roadEndWidth - width_of_footpath/2 );
    road_cube.castShadow = true; //default is false
    road_cube.receiveShadow = true; //default
    scene.add( road_cube );

    road_cube = new THREE.Mesh( road_geometry, road_material );
    road_cube.position.set( midpoint , height_of_footpath/2 , roadStartWidth + width_of_footpath/2 );
    road_cube.castShadow = true; //default is false
    road_cube.receiveShadow = true; //default
    scene.add( road_cube );

}

let pathStartWidth = roadStartWidth +  width_of_footpath;
let pathEndWidth = roadEndWidth - width_of_footpath;
console.log(pathStartWidth)
console.log(pathEndWidth)
let buildingTexture = loader.load('texture/building-texture.webp');
// x = -ve and z = -ve
function create_Buildings(){
    const n_buildings_per_quadrant = 20;
    const material = new THREE.MeshStandardMaterial( {map: buildingTexture} );
    for(let i  = 0 ; i < n_buildings_per_quadrant ;i++){
        
        let h = randomInt(20,50) , w =  randomInt(10,30) , d =randomInt(10,30);
        const geometry = new THREE.BoxGeometry( w, h, d );
        
        const cube = new THREE.Mesh( geometry, material );
        
        cube.castShadow = true; //default is false
        cube.receiveShadow = true; //default

        let x = randomInt( -areaX/2 + w/2, pathEndWidth - w/2 ) ;
        let z = randomInt(-areaZ/2 + d/2, pathEndWidth - d/2)  ;
        
        cube.position.set(x ,h/2 ,z);
        scene.add( cube );
    }
    // x = +ve and z = +ve
    for(let i  = 0 ; i < n_buildings_per_quadrant ;i++){
        
        let h = randomInt(20,30) , w =  randomInt(10,30) , d =randomInt(10,30);
        const geometry = new THREE.BoxGeometry( w, h, d );
        
        const cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true; //default is false
        cube.receiveShadow = true; //default
        let x = randomInt( pathStartWidth+ w/2 ,  areaX/2 - w/2) ;
        let z = randomInt( pathStartWidth + d/2, areaZ/2 - d/2)  ;
        // console.log("x = ",x," z = ",z);
        // console.log(x);
        cube.position.set(x ,h/2 ,z);
        scene.add( cube );
    }
    for(let i  = 0 ; i < n_buildings_per_quadrant ;i++){
        
        let h = randomInt(20,30) , w =  randomInt(10,30) , d =randomInt(10,30);
        const geometry = new THREE.BoxGeometry( w, h, d );
        
        const cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true; //default is false
        cube.receiveShadow = true; //default
        let x = randomInt( -areaX/2 + w/2, pathEndWidth - w/2) ;
        let z = randomInt( pathStartWidth + d/2, areaZ/2 - d/2)  ;
        // console.log("x = ",x," z = ",z);
        // console.log(x);
        cube.position.set(x ,h/2 ,z);
        scene.add( cube );
    }
    for(let i  = 0 ; i < n_buildings_per_quadrant ;i++){
        
        let h = randomInt(20,30) , w =  randomInt(10,30) , d =randomInt(10,30);
        const geometry = new THREE.BoxGeometry( w, h, d );
        
        const cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true; //default is false
        cube.receiveShadow = true; //default
        let x = randomInt( pathStartWidth+ w/2 ,  areaX/2 - w/2) ;
        let z = randomInt( -areaZ/2 + d/2, pathEndWidth - d/2)  ;
        // console.log("x = ",x," z = ",z);
        // console.log(x);
        cube.position.set(x ,h/2 ,z);
        scene.add( cube );
    }
}

cross_footpath();
main_footpath();
create_Buildings();
cross_road();
main_road();
car_on_road();
// Click button ky liye counter : first click par stop barish ... second click par start barish

let raining_clouds = [];


let raining_scene = false;
let raining_scene_off = false;
const rain_particles = 1000;
let barish ;
let btn = document.querySelector('button.btn')
btn.addEventListener('click' , function(e){
    if(raining_scene == false) {
        btn.textContent = 'Stop Barish'
        create_raining_clouds(1);
        create_raining(rain_particles);
        raining_scene_off = false;
    }
    else{
        btn.textContent = 'Start Barish';
        
        
        // start_raining = false;
        raining_scene_off = true;
        
    }
    raining_scene = !raining_scene;
    console.log("HERE IN BUTTON")
    
})
function create_raining(n){
    barish = new Barish();
    barish.endPoint = new THREE.Vector3(0,1,0);
 
    barish.startX = -areaX/2 ; barish.endX = areaX/2 ;
    barish.startY = 100 ; barish.endY = 0 ;
    barish.startZ = -areaZ/2 ; barish.endZ = areaZ/2 ;
    barish.drawBarish(rain_particles);
    for(let i = 0 ; i < n ;i++){
        scene.add(barish.particles[i]);
    }

}
function create_raining_clouds(n){
    for(let i = 0 ; i < n ;i++){
        gltfLoader.load('model/cloud1/scene.gltf', function(gltf){
            
            cloud = gltf.scene.children[0];
            cloud.traverse((node) => {
                if(node.isMesh) node.castShadow = true;
            })
            
            cloud.scale.set(30,30,15);

            scene.add(gltf.scene);
            raining_clouds[i] = gltf.scene;
            raining_clouds[i].position.set( -areaX/2 ,100, -total_areaZ/2);
            });
        }    
        
}

function randomInt(min, max) { // min and max included 
    return Math.random() * (max - min + 1) + min
}

const car_turning_sec = 30;
const car_Uturning_sec = 120;
const car_speed = 3;

let total_sun_time = 15;
let inc = 1 / (total_sun_time * 60);


// Stop/start barish

let i = 0 ,r = 119 ,g = 144 , b = 242, intensity = 0.1;
let barish_wait = 2 * 60;
let start_raining = false;
function tick()
{
    window.requestAnimationFrame(tick)
    if(cars[0][0] != undefined ){
        // scene.remove(box);
        // box = new THREE.BoxHelper( car, 0xffff00 );
        // scene.add( box );
        for(let i = 0 ; i <total_cars ;i++){
            let car = cars[i][0];
            let road_segment = cars[i][1];
        
            // console.log("segment =",road_segment);
            // U turning from lane 8 to 1
            if(road_segment == 16 ){
                car.rotation.z -= (Math.PI/2)/car_turning_sec;
                car.position.x -= 4/car_turning_sec ;
                car.position.z = 225;
                if(car.position.x <= -4)road_segment=1;
                // console.log("U turning from lane 8 to 1");
                
            }
            // Driving in lane 8
            else if(road_segment == 15 ){
                car.rotation.z = Math.PI;
                car.position.z += car_speed;
                car.position.x = 4
                if(car.position.z >= 225)road_segment++;
            } 
            // Turning from lane 7 to lane 8
            
            else if(road_segment == 14  ){
                car.rotation.z += (Math.PI/2)/car_turning_sec;
                car.position.z += 4/car_turning_sec;
                car.position.x -= 4/car_turning_sec;
                
                // console.log("Turning from lane 7 to lane 8");
                if(car.position.z >= 8 && car.position.x <= 4)road_segment++;
            }
            // Driving on lane 7
            else if(road_segment == 13 ){
                car.rotation.z = Math.PI/2;
                car.position.x -= car_speed;
                // console.log("Driving on lane 7")
                if(car.position.x <= 8 )road_segment++;
            }
            // U turning from lane 6 to 7
            else if(road_segment == 12  ){
                car.rotation.z -= (Math.PI/2)/car_turning_sec;
                car.position.z += 4/car_turning_sec ;
                car.position.x = 225;
                if(car.position.z >= 4)road_segment++;
                // console.log("U turning from lane 6 to 7");
                
            }
            // Driving in lane 6
            else if(road_segment == 11 ){
                car.rotation.z = -Math.PI/2;
                car.position.x += car_speed;
                car.position.z = -4
                if(car.position.x >= 225)road_segment++;
            } 
            // Turning from lane 5 to lane 6
            else if(road_segment == 10  ){
                car.rotation.z += (Math.PI/2)/car_turning_sec;
                car.position.z += 4/car_turning_sec;
                car.position.x += 4/car_turning_sec;
                if(car.position.z >= -4 && car.position.x >= 8) road_segment++;
                // console.log("Turning from lane 5 to lane 6");
            }
            // Driving in lane 5
            else if( road_segment == 9  ){
                car.rotation.z = Math.PI;
                // console.log("Driving on lane 5")
                car.position.z += car_speed;
                if(car.position.z >= -8 )road_segment++;
            } 
            // U turning from lane 4 to 5
            else if(road_segment == 8 ){
                car.rotation.z -= (Math.PI/2)/car_turning_sec;
                car.position.x += 4/car_turning_sec;
                car.position.z = -225;
                if(car.position.x >= 4)road_segment++;
                // console.log("U turning from lane 4 to 5");
                
            }
            // Driving on lane 4
            else if(road_segment == 7 ){
                // console.log("Driving on lane 4")
                car.rotation.z = 0;
                car.position.z -= car_speed;
                if(car.position.z <= -225)road_segment++;
            }
            // Turning from lane 3 to lane 4
            else if(road_segment == 6){
                car.rotation.z += (Math.PI/2)/car_turning_sec;
                car.position.z -= 4/car_turning_sec;
                car.position.x += 4/car_turning_sec;
                if( car.position.z >= -8 && car.position.x <= -4)road_segment++;
                // console.log("Turning from lane 3 to lane 4");
            }
            // Driving in lane 3
            else if(road_segment == 5 ){
                car.rotation.z = -Math.PI/2;
                
                car.position.x += car_speed;
                if(car.position.x >= -8) road_segment++;
            } 
            // U turning from lane 2 to 3
            else if(road_segment == 4){
                
                car.rotation.z -= (Math.PI/2)/car_turning_sec;
                car.position.z -= 4/car_turning_sec;
                car.position.x = -225;
                if(car.position.z <= -4 ) road_segment++;
                // console.log("U turning from lane 2 to 3");
                
            }
            // Driving on lane 2
            else if( road_segment == 3 ){
                car.position.x -= car_speed;
                car.rotation.z = Math.PI/2;
                // console.log("Driving on lane 2")
                if(car.position.x <= -225 ){
                    road_segment++;
                }
                
            }

            // Turning from lane 1 to lane 2
            else if(  road_segment == 2){
                car.rotation.z += (Math.PI/2)/car_turning_sec;
                car.position.z -= 4/car_turning_sec;
                car.position.x -= 4/car_turning_sec;
                if(car.position.z <= 4 &&  car.position.x <= -8){
                    road_segment++;
                }
                // console.log("Turning from lane 1 to lane 2");
            }
            // Driving on lane 1
            else if(road_segment == 1){
                // console.log("Driving on lane 1")
                car.rotation.z = 0;
                car.position.z -= car_speed;
                car.position.x = -width_of_road/2
                if(car.position.z <= 8 ) road_segment++;
            }
            cars[i][1] = road_segment;
        }
        
        // ~~~~~~~~~~~~~~
        
    }
        
    if(i >= 0 && i <= 0.1){
        intensity += 0.2/(total_sun_time*0.1 * 60)
    }
    else if(i > 0.1 && i <= 0.5){
        intensity += 0.4/(total_sun_time*0.4 * 60)
    }
    else if( i > 0.5 && i <= 0.9 ){
        intensity -= 0.4/(total_sun_time*0.4 * 60)
    }
    else if ( i > 0.9  && i <= 1){
        intensity -= 0.2/(total_sun_time*0.1 * 60)
    }
    else{
        intensity = 0.1;
    }
    // console.log(intensity)
    light.intensity = intensity;
    pointLight.position.x = 250 * Math.cos(Math.PI * i);
    pointLight.position.y = 200 * Math.sin(Math.PI * i);
    i += inc ;
    i %= 1;


    if(raining_scene == true){
        for(let i = 0 ; i < raining_clouds.length ;i++){

            if(raining_clouds[i].position.z < 0){
                raining_clouds[i].position.z += 1;
     
            }
            
        }
        if(raining_clouds[0] != undefined && raining_clouds[0].position.z >= 0){
            barish.update();
        }
        
    }
    if(raining_scene_off == true ){
        if(raining_clouds[0].position.z < total_areaZ/2){
            raining_clouds[0].position.z += 2;
     
        }
        else{
            scene.remove(raining_clouds[0]);
            for(let i = 0 ; i < rain_particles ;i++){
                scene.remove(barish.particles[i]);
            }
            raining_scene_off = false;
        }
    }
    render();

    // renderer.render(scene, camera)
    
}
tick();



function render() {

    // updateSize();

    for ( let i = 0; i < views.length; ++ i ) {

        const view = views[ i ];
        const camera = view.camera;

        // view.updateCamera( camera, scene, mouseX, mouseY );

        const left = Math.floor( sizes.width * view.left );
        const bottom = Math.floor( sizes.height * view.bottom );
        const width = Math.floor(  sizes.width * view.width );
        const height = Math.floor( sizes.height * view.height );

        renderer.setViewport( left, bottom, width, height );
        renderer.setScissor( left, bottom, width, height );
        renderer.setScissorTest( true );
        renderer.setClearColor( view.background );

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.render( scene, camera );

    }

}




