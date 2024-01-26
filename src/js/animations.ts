import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function init() {
  // animations init
  gsap.registerPlugin(ScrollTrigger)

  if (document.querySelector('.index-about-card-1')) {
    gsap.to('.index-about-card-1', {
      y: 50,
      scrollTrigger: {
        trigger: '.index-about',
        scrub: 3,
      },
    })
  }

  if (document.querySelector('.index-about-card-2')) {
    gsap.to('.index-about-card-2', {
      y: -50,
      scrollTrigger: {
        trigger: '.index-about',
        scrub: 3,
      },
    })
  }
}

export default { init }
