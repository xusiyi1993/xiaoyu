import Vue from 'vue'
import moment from 'moment'

export default Vue.filter('formatTime', str => {
  return moment(str).format('YYYY-MM-DD HH:mm:ss')
})
