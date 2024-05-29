import { Fancybox } from '@fancyapps/ui'
import ru from '@fancyapps/ui/src/Fancybox/l10n/ru'

function init() {
  Fancybox.defaults.trapFocus = false
  Fancybox.defaults.autoFocus = false
  Fancybox.defaults.placeFocusBack = false
  Fancybox.defaults.l10n = ru
  Fancybox.defaults.template.spinner = '<div class="progress progress-circle"> </div>'

  Fancybox.bind('[data-fancybox-modal]', {
    type: 'ajax',
    dragToClose: false,
    mainClass: 'fancybox-custom-modal',
  })

  Fancybox.modal = {}

  Fancybox.modal.open = (src: string, options: any) => {
    return Fancybox.show(
      [
        {
          src: src,
          ...options,
        },
      ],
      {
        type: 'ajax',
        dragToClose: false,
        mainClass: 'fancybox-custom-modal',
        ...options,
      }
    )
  }

  window.Fancybox = Fancybox

  // Fancybox.modal.open('dialog-form-2.html')
}

interface CustomWindow extends Window {
  Fancybox: typeof Fancybox
}

declare let window: CustomWindow

export default { init }
