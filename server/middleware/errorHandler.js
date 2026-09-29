const errorCodes = require ('../errorcodes.js');

const errorHandler = (err, req, res, next) => {
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  switch (status) {
    case errorCodes.INVALID_INPUT.code:
      res.status(400).json({ message: errorCodes.INVALID_INPUT.message, stackTrace: err.stack });
      console.log('Invalid input error handled');
      break;
    case errorCodes.NOT_FOUND.code:
      res.status(404).json({ message: errorCodes.NOT_FOUND.message, stackTrace: err.stack });
      console.log('Not found error handled');
      break;
    case errorCodes.SERVER_ERROR.code:
      res.status(500).json({ message: errorCodes.SERVER_ERROR.message, stackTrace: err.stack });
      console.log('Server error handled');
      break;
    default:
      console.log('No specific error code matched');
      res.status(200).json({ message: 'There are no errors ...' });
  }     
}

module.exports = errorHandler;