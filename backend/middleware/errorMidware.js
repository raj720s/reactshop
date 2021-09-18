export const errorMidware = (err, req, res, nxt) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(err);
  console.log(statusCode);
  res.status(statusCode);
  res.json({
    msg: err.message,
    stack: process.env.node_env === "production" ? null : err.stack,
  });
};

export const notFoundMiddware = (req, res, nxt) => {
  const error = new Error(`Not Found middware ${req.originalUrl}`);
  res.status(404);
  console.log(error);
  nxt(error);
};
