import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export const PPI_COOF = 2

export function addControls({ camera, canvas }: { camera: THREE.PerspectiveCamera; canvas: HTMLCanvasElement }) {
  const controls = new OrbitControls(camera, canvas)

  controls.enableZoom = false
  controls.maxPolarAngle = (120 * Math.PI) / 180
  controls.minPolarAngle = (30 * Math.PI) / 180
  controls.update()

  return { controls }
}

export function initCanvasInfo(id: string) {
  const canvas = document.getElementById(id) as HTMLCanvasElement

  if (!canvas) {
    throw new Error('Missing HTMLCanvasElement id="' + id + '"')
  }

  const { width, height } = canvas.getBoundingClientRect()

  canvas.width = width * PPI_COOF
  canvas.height = height * PPI_COOF

  return { canvas, width: width * PPI_COOF, height: height * PPI_COOF }
}

export function initThreeCore({ width, height, canvas }: { width: number; height: number; canvas: HTMLCanvasElement }) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  const render = getRender({ renderer, scene, camera })

  renderer.setSize(width, height, false)

  return { scene, camera, renderer, render }
}

export function getRender({
  renderer,
  scene,
  camera,
}: {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
}) {
  function isNeedResize({ renderer }: { renderer: THREE.WebGLRenderer }) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth * PPI_COOF
    const height = canvas.clientHeight * PPI_COOF
    const needResize = canvas.width !== width || canvas.height !== height

    return needResize
  }

  return () => {
    if (isNeedResize({ renderer })) {
      const canvas = renderer.domElement

      camera.aspect = canvas.width / canvas.height
      renderer.setSize(canvas.width, canvas.height, false)
      camera.updateProjectionMatrix()
    }

    renderer.render(scene, camera)
  }
}
