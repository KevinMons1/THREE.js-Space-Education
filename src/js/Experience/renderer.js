import * as THREE from "three"
import { canvas, scene, active, gui } from "./world"
import { sizes } from "./sizes"
import { camera } from "./camera"
import { EffectComposer } from "three/examples/jsm/postprocessing/Effectcomposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

export let renderer = null
export let composer = null

export const initRenderer = () => { 
    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    })
    renderer.autoClear = true
    renderer.physicallyCorrectLights = true
    renderer.toneMapping = THREE.LinearToneMapping 
    renderer.toneMappingExposure = 0.85
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const renderTarget = new THREE.WebGLRenderTarget(
        sizes.width || 1,
        sizes.height || 1,
        {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            encoding: THREE.sRGBEncoding,
            stencilBuffer: false
        }
    )

    // Post-processing
    composer = new EffectComposer(renderer, renderTarget)
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    composer.setSize(sizes.width, sizes.height)
    composer.addPass(new RenderPass(scene, camera))

    // Bloom around object
    // For activate the transparant https://github.com/mrdoob/three.js/issues/14104#issuecomment-429664412
    const unrealBloomPass = new UnrealBloomPass()
    unrealBloomPass.strength = 0.2
    unrealBloomPass.radius = 1.9
    composer.addPass(unrealBloomPass)

    if (active) {
        const rendererFolder = gui.addFolder("Renderer")

        rendererFolder.add(unrealBloomPass, "strength").min(0).max(5).step(0.1).name("Bloom strength")
        rendererFolder.add(unrealBloomPass, "radius").min(0).max(5).step(0.1).name("Bloom radius")
        
        rendererFolder.add(renderer, "toneMapping", {
            NoToneMapping: THREE.NoToneMapping,
            LinearToneMapping: THREE.LinearToneMapping ,
            ReinhardToneMapping: THREE.ReinhardToneMapping ,
            CineonToneMapping: THREE.CineonToneMapping ,
            ACESFilmicToneMapping: THREE.ACESFilmicToneMapping ,
        }).onFinishChange(() => {
            renderer.toneMapping = Number(renderer.toneMapping)
            updateAllMaterials()
        })
        
        rendererFolder.add(renderer, "toneMappingExposure").min(0).max(10).step(0.001)
    }
}