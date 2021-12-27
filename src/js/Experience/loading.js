import * as THREE from "three"
import gsap, { Power1 } from "gsap"

const loader = document.querySelector(".loader")
const counterLoading = document.querySelector(".loader-count")

export let loadingManager = new THREE.LoadingManager(
    () => {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            ease: Power1.easeIn,
            onComplete: () => setTimeout(() => {
                loader.style.display = "none"
            }, 500)
        })
    },
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal
        counterLoading.innerHTML = `${(progressRatio * 100).toFixed(0)}%`
    }
)