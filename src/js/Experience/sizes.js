import * as THREE from "three"
import { camera } from "./camera"
import { renderer } from "./renderer"
import { getPositionInRelationToScreen, modelgroup } from "./model"

export let sizes = {}

export const initSize = () => {
    sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    
    window.addEventListener('resize', () =>
    {    
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update models
        modelgroup.children.forEach((child, i) => {
            if (child.sectionMore) {
                child.screenChanged = true
            } else {
                const newPosition = getPositionInRelationToScreen(child.positionNormalize)
                child.position.set(newPosition.x, newPosition.y, child.positionNormalize.z)
            }
        })
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
}

