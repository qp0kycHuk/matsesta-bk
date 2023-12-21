import counter from './counter'
import icon from './icon'
import uploader from './uploader'

function registerAll() {
  counter.register()
  icon.register()
  uploader.register()
}

registerAll()
