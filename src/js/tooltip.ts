import tippy, { createSingleton } from 'tippy.js'

function init() {
  const tippyInstances = tippy('[data-tippy-content]', {})

  const singleton = createSingleton(tippyInstances, {
    moveTransition: 'transform 0.2s ease-out',
    theme: 'custom',
    animation: 'scale',
    delay: [0, 200],
    placement: 'bottom',
  })
}

export default { init }
