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

  if (document.getElementById('map') && window.locations?.length) {
    ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then((maps: any) => {
      // const coords = window.coords
      // const center = [coords[0], coords[1]]

      const bounds = window.locations.reduce<number[][]>(
        (acc, current) => {
          return [
            [Math.min(acc[0][0], current.coords[0]), Math.min(acc[0][1], current.coords[1])],
            [Math.max(acc[1][0], current.coords[0]), Math.max(acc[1][1], current.coords[1])],
          ]
        },
        [
          [Infinity, Infinity],
          [-Infinity, -Infinity],
        ]
      )

      const options =
        window.locations.length > 1
          ? { bounds }
          : {
            center: window.locations[0]?.coords,
            zoom: 17,
          }

      const map = new maps.Map('map', options)

      const colors = ['005142', '658B1B', '5B5656', 'E28570']

      window.locations.forEach((location, index) => {
        const placemark = new maps.Placemark(
          location.coords,
          {
            balloonContent: `
              <div class="text-center py-4 w-44">
                <div class="font-semibold ">${location.title}</div>
                <div class="mt-3 ">Режим работы:</div>
                <div class="mt-1  leading-normal max-sm:text-sm">
                  ${location.shedule.join('<br>')}
                </div>
                <div class="mt-3 ">
                  ${location.weekend}
                </div>
              </div>
            `,
          },
          {
            iconLayout: 'default#image',
            iconImageHref: getIcon(colors[index % colors.length]),
            iconImageSize: [74 / 2, 84 / 2],
            iconImageOffset: [-(74 / 2 / 2), -84 / 2],
            hasBalloon: true,
            openBalloonOnClick: true,
            hideIconOnBalloonOpen: false,
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
    })
  }
}

function getIcon(color: string) {
  return `
  data:image/svg+xml,%3Csvg width='74' height='84' viewBox='0 0 74 84' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M37.4005 83.91C41.3993 82.0208 74 65.7322 74 36.7917C74 16.4722 57.4345 0 37 0C16.5655 0 0 16.4722 0 36.7917C0 65.7322 32.6007 82.0208 36.5995 83.91C36.8558 84.031 37.1442 84.031 37.4005 83.91ZM37 52.5601C45.7576 52.5601 52.8571 45.5005 52.8571 36.7922C52.8571 28.0838 45.7576 21.0243 37 21.0243C28.2423 21.0243 21.1428 28.0838 21.1428 36.7922C21.1428 45.5005 28.2423 52.5601 37 52.5601Z' fill='%23${color}'/%3E%3Cellipse cx='36.9975' cy='36.7923' rx='15.8571' ry='15.7679' fill='white'/%3E%3C/svg%3E
  `
}

export default { init }

interface CustomWindow extends Window {
  coords: [number, number]
  locations: Location[]
}

interface Location {
  coords: [number, number]
  title: string
  shedule: string[]
  weekend: string
}

declare let window: CustomWindow
