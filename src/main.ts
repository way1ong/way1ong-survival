import { startApp } from './ui/app.ts';
import { watchInstall } from './ui/install.ts';
import { keepOffline } from './ui/offline.ts';

const root = document.getElementById('app');
if (root) startApp(root);
watchInstall();
keepOffline();
