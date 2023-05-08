import { Injectable } from '@nestjs/common';
import { Controller, Get, Render } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello() {
    //return 'Hello World 42!';
    return {
      message: 'Hello world!',
      name: 'David Kwok'
    };
  }
}
