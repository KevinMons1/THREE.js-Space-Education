import { initWorld } from "./Experience/world"
import gsap, { Power1 } from "gsap"
import { modelgroup } from "./Experience/model"

export const nextPlanetNameRight = document.querySelector(".nextPlanet-name-right")
export const nextPlanetNameLeft = document.querySelector(".nextPlanet-name-left")

const btnNextPlanetLeft = document.querySelector(".nextPlanet-left")
const btnNextPlanetRight = document.querySelector(".nextPlanet-right")

// Create world 3D
initWorld()

// Animation next planet
btnNextPlanetLeft.addEventListener("click", () => callNextPlanet("left"))
btnNextPlanetRight.addEventListener("click", () => callNextPlanet("right"))

let animationActive = false
const callNextPlanet = (direction) => {
    if (!animationActive) {
        animationActive = true
        animationTest(direction)
        setTimeout(() => {
            animationActive = false
        }, 500)
    }
}

const animationTest = (direction) => {
    const savePositionChild = modelgroup.children

    modelgroup.children.forEach((child, i) => {
        let nextChild = savePositionChild[direction === "right" ? i + 1 : i - 1]

        // Search last object for switch to first
        if (nextChild === undefined) {
            nextChild = savePositionChild[direction === "right" ? 0 : modelgroup.children.length - 1]
        }
        
        // Next name
        if (nextChild.position.x < 0) {
            nextPlanetNameRight.innerHTML = nextChild.name

        } else if (nextChild.position.x > 10) {
            nextPlanetNameRight.innerHTML = nextChild.name
        }
        
        gsap.to(child.position, {
            x: nextChild.position.x,
            y: nextChild.position.y,
            z: nextChild.position.z,
            duration: 0.75,
            ease: Power1.easeInOut
        })
    })
}

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

// document.querySelector(".getStarted").addEventListener("click", () => {
//     let tl = gsap.timeline()
//     const discover = document.querySelector(".discover")

//     moveEarthScroll(1)

//     // Animation gsap
//     tl.to(".title", {
//         opacity: 0,
//         duration: 1,
//         ease: Power1.easeInOut
//     })

//     discover.style.display = "block"
//     tl.to(discover, {
//         opacity: 1,
//         duration: 1,
//         ease: Power1.easeInOut
//     })
// })
