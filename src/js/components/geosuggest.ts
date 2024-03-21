import { debounce } from 'throttle-debounce'

class GeoSuggest extends HTMLElement {
  inputEl: HTMLInputElement | null = null
  suggestListEl = document.createElement('div')
  suggestItems: HTMLElement[] = []
  isFocus = false
  isLoading = false
  debouncedChangeHandler = debounce(1000, this.changeHandler)
  renderTimeOutId?: NodeJS.Timeout

  constructor() {
    super()
  }

  connectedCallback() {
    this.inputEl = this.querySelector('input[type="text"]')

    if (!this.inputEl) {
      console.warn('Web component GeoSuggest require input[type="text"] child element')

      return
    }

    this.inputEl.addEventListener('focus', this.focusHandler.bind(this))
    this.inputEl.addEventListener('blur', this.blurHandler.bind(this))
    this.inputEl.addEventListener('input', this.inputHandler.bind(this))

    this.classList.add('geo-suggest')
    this.suggestListEl.classList.add('geo-suggest-items')
    this.appendChild(this.suggestListEl)

    this.render()
  }

  inputHandler() {
    this.isLoading = true
    this.debouncedChangeHandler()
    this.render()
  }

  async changeHandler() {
    if (!this.inputEl?.value) {
      return
    }

    const items = await this.getItems()

    this.isLoading = false

    this.suggestItems = items.results.map((result) => {
      const el = document.createElement('div')

      el.classList.add('geo-suggest-item')

      el.textContent = result.title.text

      el.addEventListener('click', () => {
        console.log('click', result.title.text)
        ;(this.inputEl as HTMLInputElement).value = result.title.text
      })

      return el
    })

    this.render()
  }

  focusHandler() {
    clearTimeout(this.renderTimeOutId)
    this.isFocus = true
    this.isLoading = true
    this.debouncedChangeHandler()
    this.render()
  }

  blurHandler() {
    this.isFocus = false
    clearTimeout(this.renderTimeOutId)
    this.renderTimeOutId = setTimeout(this.render.bind(this), 200)
  }

  async getPlaceholderItems() {
    await Promise.resolve()

    return {
      suggest_reqid: '1711015247067199-2475920139-suggest-maps-yp-15',
      results: [
        {
          title: {
            text: 'Краснодар',
            hl: [
              {
                begin: 0,
                end: 9,
              },
            ],
          },
          tags: ['locality'],
          distance: {
            value: 6296501.773,
            text: '6296.50 км',
          },
        },
        {
          title: {
            text: 'посёлок Краснодарский',
            hl: [
              {
                begin: 8,
                end: 17,
              },
            ],
          },
          subtitle: {
            text: 'муниципальное образование Краснодар',
            hl: [
              {
                begin: 26,
                end: 35,
              },
            ],
          },
          tags: ['locality'],
          distance: {
            value: 6304298.524,
            text: '6304.30 км',
          },
        },
        {
          title: {
            text: 'Новороссийск',
          },
          subtitle: {
            text: 'Краснодарский край',
            hl: [
              {
                begin: 0,
                end: 9,
              },
            ],
          },
          tags: ['locality'],
          distance: {
            value: 6201816.827,
            text: '6201.82 км',
          },
        },
        {
          title: {
            text: 'СНТ Краснодарсельмаш-1',
            hl: [
              {
                begin: 4,
                end: 13,
              },
            ],
          },
          subtitle: {
            text: 'посёлок Знаменский, муниципальное образование Краснодар',
            hl: [
              {
                begin: 46,
                end: 55,
              },
            ],
          },
          tags: ['locality'],
          distance: {
            value: 6310527.444,
            text: '6310.53 км',
          },
        },
        {
          title: {
            text: 'Сочи',
          },
          subtitle: {
            text: 'Краснодарский край',
            hl: [
              {
                begin: 0,
                end: 9,
              },
            ],
          },
          tags: ['locality'],
          distance: {
            value: 6237869.701,
            text: '6237.87 км',
          },
        },
        {
          title: {
            text: 'садовое товарищество Краснодарсельмаш-2',
            hl: [
              {
                begin: 21,
                end: 30,
              },
            ],
          },
          subtitle: {
            text: 'посёлок Знаменский, муниципальное образование Краснодар',
            hl: [
              {
                begin: 46,
                end: 55,
              },
            ],
          },
          tags: ['locality'],
          distance: {
            value: 6310921.427,
            text: '6310.92 км',
          },
        },
        {
          title: {
            text: 'садовое товарищество Краснодаргорстрой',
            hl: [
              {
                begin: 21,
                end: 30,
              },
            ],
          },
          subtitle: {
            text: 'муниципальное образование Краснодар',
            hl: [
              {
                begin: 26,
                end: 35,
              },
            ],
          },
          tags: ['locality'],
          distance: {
            value: 6305138.906,
            text: '6305.14 км',
          },
        },
      ],
    }
  }

  async getItems() {
    return fetch(
      'https://suggest-maps.yandex.ru/v1/suggest?' +
        new URLSearchParams({
          apikey: process.env.YAMAPS_API_KEY as string,
          text: this.inputEl?.value || '',
          types: 'locality',
        })
    ).then<SuggestResponse>((response) => response.json())
  }

  render() {
    if (!this.isFocus || !this.inputEl?.value) {
      this.suggestListEl.style.display = 'none'

      return
    }

    this.suggestListEl.style.display = ''

    if (this.isLoading) {
      this.suggestListEl.innerHTML = 'Загрузка'

      return
    }

    this.suggestListEl.innerHTML = ''
    this.suggestItems.forEach((el) => this.suggestListEl.appendChild(el))
  }
}

function register() {
  customElements.define('geo-suggest', GeoSuggest)
}

export default { register }

type SuggestResponse = {
  results: SuggestResponseResult[]
}

type SuggestResponseResult = {
  title: Text
  subtitle: Text
  tags: string[]
  address: {
    formatted_address: string
  }
}

type Text = {
  text: string
  hl: {
    begin: number
    end: number
  }[]
}
