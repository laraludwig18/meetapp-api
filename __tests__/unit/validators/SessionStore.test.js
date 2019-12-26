import { validateSessionStore } from '../../../src/app/validators';

import { resStub, jsonStub, statusStub } from '../../helpers/mocks';
import { invalidSession, validSession } from '../../examples/session';
import { passwordRequired } from '../../errorMessages/session';

describe('validators / SessionStore', () => {
  const nextMock = jest.fn();

  it('should call next', async () => {
    const req = { body: validSession };

    await validateSessionStore(req, resStub, nextMock);
    expect(nextMock).toHaveBeenCalled();
  });

  // it('should return password required error', async () => {
  //   const req = { body: invalidSession };

  //   await validateSessionStore(req, resStub, nextMock);
  //   expect(resStub.status.calledWith(400)).toBeTruthy();

  //   expect(jsonStub.calledWith(passwordRequired)).toBeTruthy();
  // });

  afterEach(() => {
    statusStub.resetHistory();
    jsonStub.resetHistory();
    jest.resetAllMocks();
  });
});
