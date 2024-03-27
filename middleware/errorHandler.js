const errorHandler = (err, req, res) => {
  res.json({ msg: 'internal server error' });
};

module.exports = errorHandler;
