# 3D-City-THREE.js
_**NOTE** : CDN Links are used in this Project_
![](https://user-images.githubusercontent.com/65170037/198151839-3c37f77e-cf8b-42f6-9fd8-5476cdbeee59.gif)


## Content:
1. Plane(```Plane Geometrry```)
    - Mountains Curves(```Displacement Map```)
    - Texture
2. Roads + Footpaths (```Box Geometry```)
3. Buildings :european_post_office:(```Box Geometry```) 
4. Sun (```Point Light```)
    - Trajectory / Path / Sunrise to Sunset :sunrise: -> :sunrise_over_mountains: (```Animation```)
    -  Intensity (```Ambient Light```)
5. Cars :red_car:(```GLTF 3d Model```)
    - Moving on the Roads(```Animation```)
6. Raining (```BufferGeomtry```)
    
### 1. Plane(```Plane Geometrry```)

![image](https://user-images.githubusercontent.com/65170037/198146578-80039ffd-37e4-4ac0-8514-34a5add959f4.png)

1. I used ```THREE.MeshLambertMaterial``` instead of ```THREE.MeshPhongMaterial``` because _PHONG_ material makes the surface shinny and mountains are rough.
2. ```displacementMap``` property is used to load the Displacement map with ```displacementScale``` value is 200 to map the mountain curves on the ```THREE.PlaneGeomerty```.([Displacment Map](https://github.com/Athar-ali-siddiqui/3D-City-THREE.js/blob/master/texture/Untitled.png))
3. Texture is used to map Dry Mountain texture to ```PlaneGeometry``` ([Texture](https://github.com/Athar-ali-siddiqui/3D-City-THREE.js/blob/master/texture/mountain-texture6.png))

### 2. Roads + Footpaths (```Box Geometry```)

![image](https://user-images.githubusercontent.com/65170037/198148947-42c0bd15-6b41-4b38-bfd7-a70d4aa75247.png)

### 3. Buildings (```Box Geometry```) 

![image](https://user-images.githubusercontent.com/65170037/198151058-fcf89f60-5f7f-418f-8bf6-2e94318c685e.png)

Randomly Placed in each quadrant(Roads + footpaths are quadrant bisectors)

### 4. Sun (```PointLight``` & ```AmbientLight```)
![](https://user-images.githubusercontent.com/65170037/198153392-358d5e3f-1c4d-4b00-a1b6-ca9ce47a70e9.gif)


1.```PointLight``` is used to cast Shadow of Buildings and Other objects.
2.```PointLight``` Path/Trajectory is Semi-circles trajectory. Points are calculated through ***Parametric Equation*** of circle _(a x cos(θ) , a x sin(θ))_
3.```AmbientLight``` intensity is increasing to ```1``` till **x > 0** then it is decreasing to ```0.1```

### 5. Cars (```GLTF 3d Model```)
![](https://user-images.githubusercontent.com/65170037/198155040-8aa363ac-6b51-4188-9baf-7bbd0b523b8f.gif)

### 6. Raining (```BufferGeomtry```)
![](https://user-images.githubusercontent.com/65170037/198156260-20aa5a3e-3332-4c40-8017-b3c1e4705f94.gif)


1. When we click on ```Start Barish``` button **3D Cloud Model** appears on the screen from out of the city then the cloud reaches at center of the city and start raining.
2. Second time clicking on this button raining is stop and **3D Cloud Model** moves away from the center of the city to out of the city.
