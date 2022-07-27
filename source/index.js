import "/style/reset.css";

import "/style/index.css";

import * as three from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/* ------------------------------------------------------------------------------------------------------ */
/* Renderer */
const renderer = new three.WebGLRenderer( { antialias: globalThis.devicePixelRatio < 2 } );

renderer.setPixelRatio( Math.min( globalThis.devicePixelRatio, 2 ) );
renderer.setSize( globalThis.innerWidth, globalThis.innerHeight );

document.body.append( renderer.domElement );

/* Scene */
const scene = new three.Scene();

/* Camera */
const camera = new three.PerspectiveCamera(
    45,
    globalThis.innerWidth / globalThis.innerHeight,
    0.01,
    100,
);

camera.position.z = 4;
scene.add( camera );

/* Controls */
const controls = new OrbitControls( camera, renderer.domElement );

controls.enableDamping = true;
controls.target = new three.Vector3( 0, 0, 0.01 );

/* Resize */
globalThis.addEventListener( "resize", _ => {

    renderer.setPixelRatio( Math.min( globalThis.devicePixelRatio, 2 ) );
    renderer.setSize( globalThis.innerWidth, globalThis.innerHeight);

    camera.aspect = globalThis.innerWidth / globalThis.innerHeight;
    camera.updateProjectionMatrix();

} );

/* Render */
renderer.setAnimationLoop( function loop() {

    controls.update();

    renderer.render( scene, camera );

} );

/* Light */
const ambient_light = new three.AmbientLight( 0xffffff, 1 );
const point_light = new three.PointLight( 0xffffff, 0.5 );

point_light.position.z = 10;
scene.add( ambient_light, point_light )

/* Texture */
const texture_loader = new three.TextureLoader();

const rock_texture_ao = texture_loader.load( "/static/rock/1k/aerial_rocks_04_ao_1k.jpg" );
const rock_texture_diff = texture_loader.load( "/static/rock/1k/aerial_rocks_04_diff_1k.jpg" );
const rock_texture_disp = texture_loader.load( "/static/rock/1k/aerial_rocks_04_disp_1k.jpg" );
const rock_texture_nor_gl = texture_loader.load( "/static/rock/1k/aerial_rocks_04_nor_gl_1k.jpg" );
const rock_texture_rough = texture_loader.load( "/static/rock/1k/aerial_rocks_04_rough_1k.jpg" );

makeRepeat( rock_texture_ao, 2, 2 );
makeRepeat( rock_texture_diff, 2, 2 );
makeRepeat( rock_texture_disp, 2, 2 );
makeRepeat( rock_texture_nor_gl, 2, 2 );
makeRepeat( rock_texture_rough, 2, 2 );

const wood_texture_ao = texture_loader.load( "/static/wood/2k/wood_table_001_ao_2k.jpg" );
const wood_texture_diff = texture_loader.load( "/static/wood/2k/wood_table_001_diff_2k.jpg" );
const wood_texture_nor_gl = texture_loader.load( "/static/wood/2k/wood_table_001_nor_gl_2k.jpg" );
const wood_texture_rough = texture_loader.load( "/static/wood/2k/wood_table_001_rough_2k.jpg" );
const wood_texture_arm = texture_loader.load( "/static/wood/2k/wood_table_001_arm_2k.jpg" );
const wood_texture_disp = texture_loader.load( "/static/wood/2k/wood_table_001_disp_2k.jpg" );

makeRepeat( wood_texture_ao, 2, 2 );
makeRepeat( wood_texture_diff, 2, 2 );
makeRepeat( wood_texture_nor_gl, 2, 2 );
makeRepeat( wood_texture_rough, 2, 2 );
makeRepeat( wood_texture_arm, 2, 2 );
makeRepeat( wood_texture_disp, 2, 2 );

