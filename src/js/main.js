import gsap, { Power1 } from "gsap"
import { ScrollTrigger, ScrollToPlugin } from "gsap/all"
import { modelgroup, planetsAnimationScroll } from "./Experience/model"

// Setup
gsap.registerPlugin(ScrollTrigger, CustomEase, ScrollToPlugin)
ScrollTrigger.defaults({ scroller: ".wrapper" })

export const myEasing = CustomEase.create("curstom", "M0,0 C0.476,0 0.926,0.912 1,0.99 ")

const nextPlanetNameRight = document.querySelector(".nextPlanet-name-right")
const nextPlanetNameLeft = document.querySelector(".nextPlanet-name-left")
const btnNextPlanetLeft = document.querySelectorAll(".btnNextPlanetLeft")
const btnNextPlanetRight = document.querySelectorAll(".btnNextPlanetRight")
const titleH2 = document.querySelector(".title-h2")
const titleText = document.querySelector(".title-text")
const learnMoreContent = document.querySelector(".learnMore-content")
const btnGetStarted = document.querySelector(".getStarted")
let animationActive = false // antiSpam
let firstCallWithLoad = true

export const initMain = () => {
    // Animation next planet
    btnNextPlanetLeft[0].addEventListener("click", () => callNextPlanet("right"))
    btnNextPlanetLeft[1].addEventListener("click", () => callNextPlanet("right"))
    btnNextPlanetRight[0].addEventListener("click", () => callNextPlanet("left"))
    btnNextPlanetRight[1].addEventListener("click", () => callNextPlanet("left"))
    window.addEventListener("keydown", e => {
       if (e.key === "ArrowRight") callNextPlanet("left")
       else if (e.key === "ArrowLeft") callNextPlanet("right")
    })

    btnGetStarted.addEventListener("click", () => {
        if (!animationActive) {
            animationActive = true
            planetsAnimationScroll("top")
            goToSection(1, "top")
            setTimeout(() => {
                animationActive = false
            }, 1000)
        }
    })

    // Setup for scroll snip
    gsap.utils.toArray("section").forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            onEnter: () => {
                if (!firstCallWithLoad) {
                    planetsAnimationScroll("bottom")
                    goToSection(i, "bottom")
                } else firstCallWithLoad = false
            } 
        })

        ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            onEnterBack: () => {
                planetsAnimationScroll("top")
                goToSection(i, "top")
            }
        })
    })
}

const callNextPlanet = (direction) => {
    if (!animationActive) {
        animationActive = true
        animationSwitchPlanets(direction)
        setTimeout(() => {
            animationActive = false
        }, 1000)
    }
}

const animationSwitchPlanets = (direction) => {
    gsap.set(".wrapper", { overflowY: "hidden" })

    let savePositionChild = modelgroup.children
    let savePositionNormalize = []
    let modelLength = modelgroup.children.length
    let leftChild = null
    let rightChild = null
    let centerChild = 0

    // Know who is a next right and left planet
    for (let i = 0; i < modelLength; i++) {
        let index = 0

        if (modelgroup.children[i].position.x < -1) {
            index = i - 1 
            if (index <= -1) index = modelLength - 1

            leftChild = index
            
            // Change center name
            if (direction === "right") {
                centerChild = index + 1
                if (centerChild === modelLength) centerChild = 0
            }
        }

        if (modelgroup.children[i].position.x > 1) {
            index = i + 1 
            if (index >= modelLength) index = 0

            rightChild = index

            // Change center name
            if (direction === "left") {
                centerChild = index - 1
                if (centerChild <= -1) centerChild = modelLength - 1
            }
        }
    }

    // Hide for text animation
    hideText()

    // Switch position
    modelgroup.children.forEach((child, i) => {
        // Check what position child will receive for it new position
        let index = direction === "right" ? i + 1 : i - 1
        let lastChild = savePositionChild[index]

        // Search last object for switch to first
        if (lastChild === undefined) {
            index = direction === "right" ? 0 : modelgroup.children.length - 1
            lastChild = savePositionChild[index]
        }      
                
        // Next name
        if (lastChild.position.z > 1) {
            if (direction === "right") {
                // Wait for text animation
                setTimeout(() => {
                    nextPlanetNameRight.innerHTML = lastChild.name
                    nextPlanetNameLeft.innerHTML = modelgroup.children[leftChild].name
                }, 500)
                
            } else if (direction === "left") {
                // Wait for text animation
                setTimeout(() => {
                    nextPlanetNameRight.innerHTML = modelgroup.children[rightChild].name
                    nextPlanetNameLeft.innerHTML = lastChild.name
                }, 500)
            }

            setTimeout(() => {
                titleH2.innerHTML = modelgroup.children[centerChild].name
                titleText.innerHTML = modelgroup.children[centerChild].littleDescription
            }, 500);
        }
        
        // Change planets position
        gsap.to(child.position, {
            x: lastChild.position.x,
            y: lastChild.position.y,
            z: lastChild.position.z,
            duration: 1,
            ease: Power1.easeInOut
        })

        savePositionNormalize.push(lastChild.positionNormalize)
    })

    // Change all positionNormalize
    modelgroup.children.forEach((child, i) => {
        child.positionNormalize = savePositionNormalize[i]
    })

    showText()
    
    setTimeout(() => {
        gsap.set(".wrapper", { overflowY: "auto" })
    }, 1000);
}

const hideText = () => {
    gsap.to(nextPlanetNameLeft, {
        filter: "blur(15px)",
        duration: 0.5,
        ease: Power1.easeInOut
    })
    gsap.to(nextPlanetNameRight, {
        filter: "blur(15px)",
        duration: 0.5,
        ease: Power1.easeInOut
    })
    gsap.to(titleH2, {
        filter: "blur(30px)",
        duration: 0.5,
        ease: Power1.easeInOut
    })
    gsap.to(titleText, {
        filter: "blur(5px)",
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: Power1.easeInOut
    })
}

const showText = () => {
    // Show for text animation
    gsap.to(nextPlanetNameLeft, {
        filter: "blur(0px)",
        duration: 0.5,
        delay: 0.5,
        ease: Power1.easeInOut
    })
    gsap.to(nextPlanetNameRight, {
        filter: "blur(0px)",
        duration: 0.5,
        delay: 0.5,
        ease: Power1.easeInOut
    })
    gsap.to(titleH2, {
        filter: "blur(0px)",
        duration: 0.5,
        delay: 0.5,
        ease: Power1.easeInOut
    })

    gsap.to(titleText, {
        y: 40,
        duration: 0.01,
        delay: 0.51,
        ease: Power1.easeInOut
    })

    gsap.to(titleText, {
        filter: "blur(0px)",
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.51,
        ease: Power1.easeInOut
    })
}

// Animation for change section
const goToSection = (i, direction) => {
    gsap.set(".wrapper", { overflowY: "hidden" })

    const offset = i === 0 ? -50 : 50 // for correct a litle offset with the scrollbar

    gsap.to(".wrapper", {
        scrollTo: {
            y: i * window.innerHeight + offset,
            autoKill: false
        },
        duration: 0.75,
        overwrite: true,
        ease: myEasing,
        onComplete: () => gsap.set(".wrapper", { overflowY: "auto" })
    })

    if (direction === "bottom") {
        gsap.from(learnMoreContent, {
            filter: "blur(15px)",
            opacity: 0,
            duration: 1,
            ease: Power1.easeInOut
        })
    }
}