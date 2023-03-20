import { Notify, Dialog } from 'quasar'
import Vue from 'vue'
import moment from 'moment'

Vue.prototype.$moment = moment

/* notify - begin */
function success (message) {
  Notify.create({
    type: 'positive',
    message: message,
    actions: [{ icon: 'close', color: 'white' }]
  })
}

function error (message) {
  Notify.create({
    type: 'negative',
    message: message,
    actions: [{ icon: 'close', color: 'white' }]
  })
}

function warning (message) {
  Notify.create({
    icon: 'announcement',
    type: 'warning',
    message: message,
    actions: [{ icon: 'close', color: 'black' }]
  })
}

function info (message) {
  Notify.create({
    type: 'info',
    message: message
  })
}

/* notify - end */

/* confirm - begin */

function alert (message, title) {
  if (!title) {
    title = '提示'
  }
  return Dialog.create({
    title: title,
    message: message,
    ok: {
      label: '确认',
      color: 'primary',
      unelevated: true
    },
    persistent: true
  })
}
import CustomComponent from '@/components/Common/Confirm'
function confirm (message, title) {
  if (!title) {
    title = '提示'
  }
  return Dialog.create({
    component: CustomComponent,
    title: title,
    msg: message
  })
}

Vue.prototype.$message = { alert, confirm, success, error, info, warning }
