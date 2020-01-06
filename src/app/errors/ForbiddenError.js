class ForbiddenError extends Error {
  constructor({ code, message }) {
    super(message);

    this.name = this.constructor.name;
    this.status = 403;
    this.messageObject = { code, message };
  }
}

export default ForbiddenError;
