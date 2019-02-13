import {
  Indicator
} from 'mint-ui'
export default {
  openIndicator: function () {
    Indicator.open({
      spinnerType: 'triple-bounce'
    })
  },
  closeIndicator: function () {
    Indicator.close()
  }
}
