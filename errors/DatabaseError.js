import { StatusCodes } from 'http-status-codes';

class DatabaseError extends Error {
  constructor(message = 'Database Service Unavailable') {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default DatabaseError;
