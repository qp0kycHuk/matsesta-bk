import * as FilePond from 'filepond'
// import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
// import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
// import FilePondPluginFilePoster from 'filepond-plugin-file-poster'

import ru from 'filepond/locale/ru-ru'

FilePond.registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize
)

class Uploader extends HTMLElement {
  inputEl = document.createElement('input')
  deleteInputEl = document.createElement('input')
  filepond?: FilePond.FilePond

  constructor() {
    super()
  }

  connectedCallback() {
    const name = this.getAttribute('name') || ''
    const deleteName = this.getAttribute('delete-name') || ''
    const value = this.getAttribute('value') || ''
    const required = this.getAttribute('required') !== null

    this.deleteInputEl.name = deleteName
    this.deleteInputEl.hidden = true
    this.deleteInputEl.value = 'N'
    this.appendChild(this.deleteInputEl)

    this.inputEl.required = required
    this.inputEl.setAttribute('name', name)
    this.inputEl.setAttribute('accept', 'image/*')
    this.appendChild(this.inputEl)

    this.filepond = FilePond.create(this.inputEl, {
      name,
      required,
      storeAsFile: true,
      allowMultiple: false,
      imagePreviewHeight: 256,
      // stylePanelLayout: 'compact circle',
      files: value ? [value] : [],

      acceptedFileTypes: ['image/*'],
      dropValidation: true,
      stylePanelAspectRatio: '1:1',
      imageCropAspectRatio: '1:1',
      imageResizeTargetWidth: 200,
      imageResizeTargetHeight: 200,
      styleButtonRemoveItemPosition: 'right top',
      ...ru,
      labelIdle: `
        <c-icon class="icon mx-auto text-primary mb-3 text-6xl" 
          href="/local/templates/matsesta_bk/img/icons.svg#picture" >
        </c-icon>
        <div class="text-sm">
          <span class="filepond--label-action">Нажмите</span> <br> или перетащите <br> изображение для загрузки
        </div>`,
      onremovefile: () => {
        this.inputEl.value = ''
        this.deleteInputEl.value = 'Y'
      },
      onaddfile: () => {
        this.deleteInputEl.value = 'N'
      },
    })
  }

  static register() {
    if (customElements.get('c-uploader')) return

    customElements.define('c-uploader', Uploader)
  }
}

export default { register: Uploader.register }
