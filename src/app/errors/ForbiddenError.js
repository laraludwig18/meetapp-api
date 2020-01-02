class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.status = 403;
  }
}

export default ForbiddenError;
