import gsap, { Power1 } from "gsap"

const header = document.querySelector("header")
const headerHamburger = document.querySelector(".header-hamburger")

let headerActive = false

export const initHeader = () => {
    headerHamburger.addEventListener("click", () => {
        if (headerActive) {
            headerHamburger.classList.remove("active")
            gsap.to(header, {
                xPercent: -120,
                duration: 0.75,
                ease: Power1.easeInOut
            })
        } else {
            headerHamburger.classList.add("active")
            gsap.to(header, {
                xPercent: 120,
                duration: 0.75,
                ease: Power1.easeInOut
            })
        }

        headerActive = !headerActive
    })

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            header.style.transform = "translateX(-50%)"
        } else {
            header.style.transform = "translateX(-120%)"
        }
    })
}
