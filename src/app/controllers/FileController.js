import { CreateFileService } from '../services/file';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await CreateFileService.run({ name, path });
    return res.status(200).json(file);
  }
}

export default new FileController();
