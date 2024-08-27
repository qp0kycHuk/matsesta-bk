import AirDatepicker from 'air-datepicker'
import localeRu from 'air-datepicker/locale/ru'

class Datepicker extends HTMLInputElement {
  datePicker: AirDatepicker | null = null

  connectedCallback() {
    const minDateAttr = this.getAttribute('mindate') || ''
    const minDate = isNaN(Date.parse(minDateAttr)) ? false : Date.parse(minDateAttr)
    const maxDateAttr = this.getAttribute('maxdate') || ''
    const maxDate = isNaN(Date.parse(maxDateAttr)) ? false : Date.parse(maxDateAttr)

    const dateFormat = this.getAttribute('dateformat') || 'dd.MM.yyyy'

    const selectedDates = (this.getAttribute('selecteddates') || this.value || this.getAttribute('value') || '')
      .split(',')
      .map(Date.parse)
      .filter((value) => !isNaN(value))

    this.datePicker = new AirDatepicker(this, {
      locale: localeRu,
      isMobile: true,
      autoClose: true,
      minDate,
      maxDate,
      dateFormat,
      selectedDates,
    })
  }

  disconnectedCallback() {
    this.datePicker?.destroy()
  }
}

function register() {
  customElements.define('air-datepicker', Datepicker, { extends: 'input' })
}

export default { register }
