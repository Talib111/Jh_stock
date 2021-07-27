import { createStore} from 'redux'
import Data_reducer from './Data_reducer'

const store = createStore(Data_reducer)
export default store