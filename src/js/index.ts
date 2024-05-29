import showPass from './show-pass'
import theme from './theme'
import fancybox from './fancybox'
import phonemask from './phonemask/phonemask'
import scrollTo from './scrollTo'
import tab from 'npm-kit-tab'
import toggle from 'npm-kit-toggle'
import ripple from '@qpokychuk/ripple'
import swiper from './swiper'
import animations from './animations'
import ymaps from './ymaps'
import tooltip from './tooltip'
// @ts-ignore
import * as Vue from 'vue/dist/vue.esm-bundler.js'

import '../scss/index.scss'

// @ts-ignore
window.Vue = Vue

window.addEventListener('DOMContentLoaded', () => loadHandler())

function loadHandler() {
  showPass.init()
  scrollTo.init()
  tab.init()
  toggle.init()
  ripple.init()
  theme.init()
  fancybox.init()
  animations.init()
  ymaps.init()
  phonemask.init('[type="tel"]')
  tooltip.init()

  ripple.attach('.btn')
  ripple.attach('.waved')
  ripple.deAttach('.btn-text')

  swiper.init()

  document.addEventListener('toggleopen', toggleOpenHandler)
  document.addEventListener('toggleclose', toggleCloseHandler)
}

const menusIds = ['lk-menu', 'menu', 'catalog-filter']

function toggleOpenHandler(event: any) {
  if (menusIds.includes(event.detail.target.id)) {
    document.body.classList.add('menu-opened')
  }
}

function toggleCloseHandler(event: any) {
  if (menusIds.includes(event.detail.target.id)) {
    document.body.classList.remove('menu-opened')
  }
}
