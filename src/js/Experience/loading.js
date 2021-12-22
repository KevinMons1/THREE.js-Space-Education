import * as THREE from "three"

const counterLoading = document.querySelector(".counterLoading")

export let loadingManager = new THREE.LoadingManager(
    () => {
        
    },
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal
        console.log(`${(progressRatio * 100).toFixed(0)}%`)
        // counterLoading.innerHTML = `${(progressRatio * 100).toFixed(0)}%`
    }
)