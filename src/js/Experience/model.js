import * as THREE from "three"
import gsap from "gsap"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { scene } from "./world"
import { loadingManager } from "./loading"
import { camera } from "./camera"
import { givePosition } from "./sizes"
import { myEasing } from "../main"

// Export
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

// Globale variable
const colors = ["#a83232", "#b06035", "#242423", "#8da832", "#082e00", "#2ba675", "#282ca6", "#8f2aa8"]
const names = ["EARTH", "MARS", "SUN", "VENUS", "URANUS", "MERCURY", "SATURN", "NEPTUNE"]
const littleDescriptions = [
    "Learn more about this facinating miracle that we call our home, Planet Earth. Course enrollment starts today. Early Bird tickets typically last a week, don't miss out!",
    "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the 'Red Planet'",
    "The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating the energy mainly as visible light, ultraviolet light, and infrared radiation",
    "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be visible to the naked eye in broad daylight",
    "Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the great-grandfather of Ares (Mars), grandfather of Zeus (Jupiter) and father of Cronus (Saturn).",
    "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets.",
    "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth.",
    "Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.",
]

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
        createSphere(colors[i], planetsPosition[i], names[i], littleDescriptions[i])
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

const createSphere = (color, position, name, description) => {
    const geometry = new THREE.SphereBufferGeometry(1, 32, 100)
    const material = new THREE.MeshBasicMaterial({ color: color })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.positionNormalize = position
    mesh.name = name
    mesh.littleDescription = description
    mesh.sectionMore = false

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

export const planetsAnimationScroll = (direction) => {
    modelgroup.children.forEach((child, i) => {
        if (direction === "bottom" && !child.sectionMore) {
            if (child.positionNormalize.y === 0) {
                gsap.to(child.position, {
                    y: 10,
                    duration: 1,
                    ease: myEasing,
                    
                })
            } else {
                const position = getPositionInRelationToScreen({x: 0.09, y: 0})
                gsap.to(child.position, {
                    x: position.x,
                    y: 0,
                    z: 7.5,
                    duration: 1,
                    ease: myEasing,
                })
            }

            child.sectionMore = true

        } else if (direction === "top" && child.sectionMore) {
            const position = getPositionInRelationToScreen(child.positionNormalize)

            gsap.to(child.position, {
                x: position.x,
                y: position.y,
                z: child.positionNormalize.z,
                duration: 1,
                ease: myEasing,
                
            })

            child.sectionMore = false
        }
    })
}

