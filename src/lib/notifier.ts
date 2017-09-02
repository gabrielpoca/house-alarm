import * as request from 'request'
import log from './log'
import { isEnabled } from './notifier_status'

const notificationURL = process.env.NOTIFICATION_URL

let timerId

const notify = () => {
  if (timerId || !isEnabled()) return

  timerId = setTimeout(function() {
    clearTimeout(timerId)
    timerId = null
  }, 1000 * 60 * 5) // 5 minutes

  log.info('Notifier', 'sending intruder notification')

  try {
    request.post(notificationURL, { form: {} })
  } catch (err) {
    log.error('Failed to send intruder notification')
  }
}

export { notify }
