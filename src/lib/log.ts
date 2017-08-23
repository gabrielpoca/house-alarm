import { Logger, transports } from 'winston'

let logger = new Logger({
  level: 'verbose',
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'dev.log' })
  ]
})

if (process.env.NODE_ENV === 'production') {
  logger = new Logger({
    level: 'warn',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'prod.log' })
    ]
  })
}

export default logger
