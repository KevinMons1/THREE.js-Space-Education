import gsap, { Power1 } from "gsap"
import { initWorld } from "./Experience/world"
import { initMain } from "./main"
import { initHeader } from "./header"

const alert = document.querySelector(".alert")
const alertClose = document.querySelector(".alert-close")
const itemsBlocked = document.querySelectorAll(".items-blocked")

// Create world 3D
initWorld()

initMain()
initHeader()

// Show alert for each items blocked
itemsBlocked.forEach(item => {
    item.addEventListener("click", () => {
        alert.style.display = "block"
    })
})

alertClose.addEventListener("click", () => {
    alert.style.display = "none"
})

gsap.set(".wrapper", { overflowY: "hidden" })
export const apparition = () => {
    let tl = gsap.timeline()

    if (window.innerWidth >= 768) {
        tl.from("header", {
            yPercent: -120,
            opacity: 0,
            duration: 1,
            ease: Power1.easeInOut
        })
    }
    
    tl.from(".title-content", {
        opacity: 0,
        duration: 1,
        ease: Power1.easeInOut
    })

    gsap.to(".weblg1", {
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: Power1.easeInOut
    })

    gsap.to(".nextPlanet-content", {
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: Power1.easeInOut
    })
    setTimeout(() => {
        gsap.set(".wrapper", { overflowY: "auto" })
    }, 2000);
}
