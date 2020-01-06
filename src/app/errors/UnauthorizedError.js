class UnauthorizedError extends Error {
  constructor({ code, message }) {
    super(message);

    this.name = this.constructor.name;
    this.status = 401;
    this.messageObject = { code, message };
  }
}

export default UnauthorizedError;
