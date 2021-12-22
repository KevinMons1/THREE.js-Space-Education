import * as THREE from "three"
import gsap from "gsap"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { scene } from "./world"
import { loadingManager } from "./loading"
import { camera } from "./camera"
import { givePosition } from "./sizes"

export let modelgroup = new THREE.Group()
export let planetsPosition = [
    {x: 0, y: -0.15, z: 9.25},
    {x: 1, y: 0, z: 0},
    {x: 0, y: 0, z: -100},
    {x: 0, y: 0, z: -100},
    {x: 0, y: 0, z: -100},
    {x: 0, y: 0, z: -100},
    {x: 0, y: 0, z: -100},
    {x: -1, y: 0, z: 0}
]
const colors = ["#a83232", "#b06035", "#242423", "#8da832", "#082e00", "#2ba675", "#282ca6", "#8f2aa8"]
const names = ["EARTH", "MARS", "SUN", "VENUS", "URANUS", "MERCURY", "SATURN", "NEPTUNE"]

// Download model
export const initModel = () => {
    // const earthModel = loadModel(
    //     "model/planets/earth/scene.gltf", // rouge
    //     0.2,
    //     planetsPosition[0]
    //  )
    // const marsModel = loadModel(
    //     "model/planets/mars/scene.gltf", // brun/orange
    //     0.01,
    //     planetsPosition[1]
    // )
    // const sunModel = loadModel(
    //     "model/planets/sun/scene.gltf",  // gris
    //     0.04,
    //     planetsPosition[2]
    // )
    // const venusModel = loadModel(
    //     "model/planets/venus/scene.gltf",  // vert pomme
    //     0.96,
    //     planetsPosition[3]
    // )
    // const uranusModel = loadModel(
    //     "model/planets/uranus/scene.gltf", // kaki
    //     0.96,
    //     planetsPosition[4]
    // )
    // const mercuryModel = loadModel(
    //     "model/planets/mercury/scene.gltf", // turquoise
    //     0.96,
    //     planetsPosition[5]
    // )
    // const saturnModel = loadModel(
    //     "model/planets/saturn/scene.gltf", // bleu foncé
    //     0.96,
    //     planetsPosition[6]
    // )
    // const neptuneModel = loadModel(
    //     "model/planets/neptune/scene.gltf", // rose
    //     0.96,
    //     planetsPosition[7]
    // )

    for (let i = 0; i < colors.length; i++) {
        createSphere(colors[i], planetsPosition[i], names[i])
    }
 
    setTimeout(() => {
        givePosition()
    }, 100)

    scene.add(modelgroup)
}


// const loadModel = (path, scale, position) => {
//     const gltfLoader = new GLTFLoader(loadingManager)
//     gltfLoader.load(path, (gltf) => {  
//         const pos = getPositionInRelationToScreen(position)
//         console.log(pos)

//         gltf.scene.scale.set(scale, scale, scale)
//         gltf.scene.position.set(pos.x, pos.y, position.z)
//         gltf.scene.positionNormalize = position
//         modelgroup.add(gltf.scene)
//     })
// }

const createSphere = (color, position, name) => {
    const geometry = new THREE.SphereBufferGeometry(1, 32, 100)
    const material = new THREE.MeshBasicMaterial({ color: color })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.positionNormalize = position
    mesh.name = name

    modelgroup.add(mesh)
}

// https://stackoverflow.com/questions/36033879/three-js-object-follows-mouse-position
export const getPositionInRelationToScreen = (position) => {
    // x: 0, y: -1 center bottom
    // x: 0, y: 0 center center
    // x: -1, y: 0 left centrer
    // x: 1, y: 0 right center

    var vector = new THREE.Vector3(position.x, position.y, 0.5)
    vector.unproject(camera)
    var dir = vector.sub(camera.position).normalize()
    var distance = - camera.position.z / dir.z
    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) )
    return pos
}

