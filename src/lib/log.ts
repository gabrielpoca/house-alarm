import { Logger, transports } from 'winston'

const fileName = () =>
  process.env.NODE_ENV === 'production' ? 'prod.log' : 'dev.log'

const logger = new Logger({
  level: 'verbose',
  transports: [
    new transports.Console(),
    new transports.File({ filename: fileName() })
  ]
})

export default logger
