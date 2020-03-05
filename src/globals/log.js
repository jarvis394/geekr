import { createLogger, format, transports } from 'winston'

const { combine, timestamp, splat, json, simple, printf } = format

const consoleFormat = printf(info => {
  return `[${info.level.toUpperCase()}] ${info.message}`
})

const log = createLogger({
  level: 'info',
  exitOnError: false,
  format: combine(timestamp(), splat(), json()),
  transports: [
    new transports.Console({
      level: 'info',
      format: combine(simple(), consoleFormat),
      handleExceptions: true,
    }),
  ],
})

export default log
