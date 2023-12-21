import * as FilePond from 'filepond'
// import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
// import FilePondPluginImageTransform from 'filepond-plugin-image-transform'

// import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
FilePond.registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginImageResize)

class Uploader extends HTMLElement {
  inputEl = document.createElement('input')

  constructor() {
    super()
  }

  connectedCallback() {
    const name = this.getAttribute('name') || ''

    this.inputEl.setAttribute('name', name)
    this.inputEl.setAttribute('accept', 'image/*')
    this.appendChild(this.inputEl)

    FilePond.create(this.inputEl, {
      name,
      storeAsFile: true,
      allowMultiple: false,
      imagePreviewHeight: 256,
      stylePanelLayout: 'compact circle',

      imageCropAspectRatio: '1:1',
      imageResizeTargetWidth: 200,
      imageResizeTargetHeight: 200,
      labelIdle: `
        <div class="text-sm">
          <span class="filepond--label-action">Нажмите</span> или перетащите изображение для загрузки
        </div>`,
      styleButtonRemoveItemPosition: 'right top',
    })
  }

  static register() {
    if (customElements.get('c-uploader')) return

    customElements.define('c-uploader', Uploader)
  }
}

export default { register: Uploader.register }
