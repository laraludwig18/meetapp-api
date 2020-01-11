import SessionController from '../../../src/app/controllers/SessionController';
import { CreateSessionService } from '../../../src/app/services/session';
import { validSession } from '../../assets/payloads/session';
import { successResponse } from '../../assets/responses/session';
import { resStub, jsonStub, statusStub } from '../../helpers/mocks';

const mockService = jest.spyOn(CreateSessionService, 'run');

describe('controllers / SessionController', () => {
  it('should return 200 and user object', async () => {
    mockService.mockImplementation(() => Promise.resolve(successResponse));

    const req = { body: validSession };
    await SessionController.store(req, resStub);

    expect(resStub.status.calledWith(200)).toBeTruthy();
    expect(jsonStub.calledWith(successResponse)).toBeTruthy();
  });

  afterEach(() => {
    statusStub.resetHistory();
    jsonStub.resetHistory();
    mockService.mockClear();
  });
});
