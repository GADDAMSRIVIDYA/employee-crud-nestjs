
import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
@Injectable()
export class DatabaseService {
  private readonly dbPath = path.join(__dirname, '../../database');

  private getFilePath(fileName: string) {
    return path.join(this.dbPath, fileName);
  }

  async readDb(fileName: string): Promise<any[]> {
    const filePath = this.getFilePath(fileName);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  }

  async writeDb(fileName: string, data: any[]) {
    const filePath = this.getFilePath(fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}


