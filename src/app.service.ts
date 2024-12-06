import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Reto Tecnico - Diego De La Flor';
  }
}
