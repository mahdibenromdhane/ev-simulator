import Configuration from './Configuration';
import Winston from 'winston';

const logger = Winston.createLogger({
  level: Configuration.getLogLevel(),
  format: Winston.format.combine(Winston.format.splat(), Winston.format[Configuration.getLogFormat()]()),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new Winston.transports.File({ filename: Configuration.getErrorFile(), level: 'error' }),
    new Winston.transports.File({ filename: Configuration.getLogFile() }),
  ],
});

//
// If enabled, log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (Configuration.getConsoleLog()) {
  logger.add(new Winston.transports.Console({
    format: Winston.format.combine(Winston.format.splat(), Winston.format[Configuration.getLogFormat()]()),
  }));
}

export default logger;
