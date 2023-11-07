export const logger = (...messages: any) => {
  if (process.env.NODE_ENV === "development") {
    logger(messages);
  }
};
