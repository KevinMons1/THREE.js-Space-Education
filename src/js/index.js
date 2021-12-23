import gsap, { Power1 } from "gsap"
import { initWorld } from "./Experience/world"
import { initMain } from "./main"

// Create world 3D
initWorld()

// Animation switch planets and text
initMain()

// window.onload = () => {
//     let tl = gsap.timeline()

//     tl.to("header", {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: Power1.easeInOut
//     })
    
//     tl.to(".title", {
//         y: "-50%",
//         opacity: 1,
//         duration: 1,
//         ease: Power1.easeInOut
//     })

//     tl.to(".weblg1", {
//         opacity: 1,
//         duration: 1,
//         ease: Power1.easeInOut
//     })

// }