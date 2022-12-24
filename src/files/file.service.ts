import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

export enum Files {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  async create(fileType: Files, fileData: any): Promise<string> {
    try {
      const fileExtension = fileData.originalname.split('.').pop();
      const fileName = v4() + '.' + fileExtension;

      const filePath = path.resolve(__dirname, '..', 'static', fileType);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), fileData.buffer);

      return fileType + '/' + fileName;
    } catch (error) {
      throw new HttpException('File error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
