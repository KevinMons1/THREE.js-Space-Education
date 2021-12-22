import { camera } from "./camera"
import { getPositionInRelationToScreen, modelgroup, planetsPosition } from "./model"
import { renderer } from "./renderer"

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
        givePosition()
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
}

export const givePosition = () => {
    modelgroup.children.forEach((child, i) => {
        const position = getPositionInRelationToScreen(child.positionNormalize)
        child.position.set(position.x, position.y, child.positionNormalize.z)
    })
}