const metal_texture_ao = texture_loader.load( "/static/metal/1k/metal_plate_ao_1k.jpg" );
const metal_texture_diff = texture_loader.load( "/static/metal/1k/metal_plate_diff_1k.jpg" );
const metal_texture_disp = texture_loader.load( "/static/metal/1k/metal_plate_disp_1k.jpg" );
const metal_texture_nor_gl = texture_loader.load( "/static/metal/1k/metal_plate_nor_gl_1k.jpg" );
const metal_texture_metal = texture_loader.load( "/static/metal/1k/metal_plate_metal_1k.jpg" );
const metal_texture_rough = texture_loader.load( "/static/metal/1k/metal_plate_rough_1k.jpg" );

makeRepeat( metal_texture_ao, 3, 3 );
makeRepeat( metal_texture_diff, 3, 3 );
makeRepeat( metal_texture_disp, 3, 3 );
makeRepeat( metal_texture_nor_gl, 3, 3 );
makeRepeat( metal_texture_metal, 3, 3 );
makeRepeat( metal_texture_rough, 3, 3 );

const fabric_texture_ao = texture_loader.load( "/static/fabric/1k/fabric_pattern_07_ao_1k.jpg" );
const fabric_texture_col = texture_loader.load( "/static/fabric/1k/fabric_pattern_07_col_1_1k.jpg" );
const fabric_texture_nor_gl = texture_loader.load( "/static/fabric/1k/fabric_pattern_07_nor_gl_1k.jpg" );
const fabric_texture_rough = texture_loader.load( "/static/fabric/1k/fabric_pattern_07_rough_1k.jpg" );

makeRepeat( fabric_texture_ao, 3, 3 );
makeRepeat( fabric_texture_col, 3, 3 );
makeRepeat( fabric_texture_nor_gl, 3, 3 );
makeRepeat( fabric_texture_rough, 3, 3 );

function makeRepeat( texture, s, t ) {

    texture.wrapS = three.RepeatWrapping;
    texture.wrapT = three.RepeatWrapping;
    texture.repeat.set( s, t );

}

/* Material */
const rock_material = new three.MeshStandardMaterial();
rock_material.map = rock_texture_diff;
rock_material.aoMap = rock_texture_ao;
rock_material.displacementMap = rock_texture_disp;
rock_material.displacementScale = 0.1;
rock_material.normalMap = rock_texture_nor_gl;
rock_material.roughnessMap = rock_texture_rough;

const wood_material = new three.MeshStandardMaterial();
wood_material.map = wood_texture_diff;
wood_material.aoMap = wood_texture_ao;
wood_material.normalMap = wood_texture_nor_gl;
wood_material.roughnessMap = wood_texture_rough;
wood_material.displacementMap = wood_texture_disp;
wood_material.displacementScale = 0.01;
wood_material.emissiveMap = wood_texture_arm;
wood_material.emissive = new three.Color(0xffffff);
wood_material.emissiveIntensity = 0.1;

const metal_material = new three.MeshStandardMaterial();
metal_material.map = metal_texture_diff;
metal_material.aoMap = metal_texture_ao;
metal_material.displacementMap = metal_texture_disp;
metal_material.displacementScale = 0.025;
metal_material.normalMap = metal_texture_nor_gl;
metal_material.roughnessMap = metal_texture_rough;
metal_material.metalnessMap = metal_texture_metal;

const fabric_material = new three.MeshStandardMaterial();
fabric_material.map = fabric_texture_col;
fabric_material.aoMap = fabric_texture_ao;
fabric_material.normalMap = fabric_texture_nor_gl;
fabric_material.roughnessMap = fabric_texture_rough;

/* Geometry */
const geometry = new three.SphereGeometry( 0.5, 512, 512 );

geometry.setAttribute( "uv2", new three.BufferAttribute( geometry.attributes.uv.array, 2 ) );

/* Mesh */
const marble_ball = new three.Mesh( geometry, rock_material );
const wood_ball = new three.Mesh( geometry, wood_material );
const metal_ball = new three.Mesh( geometry, metal_material );
const fabric_ball = new three.Mesh( geometry, fabric_material );

marble_ball.position.set( 0.65, 0.65, 0 );
wood_ball.position.set( 0.65, - 0.65, 0 );
metal_ball.position.set( - 0.65, - 0.65, 0 );
fabric_ball.position.set( - 0.65, 0.65, 0 );

scene.add( marble_ball, wood_ball, metal_ball, fabric_ball );
