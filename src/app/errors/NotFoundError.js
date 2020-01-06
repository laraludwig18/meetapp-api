class NotFoundError extends Error {
  constructor({ code, message }) {
    super(message);

    this.name = this.constructor.name;
    this.status = 404;
    this.messageObject = { code, message };
  }
}

export default NotFoundError;
