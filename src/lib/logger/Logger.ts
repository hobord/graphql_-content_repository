import {createLogger, format, transports } from 'winston';
import { LoggerInterface } from './LoggerInterface';

// const env = process.env.NODE_ENV || 'development';

export const logger = <LoggerInterface>createLogger({
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: format.combine(
        format.json(),
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
    })
  ],
  exitOnError: true,
})
