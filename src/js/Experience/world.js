import * as THREE from "three"
import * as dat from "dat.gui"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initSize } from "./sizes"
import { initCamera, camera } from "./camera"
import { composer, initRenderer } from "./renderer"
import { initLight } from "./light"
import { initModel, modelgroup } from "./model"

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
        
    const update = () => {

        // Controls
        controls.update()

        // Models
        modelgroup.children.forEach(model => {
            if (model.position.z >= 0) {
                model.rotation.y += 0.001
            }
        })
    
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

