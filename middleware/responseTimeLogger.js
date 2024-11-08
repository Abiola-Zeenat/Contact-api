import colors from "colors";

const responseTimeLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `DURATION: Request to ${req.originalUrl} took ${duration} ms`.italic
        .yellow
    );
  });

  next();
};

export default responseTimeLogger;
