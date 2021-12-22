import * as THREE from "three"
import { sizes } from "./sizes"
import { scene } from "./world"

export let camera = null
export let fov = 65

export const initCamera = () => {
    camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0, 0, 10)
    scene.add(camera)
}
