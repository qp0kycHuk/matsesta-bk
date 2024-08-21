class Counter extends HTMLElement {
  min = 0
  max = 0
  value = 0
  wrapEl = document.createElement('div')
  inputEl = document.createElement('input')
  minusButton = document.createElement('button')
  plusButton = document.createElement('button')

  timeout?: NodeJS.Timeout
  timeoutIteration = 0
  defaultInterval = 320

  wrapperClassName = 'input !border-none !shadow-none relative gap-2.5 flex items-center justify-between relative'
  inputClassName = 'input rounded-xl text-center grow absolute inset-0 size-full apperance-none'
  minusClassName = 'btn btn-xs btn-icon rounded-md z-[2]'
  plusClassName = 'btn btn-xs btn-icon rounded-md z-[2]'

  constructor() {
    super()
    this.addListeners()
  }

  setValue(value: number | string) {
    this.value = Math.max(
      this.min,
      Math.min(this.max, isNaN(parseInt(value as string)) ? 0 : parseInt(value as string))
    )
    this.inputEl && (this.inputEl.value = this.value.toString())
  }

  decrement() {
    this.setValue(this.value - 1)
  }

  increment() {
    this.setValue(this.value + 1)
  }

  changeHandler(event: Event) {
    this.setValue((event.target as HTMLInputElement)?.value || '0')
  }

  connectedCallback() {
    const min = parseInt(this.getAttribute('min') || this.getAttribute('data-min') || '')
    const max = parseInt(this.getAttribute('max') || this.getAttribute('data-max') || '')
    const value = parseInt(this.getAttribute('value') || '')
    const name = this.getAttribute('name') || ''

    this.min = isNaN(min) ? -Infinity : min
    this.max = isNaN(max) ? Infinity : max
    this.setValue(value)

    this.inputEl.setAttribute('name', name)
    this.initElements()
  }

  initElements() {
    this.classList.add(...this.wrapperClassName.trim().split(' '))

    this.inputEl.className = this.inputClassName
    this.inputEl.type = 'number'

    this.minusButton.type = 'button'
    this.minusButton.className = this.minusClassName
    this.minusButton.innerHTML = `
      <div class="absolute -inset-2"></div>
      <span class="opacity-50 text-2xl">-</span>
    `

    this.plusButton.type = 'button'
    this.plusButton.className = this.plusClassName
    this.plusButton.innerHTML = `
      <div class="absolute -inset-2"></div>
      <span class="opacity-50 text-2xl">+</span>
    `

    this.appendChild(this.inputEl)
    this.appendChild(this.minusButton)
    this.appendChild(this.plusButton)
  }

  addListeners() {
    this.inputEl?.addEventListener('input', this.changeHandler.bind(this))

    this.minusButton?.addEventListener('click', this.decrement.bind(this))
    this.minusButton?.addEventListener('pointerdown', this.touchStartHandler.bind(this, this.decrement.bind(this)))
    this.minusButton?.addEventListener('pointercancel', this.touchEndHandler.bind(this))

    this.plusButton?.addEventListener('click', this.increment.bind(this))
    this.plusButton?.addEventListener('pointerdown', this.touchStartHandler.bind(this, this.increment.bind(this)))
    this.plusButton?.addEventListener('pointercancel', this.touchEndHandler.bind(this))
  }

  timeOut(callback: () => void) {
    this.timeout = setTimeout(() => {
      callback()
      this.timeoutIteration++
      this.timeOut(callback)
    }, Math.max(60, this.defaultInterval - this.timeoutIteration * 20))
  }

  touchStartHandler(callback: () => void) {
    this.timeoutIteration = 0
    this.timeOut(callback)

    document.body.addEventListener('pointerleave', this.touchEndHandler.bind(this), { once: true })
    document.body.addEventListener('pointerup', this.touchEndHandler.bind(this), { once: true })
  }

  touchEndHandler(event: Event) {
    event.preventDefault()
    this.timeoutIteration = 0
    clearTimeout(this.timeout)
  }

  static get observedAttributes() {
    return ['value']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
    case 'value':
      {
        this.setValue(newValue)
      }

      break
    }
  }
}

function register() {
  customElements.define('c-counter', Counter)
}

export default { register }
