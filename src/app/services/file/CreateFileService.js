import { File } from '../../models';

class CreateFileService {
  async run(fileData) {
    const file = await File.create(fileData);
    return file;
  }
}

export default new CreateFileService();
