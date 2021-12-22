import * as THREE from "three"
import { active, scene, gui } from "./world"

export let pointLight = null

export const initLight = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 4.3)
    scene.add(ambientLight) 

    pointLight = new THREE.PointLight(0xffffff, 30)
    pointLight.position.set(0, 0, 11.5)
    scene.add(pointLight)

    if (active) {
        const lightFolder = gui.addFolder("Lights")

        lightFolder.add(ambientLight, "intensity").min(0).max(50).step(0.1).name("ambientLight")
        lightFolder.add(pointLight, "intensity").min(0).max(50).step(0.1).name("pointLight")
        lightFolder.add(pointLight.position, "x").min(-50).max(50).step(0.1).name("pointLight x")
        lightFolder.add(pointLight.position, "y").min(-50).max(50).step(0.1).name("pointLight y")
        lightFolder.add(pointLight.position, "z").min(-50).max(50).step(0.1).name("pointLight z")
    }
}