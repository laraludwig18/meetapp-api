class BadRequestError extends Error {
  constructor({ code, message }) {
    super(message);

    this.name = this.constructor.name;
    this.status = 400;
    this.messageObject = { code, message };
  }
}

export default BadRequestError;
