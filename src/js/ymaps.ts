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

  if (
    (document.getElementById('map') || document.getElementById('living-map')) &&
    (window.locations?.length || window.livingLocation?.length)
  ) {
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

        addMarkers({
          maps,
          map,
          locations: window.locations,
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

        let bounds = window.livingLocations.reduce<number[][]>(
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

        bounds = [
          [Math.min(bounds[0][0], window.livingLocation[0]), Math.min(bounds[0][1], window.livingLocation[1])],
          [Math.max(bounds[1][0], window.livingLocation[0]), Math.max(bounds[1][1], window.livingLocation[1])],
        ]

        const options =
          window.livingLocations.length > 1
            ? { bounds }
            : {
              center: window.livingLocation,
              zoom: 17,
            }

        const map = new maps.Map('living-map', options)

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

        if (window.livingLocations) {
          addMarkers({
            maps,
            map,
            locations: window.livingLocations,
          })
        }

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
  data:image/svg+xml,%3Csvg width='126' height='116' viewBox='0 0 126 116' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 92C0 83.1634 7.16345 76 16 76H110C118.837 76 126 83.1634 126 92V100C126 108.837 118.837 116 110 116H16C7.16344 116 0 108.837 0 100V92Z' fill='white' /%3E%3Cpath d='M20.1023 95.9091C20.1023 97.0062 19.8968 97.9458 19.4858 98.728C19.0781 99.5069 18.5213 100.103 17.8153 100.518C17.1127 100.932 16.3156 101.139 15.424 101.139C14.5324 101.139 13.7337 100.932 13.0277 100.518C12.325 100.1 11.7682 99.5019 11.3572 98.723C10.9496 97.9408 10.7457 97.0028 10.7457 95.9091C10.7457 94.812 10.9496 93.8741 11.3572 93.0952C11.7682 92.313 12.325 91.7147 13.0277 91.3004C13.7337 90.8861 14.5324 90.679 15.424 90.679C16.3156 90.679 17.1127 90.8861 17.8153 91.3004C18.5213 91.7147 19.0781 92.313 19.4858 93.0952C19.8968 93.8741 20.1023 94.812 20.1023 95.9091ZM18.2479 95.9091C18.2479 95.1368 18.1269 94.4856 17.8849 93.9553C17.6463 93.4216 17.3149 93.0189 16.8906 92.7472C16.4664 92.4721 15.9775 92.3345 15.424 92.3345C14.8705 92.3345 14.3816 92.4721 13.9574 92.7472C13.5331 93.0189 13.2 93.4216 12.9581 93.9553C12.7195 94.4856 12.6001 95.1368 12.6001 95.9091C12.6001 96.6813 12.7195 97.3343 12.9581 97.8679C13.2 98.3982 13.5331 98.8009 13.9574 99.076C14.3816 99.3478 14.8705 99.4837 15.424 99.4837C15.9775 99.4837 16.4664 99.3478 16.8906 99.076C17.3149 98.8009 17.6463 98.3982 17.8849 97.8679C18.1269 97.3343 18.2479 96.6813 18.2479 95.9091ZM20.9474 92.3643V90.8182H29.071V92.3643H25.924V101H24.0945V92.3643H20.9474ZM30.6371 101V90.8182H37.2592V92.3643H32.4815V95.1286H36.9162V96.6747H32.4815V99.4538H37.299V101H30.6371ZM38.4798 101V99.4688L38.7681 99.4538C39.1592 99.4306 39.4691 99.2898 39.6978 99.0312C39.9298 98.7727 40.1005 98.3568 40.2099 97.7834C40.3226 97.21 40.3971 96.4411 40.4336 95.4766L40.6026 90.8182H47.2745V101H45.4698V92.3345H42.3228L42.1637 96.0483C42.1173 97.1619 41.9947 98.085 41.7958 98.8175C41.6003 99.55 41.2788 100.097 40.8313 100.458C40.3872 100.819 39.7691 101 38.9769 101H38.4798ZM50.5334 94.7507H53.1186C53.8975 94.7507 54.5653 94.8783 55.1222 95.1335C55.6823 95.3854 56.1115 95.7417 56.4098 96.2024C56.7081 96.6631 56.8572 97.205 56.8572 97.8281C56.8572 98.4545 56.7081 99.0064 56.4098 99.4837C56.1115 99.9576 55.6823 100.329 55.1222 100.597C54.5653 100.866 53.8975 101 53.1186 101H49.3054V90.8182H51.1548V99.4886H53.1186C53.5296 99.4886 53.8776 99.4107 54.1626 99.255C54.4477 99.0992 54.6631 98.8937 54.8089 98.6385C54.9581 98.3833 55.0327 98.1065 55.0327 97.8082C55.0327 97.3774 54.867 97.0111 54.5355 96.7095C54.2074 96.4046 53.7351 96.2521 53.1186 96.2521H50.5334V94.7507ZM70.8386 94.2536H68.9792C68.9262 93.9486 68.8284 93.6785 68.6859 93.4432C68.5434 93.2045 68.3661 93.0024 68.1539 92.8366C67.9418 92.6709 67.6999 92.5466 67.4281 92.4638C67.1596 92.3776 66.8696 92.3345 66.5581 92.3345C66.0046 92.3345 65.514 92.4737 65.0865 92.7521C64.6589 93.0272 64.3242 93.4316 64.0822 93.9652C63.8403 94.4955 63.7193 95.1435 63.7193 95.9091C63.7193 96.688 63.8403 97.3442 64.0822 97.8778C64.3275 98.4081 64.6622 98.8092 65.0865 99.081C65.514 99.3494 66.0029 99.4837 66.5531 99.4837C66.858 99.4837 67.1431 99.4439 67.4082 99.3643C67.6767 99.2815 67.917 99.1605 68.1291 99.0014C68.3445 98.8423 68.5252 98.6468 68.671 98.4148C68.8201 98.1828 68.9229 97.9176 68.9792 97.6193L70.8386 97.6293C70.769 98.1132 70.6182 98.5672 70.3862 98.9915C70.1575 99.4157 69.8575 99.7902 69.4863 100.115C69.1151 100.437 68.6809 100.688 68.1838 100.871C67.6866 101.05 67.1348 101.139 66.5282 101.139C65.6333 101.139 64.8346 100.932 64.1319 100.518C63.4293 100.103 62.8758 99.5052 62.4714 98.723C62.0671 97.9408 61.8649 97.0028 61.8649 95.9091C61.8649 94.812 62.0687 93.8741 62.4764 93.0952C62.8841 92.313 63.4392 91.7147 64.1419 91.3004C64.8445 90.8861 65.64 90.679 66.5282 90.679C67.095 90.679 67.622 90.7585 68.1092 90.9176C68.5964 91.0767 69.0306 91.3104 69.4118 91.6186C69.7929 91.9235 70.1061 92.2981 70.3514 92.7422C70.6 93.183 70.7624 93.6868 70.8386 94.2536ZM72.5277 101V90.8182H74.3722V99.4538H78.8565V101H72.5277ZM80.4574 101V90.8182H87.0795V92.3643H82.3018V95.1286H86.7365V96.6747H82.3018V99.4538H87.1193V101H80.4574ZM90.3235 90.8182L92.9734 98.8324H93.0778L95.7227 90.8182H97.7511L94.1616 101H91.8846L88.3001 90.8182H90.3235ZM99.0922 101V90.8182H105.714V92.3643H100.937V95.1286H105.371V96.6747H100.937V99.4538H105.754V101H99.0922ZM107.596 101V90.8182H111.414C112.196 90.8182 112.853 90.9541 113.383 91.2259C113.917 91.4976 114.319 91.8788 114.591 92.3693C114.866 92.8565 115.004 93.425 115.004 94.0746C115.004 94.7275 114.865 95.2943 114.586 95.7749C114.311 96.2521 113.905 96.6217 113.368 96.8835C112.831 97.142 112.172 97.2713 111.389 97.2713H108.67V95.7401H111.141C111.598 95.7401 111.973 95.6771 112.264 95.5511C112.556 95.4219 112.771 95.2346 112.911 94.9893C113.053 94.7408 113.124 94.4358 113.124 94.0746C113.124 93.7133 113.053 93.4051 112.911 93.1499C112.768 92.8913 112.551 92.6958 112.259 92.5632C111.968 92.4273 111.592 92.3594 111.131 92.3594H109.441V101H107.596ZM112.856 96.3864L115.377 101H113.318L110.843 96.3864H112.856Z' fill='%231C1C1C' /%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M63.4005 83.91C67.3993 82.0208 100 65.7322 100 36.7917C100 16.4722 83.4345 0 63 0C42.5655 0 26 16.4722 26 36.7917C26 65.7322 58.6007 82.0208 62.5995 83.91C62.8558 84.031 63.1442 84.031 63.4005 83.91ZM63 52.5601C71.7576 52.5601 78.8571 45.5005 78.8571 36.7922C78.8571 28.0838 71.7576 21.0243 63 21.0243C54.2423 21.0243 47.1428 28.0838 47.1428 36.7922C47.1428 45.5005 54.2423 52.5601 63 52.5601Z' fill='%23115A37' /%3E%3Cellipse cx='62.9978' cy='36.7923' rx='15.8571' ry='15.7679' fill='white' /%3E%3C/svg%3E
  `
}

function addMarkers({ maps, locations, map }: { map: any; maps: any; locations: Location[] }) {
  const colors = ['005142', '658B1B', '5B5656', 'E28570']

  locations.forEach((location, index) => {
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
}

export default { init }

interface CustomWindow extends Window {
  coords: [number, number]
  livingLocation: [number, number]
  locations: Location[]
  livingLocations: Location[]
}

interface Location {
  coords: [number, number]
  title: string
  shedule: string[]
  weekend: string
}

declare let window: CustomWindow
