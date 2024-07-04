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

  if ((document.getElementById('map') || document.getElementById('living-map')) && window.locations?.length) {
    ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then((maps: any) => {
      // Обычная крта
      if (document.getElementById('map')) {
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

          map.geoObjects.add(placemark)
        })

        map.controls.remove('geolocationControl')
        map.controls.remove('searchControl')
        map.controls.remove('trafficControl')
        map.controls.remove('typeSelector')
        map.controls.remove('fullscreenControl')
        // map.controls.remove('zoomControl')
        map.controls.remove('rulerControl')
        map.behaviors.disable(['scrollZoom'])
      }

      // Карта н странице проживание
      if (document.getElementById('living-map')) {
        const coords = window.livingLocation

        console.log(window.livingLocation)

        const map = new maps.Map('living-map', {
          center: coords,
          zoom: 17,
        })

        const placemark = new maps.Placemark(
          coords,
          {},
          {
            iconLayout: 'default#image',
            iconImageHref: getCleverIcon(),
            iconImageSize: [126, 116],
            iconImageOffset: [-(126 / 2), -116 + 31],
            hasBalloon: true,
            openBalloonOnClick: true,
            hideIconOnBalloonOpen: false,
          }
        )

        map.geoObjects.add(placemark)

        map.controls.remove('geolocationControl')
        map.controls.remove('searchControl')
        map.controls.remove('trafficControl')
        map.controls.remove('typeSelector')
        map.controls.remove('fullscreenControl')
        // map.controls.remove('zoomControl')
        map.controls.remove('rulerControl')
        map.behaviors.disable(['scrollZoom'])
      }
    })
  }
}

function getIcon(color: string) {
  return `
  data:image/svg+xml,%3Csvg width='74' height='84' viewBox='0 0 74 84' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M37.4005 83.91C41.3993 82.0208 74 65.7322 74 36.7917C74 16.4722 57.4345 0 37 0C16.5655 0 0 16.4722 0 36.7917C0 65.7322 32.6007 82.0208 36.5995 83.91C36.8558 84.031 37.1442 84.031 37.4005 83.91ZM37 52.5601C45.7576 52.5601 52.8571 45.5005 52.8571 36.7922C52.8571 28.0838 45.7576 21.0243 37 21.0243C28.2423 21.0243 21.1428 28.0838 21.1428 36.7922C21.1428 45.5005 28.2423 52.5601 37 52.5601Z' fill='%23${color}'/%3E%3Cellipse cx='36.9975' cy='36.7923' rx='15.8571' ry='15.7679' fill='white'/%3E%3C/svg%3E
  `
}

