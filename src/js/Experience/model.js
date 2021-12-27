import * as THREE from "three"
import gsap from "gsap"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { scene } from "./world"
import { loadingManager } from "./loading"
import { camera } from "./camera"
import { myEasing } from "../main"
import { apparition } from "../index"

// Export
export const modelgroup = new THREE.Group()
export const planetsPosition = [
    {x: 0, y: -0.2, z: 8.5},
    {x: 1, y: 0, z: 0},
    {x: 0, y: 0, z: -100},
    {x: 0, y: 0, z: -100},
    {x: 0, y: 0, z: -100},
    {x: 0, y: 0, z: -100},
    {x: 0, y: 0, z: -100},
    {x: -1, y: 0, z: 0}
]

// Globale variable
const learnMoreText = document.querySelector(".learnMore-text")
const learnMoreName = document.querySelector(".learnMore-name")
const learnMoreTitle = document.querySelector(".learnMore-title")
const names = ["EARTH", "MARS", "SUN", "VENUS", "URANUS", "MERCURY", "SATURN", "NEPTUNE"]
const littleDescriptions = [
    `Learn more about this facinating miracle that we call our home, Planet Earth. Course enrollment starts today. Early Bird tickets typically last a week, don't miss out!`,
    `Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet"`,
    `The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating the energy mainly as visible light, ultraviolet light, and infrared radiation`,
    `Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be visible to the naked eye in broad daylight`,
    `Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the great-grandfather of Ares (Mars), grandfather of Zeus (Jupiter) and father of Cronus (Saturn).`,
    `Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets.`,
    `Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth.`,
    `Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.`,
]
const bigDescriptions = [
    `Earth is the third planet from the Sun and the only astronomical object known to harbour and support life. 29.2% of Earth's surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere. Much of Earth's polar regions is covered in ice. Earth's outer layer is divided into several rigid tectonic plates that migrate across the surface over many millions of years, while its interior remains active with a solid iron inner core, a liquid outer core that generates Earth's magnetic field, and a convective mantle that drives plate tectonics.`,
    `Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet". The latter refers to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance (as shown), that is distinctive among the astronomical bodies visible to the naked eye. Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon, and the valleys, deserts and polar ice caps of Earth.`,
    `The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating the energy mainly as visible light, ultraviolet light, and infrared radiation. It is by far the most important source of energy for life on Earth. Its diameter is about 1.39 million kilometres (864,000 miles), or 109 times that of Earth. Its mass is about 330,000 times that of Earth, and it accounts for about 99.86% of the total mass of the Solar System. Roughly three quarters of the Sun's mass consists of hydrogen (~73%); the rest is mostly helium (~25%), with much smaller quantities of heavier elements, including oxygen, carbon, neon and iron`,
    `Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be visible to the naked eye in broad daylight. Venus lies within Earth's orbit, and so never appears to venture far from the Sun, either setting in the west just after dusk or rising in the east a little while before dawn. Venus orbits the Sun every 224.7 Earth days. It has a synodic day length of 117 Earth days and a sidereal rotation period of 243 Earth days. As a consequence, it takes longer to rotate about its axis than any other planet in the Solar System, and does so in the opposite direction to all but Uranus. This means the Sun rises in the west and sets in the east. Venus does not have any moons, a distinction it shares only with Mercury among the planets in the Solar System`,
    `Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the great-grandfather of Ares (Mars), grandfather of Zeus (Jupiter) and father of Cronus (Saturn). It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is similar in composition to Neptune, and both have bulk chemical compositions which differ from that of the larger gas giants Jupiter and Saturn. For this reason, scientists often classify Uranus and Neptune as "ice giants" to distinguish them from the other giant planets. Uranus's atmosphere is similar to Jupiter's and Saturn's in its primary composition of hydrogen and helium, but it contains more "ices" such as water, ammonia, and methane, along with traces of other hydrocarbons. It has the coldest planetary atmosphere in the Solar System, with a minimum temperature of 49 K (−224 °C; −371 °F), and has a complex, layered cloud structure with water thought to make up the lowest clouds and methane the uppermost layer of clouds. The interior of Uranus is mainly composed of ices and rock.`,
    `Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. It is named after the Roman god Mercurius (Mercury), god of commerce, messenger of the gods, and mediator between gods and mortals, corresponding to the Greek god Hermes (Ἑρμῆς). Like Venus, Mercury orbits the Sun within Earth's orbit as an inferior planet, and its apparent distance from the Sun as viewed from Earth never exceeds 28°. This proximity to the Sun means the planet can only be seen near the western horizon after sunset or the eastern horizon before sunrise, usually in twilight. At this time, it may appear as a bright star-like object, but is more difficult to observe than Venus. From Earth, the planet telescopically displays the complete range of phases, similar to Venus and the Moon, which recurs over its synodic period of approximately 116 days.`,
    `Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It only has one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive. Saturn is named after the Roman god of wealth and agriculture. Its astronomical symbol (♄) has been traced back to the Greek Oxyrhynchus Papyri, where it can be seen to be a Greek kappa-rho with a cross-bar, as an abbreviation for Κρονος (Cronos), the Greek name for the planet. It later came to look like a lower-case Greek eta, with the cross added at the top in the 16th century.`,
    `Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, slightly more massive than its near-twin Uranus. Neptune is denser and physically smaller than Uranus because its greater mass causes more gravitational compression of its atmosphere. The planet orbits the Sun once every 164.8 years at an average distance of 30.1 AU (4.5 billion km; 2.8 billion mi). It is named after the Roman god of the sea and has the astronomical symbol ♆, a stylised version of the god Neptune's trident or the Greek letter psi.`,
]
const nickNames = [
    "The blue planet", "The red planet", "The light", "Shepherd's Star", "Planet lying down", "Messenger of the gods", "Lord of the Rings", "Twin of uranus"
]
let models = [null, null, null, null, null, null, null, null] // I prepar a array because asyn/await not working and give me a error

