const handleError = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Произошла внутренняя ошибка сервера.'
      : message,
  });
  next();
};

module.exports = {
  handleError,
};