function getCleverIcon() {
  return `
  data:image/svg+xml,%3Csvg width='126' height='116' viewBox='0 0 126 116' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 92a16 16 0 0 1 16-16h94a16 16 0 0 1 16 16v8a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16v-8Z' fill='%23fff'/%3E%3Cpath d='M27.6 96a6 6 0 0 1-.6 2.7 4.4 4.4 0 0 1-4 2.4c-1 0-1.8-.2-2.5-.6-.7-.4-1.2-1-1.6-1.8a6 6 0 0 1-.7-2.8c0-1 .2-2 .7-2.8a4.4 4.4 0 0 1 4-2.4 4.4 4.4 0 0 1 4 2.4c.5.8.7 1.7.7 2.8Zm-1.9 0c0-.9 0-1.5-.3-2-.3-.6-.6-1-1-1.3-.4-.2-1-.4-1.5-.4s-1 .2-1.4.4c-.5.3-.8.7-1 1.3-.3.5-.4 1.1-.4 2 0 .7.1 1.3.4 1.9.2.5.5.9 1 1.2.4.2.9.4 1.4.4.6 0 1-.2 1.5-.4.4-.3.7-.7 1-1.2.2-.6.3-1.2.3-2Zm3.1-1.2v-1.4h6.7v1.4h-2.4v6.2h-1.8v-6.2h-2.5Zm11.2 6.3a4 4 0 0 1-2-.4c-.5-.4-1-.8-1.2-1.4a4.5 4.5 0 0 1 0-4.2 3.4 3.4 0 0 1 3.1-1.8c.5 0 1 0 1.4.2.4.1.8.4 1 .7.4.3.7.7.8 1.2.2.5.3 1 .3 1.7v.6h-6.2v-1.2h4.5c0-.4 0-.7-.2-1l-.6-.6c-.3-.2-.6-.2-1-.2-.3 0-.6 0-1 .2l-.6.7a2 2 0 0 0-.2 1v1c0 .5 0 .9.2 1.2l.7.7c.3.2.7.2 1 .2h.8l.5-.4.4-.5 1.7.2-.7 1.1a3 3 0 0 1-1 .8c-.5.2-1 .2-1.7.2Zm4.4-.1v-1.5h.3l.5-.1.3-.5.2-.8.1-1.4.2-3.3h5.5v7.6h-1.7v-6.2h-2.2l-.1 2.5a9 9 0 0 1-.2 1.7l-.5 1.1-.8.7-1 .2h-.6Zm10.2-5.2h2.2c1 0 1.7.3 2.3.8.5.4.8 1 .8 1.8 0 .5-.1 1-.4 1.4-.2.3-.6.7-1 .9-.5.2-1 .3-1.7.3h-3.5v-7.6h1.8v6.1h1.7c.4 0 .7 0 1-.3.2-.2.4-.4.4-.8a1 1 0 0 0-.4-.8c-.3-.2-.6-.3-1-.3h-2.2v-1.5Zm19-1.5h-1.8a2.3 2.3 0 0 0-.8-1.5c-.2-.1-.4-.3-.7-.3a2.8 2.8 0 0 0-2.4.3c-.4.2-.7.6-1 1.2-.2.5-.3 1.1-.3 2 0 .7 0 1.3.3 1.9.3.5.6 1 1 1.2.5.2 1 .4 1.5.4l.9-.1a2.3 2.3 0 0 0 1.2-1c.2-.2.3-.5.3-.8h1.9A4 4 0 0 1 71 101l-1.6.2a4.3 4.3 0 0 1-4-2.4 6 6 0 0 1-.7-2.8c0-1 .2-2 .6-2.8a4.4 4.4 0 0 1 4-2.4c.6 0 1.2 0 1.7.2l1.3.7.9 1.1c.3.5.4 1 .5 1.6Zm3.5-3.5V101h-1.8V90.8h1.8Zm5.2 10.3a4 4 0 0 1-2-.4c-.5-.4-1-.8-1.2-1.4a4.5 4.5 0 0 1 0-4.2 3.4 3.4 0 0 1 3.1-1.8c.5 0 1 0 1.4.2.4.1.8.4 1 .7.4.3.7.7.8 1.2.2.5.3 1 .3 1.7v.6h-6.2v-1.2H84c0-.4 0-.7-.2-1l-.6-.6c-.3-.2-.6-.2-1-.2-.3 0-.6 0-1 .2l-.6.7a2 2 0 0 0-.2 1v1c0 .5 0 .9.3 1.2.1.3.3.5.6.7.3.2.7.2 1 .2h.8l.5-.4.4-.5 1.7.2-.7 1.1a3 3 0 0 1-1 .8c-.5.2-1 .2-1.7.2ZM94 93.4 91 101h-2l-2.7-7.6h2L90 99l1.8-5.6h2Zm4.3 7.7a4 4 0 0 1-2-.4c-.5-.4-1-.8-1.2-1.4a4.5 4.5 0 0 1 0-4.2 3.4 3.4 0 0 1 3.1-1.8c.5 0 1 0 1.4.2.4.1.7.4 1 .7.4.3.6.7.8 1.2.2.5.3 1 .3 1.7v.6h-6.2v-1.2h4.5c0-.4 0-.7-.2-1L99 95c-.3-.2-.6-.2-1-.2-.3 0-.6 0-1 .2l-.6.7a2 2 0 0 0-.2 1v1c0 .5 0 .9.2 1.2l.7.7c.3.2.7.2 1 .2h.8l.5-.4.4-.5 1.6.2c0 .4-.3.8-.6 1.1a3 3 0 0 1-1.1.8c-.5.2-1 .2-1.6.2Zm5-.1v-7.6h1.7v1.2a1.9 1.9 0 0 1 2-1.3 4.1 4.1 0 0 1 .6 0V95l-.4-.1h-.4c-.4 0-.7 0-1 .2a1.6 1.6 0 0 0-.8 1.4v4.5h-1.8Z' fill='%231C1C1C'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M63.4 84c4-2 36.6-18.3 36.6-47.2A36.9 36.9 0 0 0 63 0C42.6 0 26 16.5 26 36.8c0 29 32.6 45.2 36.6 47.1.3.1.5.1.8 0ZM63 52.5A15.8 15.8 0 1 0 63 21c-8.8 0-15.9 7-15.9 15.7S54.2 52.6 63 52.6Z' fill='%23115A37'/%3E%3Cellipse cx='63' cy='36.8' rx='15.9' ry='15.8' fill='%23fff'/%3E%3C/svg%3E
  `
}

export default { init }

interface CustomWindow extends Window {
  coords: [number, number]
  livingLocation: [number, number]
  locations: Location[]
}

interface Location {
  coords: [number, number]
  title: string
  shedule: string[]
  weekend: string
}

declare let window: CustomWindow