// Download model
export const initModel = () => {
    const earthModel = loadModel("model/planets/earth/scene.gltf", 0.2, 0)
    const marsModel = loadModel("model/planets/mars/scene.gltf", 0.01, 1)
    const sunModel = loadModel("model/planets/sun/scene.gltf", 0.4, 2)
    const venusModel = loadModel("model/planets/venus/scene.gltf",  0.5, 3)
    const uranusModel = loadModel("model/planets/uranus/scene.gltf", 0.9, 4)
    const mercuryModel = loadModel("model/planets/mercury/scene.gltf", 0.9, 5)
    const saturnModel = loadModel("model/planets/saturn/scene.gltf", 0.01, 6)
    const neptuneModel = loadModel("model/planets/neptune/scene.gltf", 0.91, 7)
}

const loadModel = (path, scale, i) => {
    const gltfLoader = new GLTFLoader(loadingManager)

    gltfLoader.load(path, (gltf) => {  
        const pos = getPositionInRelationToScreen(planetsPosition[i])

        gltf.scene.scale.set(scale, scale, scale)
        gltf.scene.position.set(pos.x, pos.y, planetsPosition[i].z)
        gltf.scene.positionNormalize = planetsPosition[i] // Position between 0 and -1 for placed according to the screen
        gltf.scene.name = names[i] // name
        gltf.scene.littleDescription = littleDescriptions[i] // description for the first section
        gltf.scene.bigDescription = bigDescriptions[i] // description for the second section
        gltf.scene.nickName = nickNames[i] // nickname for the second section
        gltf.scene.screenChanged = false // now if screen changed when user was in the second section for change when user back to first section
        gltf.scene.sectionMore = false // stop some fonction if user is in the second section

        // modelgroup.add(gltf.scene)
        models[i] = gltf.scene
        const checkAllLoaded = models.includes(null)

        if (!checkAllLoaded) {
            spawnModelLoaded()
        }
    })
}

const spawnModelLoaded = () => {
    models.forEach((model, i) => {
        modelgroup.add(model)
        
        if (i === models.length - 1) {
            scene.add(modelgroup)
            apparition()
        }
    })
}

export const planetsAnimationScroll = (direction) => {
    modelgroup.children.forEach((child, i) => {
        if (direction === "bottom" && !child.sectionMore) {
            if (child.position.z < 1) {
                gsap.to(child.position, {
                    y: 10,
                    duration: 0.75,
                    ease: myEasing,
                    
                })
            } else {
                learnMoreTitle.innerHTML = child.nickName
                learnMoreName.innerHTML = child.name
                learnMoreText.innerHTML = child.bigDescription
                
                const position = getPositionInRelationToScreen({x: 0.09, y: 0})
                gsap.to(child.position, {
                    x: position.x,
                    y: 0,
                    z: 7.5,
                    duration: 0.75,
                    ease: myEasing,
                })
            }

            child.sectionMore = true

        } else if (direction === "top" && child.sectionMore) {
            if (child.position.y > 5) {
                if (child.screenChanged) { // screenChanged ? see the model init for known
                    let newPosition = getPositionInRelationToScreen(child.positionNormalize)

                    gsap.to(child.position, {
                        y: 0,
                        x: newPosition.x,
                        duration: 0.75,
                        ease: myEasing,
                    })

                    child.screenChanged = false
                } else {
                    gsap.to(child.position, {
                        y: 0,
                        duration: 0.75,
                        ease: myEasing,
                        
                    })
                }
            } else {
                const position = getPositionInRelationToScreen(planetsPosition[0])
                gsap.to(child.position, {
                    x: position.x,
                    y: position.y,
                    z: planetsPosition[0].z,
                    duration: 0.75,
                    ease: myEasing,
                })
            }
            child.sectionMore = false
        }
    })
}

// https://stackoverflow.com/questions/36033879/three-js-object-follows-mouse-position
export const getPositionInRelationToScreen = (position) => {
    // x: 0, y: -1 center bottom
    // x: 0, y: 0 center center
    // x: -1, y: 0 left centrer
    // x: 1, y: 0 right center

    var vector = new THREE.Vector3(position.x, position.y, 0.5)
    vector.unproject(camera)
    var dir = vector.sub(camera.position).normalize()
    var distance = - camera.position.z / dir.z
    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) )
    return pos
}

export const givePosition = () => {
    modelgroup.children.forEach((child, i) => {
        if (!child.sectionMore) {
            const position = getPositionInRelationToScreen(child.positionNormalize)
            child.position.set(position.x, position.y, child.positionNormalize.z)
        }
    })
}