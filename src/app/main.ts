import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import {enableProdMode} from '@angular/core';
enableProdMode(); // 切换生产与开发模式

platformBrowserDynamic().bootstrapModule(AppModule);
