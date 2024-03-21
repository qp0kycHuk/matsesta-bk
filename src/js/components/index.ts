import counter from './counter'
import geosuggest from './geosuggest'
import icon from './icon'
import uploader from './uploader'

function registerAll() {
  counter.register()
  icon.register()
  uploader.register()
  geosuggest.register()
}

registerAll()
