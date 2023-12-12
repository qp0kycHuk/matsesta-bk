import ymaps from 'ymaps'

let mapInited = false

function init() {
  window.addEventListener('scroll', mapsInit, { once: true })
  document.addEventListener('click', mapsInit, { once: true })
  setTimeout(mapsInit, 2000)
}

function mapsInit() {
  if (mapInited) return
  mapInited = true

  if (document.getElementById('map')) {
    ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then((maps: any) => {
      const coords = window.coords
      const center = [coords[0], coords[1]]

      const map = new maps.Map('map', {
        center: center,
        zoom: 16,
      })

      const placemark = new maps.Placemark(
        coords,
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: '../img/geo.svg',
          iconImageSize: [74, 84],
          iconImageOffset: [-(74 / 2), -84],
        }
      )

      map.controls.remove('geolocationControl')
      map.controls.remove('searchControl')
      map.controls.remove('trafficControl')
      map.controls.remove('typeSelector')
      map.controls.remove('fullscreenControl')
      // map.controls.remove('zoomControl')
      map.controls.remove('rulerControl')
      map.behaviors.disable(['scrollZoom'])
      map.geoObjects.add(placemark)
    })
  }
}

export default { init }

interface CustomWindow extends Window {
  coords: [number, number]
}

declare let window: CustomWindow
