import { createStore } from 'redux'

const initialState = {
  sidebarShow: false,
  errorHandler: null,
  cutCategory:null,
  cutProduct:null,
  cutItem:null,
  pleasWait:false,
  toastMessages:'6',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
