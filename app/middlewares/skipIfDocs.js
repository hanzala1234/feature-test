module.exports = (middleware) => (req, res, next) => {
  if (req.path.includes('/api-docs')) return next();
  return middleware(req, res, next);
};
