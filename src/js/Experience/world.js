import * as THREE from "three"
import * as dat from "dat.gui"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initSize } from "./sizes"
import { initCamera, camera } from "./camera"
import { composer, initRenderer } from "./renderer"
import { initLight } from "./light"
import { initModel } from "./model"

export const canvas = document.querySelector(".weblg1")
export let scene = null
export let clock = null
export let gui = null
export let active = window.location.hash === '#debug'

export const initWorld = () => {
    // Debug
    if (active) gui = new dat.GUI()

    // Scene
    scene = new THREE.Scene()
    
    //-------------------------------------------------------------------------
    // Init world
    //-------------------------------------------------------------------------

    // const g = new THREE.BoxBufferGeometry(1, 1, 1)
    // const m = new THREE.MeshBasicMaterial()
    // const mes = new THREE.Mesh(g, m)
    // scene.add(mes)
    
    initSize()
    initCamera()
    initLight()
    initModel()
    initRenderer()

    // Controls
    const controls = new OrbitControls(camera, canvas)

    //-------------------------------------------------------------------------
    // Update
    //-------------------------------------------------------------------------
    
    const clock = new THREE.Clock()
    
    const update = () => {
        const elapsedTime = clock.getElapsedTime()

        // Controls
        controls.update()

        // Light
        // if (pointLight !== null) {
        //     pointLight.position.x = Math.cos(elapsedTime * 0.5) * 15
        //     pointLight.position.z = Math.sin(elapsedTime * 0.5) * 15
        // }
    
        // Render
        // renderer.render(scene, camera)
        if (composer !== null) {
            composer.render()
        }
    
        // Call tick again on the next frame
        window.requestAnimationFrame(update)
    }
    
    update()
}

