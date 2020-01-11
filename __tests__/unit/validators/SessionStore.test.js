import { validateSessionStore } from '../../../src/app/validators';
import { passwordRequired } from '../../assets/errorMessages/session';
import { invalidSession, validSession } from '../../assets/payloads/session';
import { resStub, jsonStub, statusStub } from '../../helpers/mocks';

describe('validators / SessionStore', () => {
  const nextMock = jest.fn();

  it('should call next', async () => {
    const req = { body: validSession };

    await validateSessionStore(req, resStub, nextMock);
    expect(nextMock).toHaveBeenCalled();
  });

  it('should return password required error', async () => {
    const req = { body: invalidSession };

    await validateSessionStore(req, resStub, nextMock);
    expect(resStub.status.calledWith(400)).toBeTruthy();

    expect(jsonStub.calledWith(passwordRequired)).toBeTruthy();
  });

  afterEach(() => {
    statusStub.resetHistory();
    jsonStub.resetHistory();
    jest.resetAllMocks();
  });
});
