import sinon from 'sinon';

const statusStub = sinon.stub();

const jsonStub = sinon.stub();

statusStub.returns({
  json: jsonStub,
});

const resStub = {
  status: statusStub,
};

export { jsonStub, resStub, statusStub };
