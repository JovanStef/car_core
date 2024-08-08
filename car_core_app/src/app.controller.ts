import { Controller, Get , Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('layouts/layout')
  getHello(): any {

    const navItems = {
      'navItems' : [
        {
          'navTitle' : 'Documentation',
          'navLink' : '/style-guide/index.html',
        },
        {
          'navTitle' : 'About',
          'navLink' : '/style-guide/index.html',
        },
        {
          'navTitle' : 'Profile',
          'navLink' : '/style-guide/index.html',
        }

      ]
    };

    return {message:'hello' , navItems};
  }

  // @Get('lalala')
  // @Render('layout')
  // @Render('main')
  // dddd(): any {

  //   return {message:'hello'};
  // }
}
