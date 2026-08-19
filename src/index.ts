import './localization';
import options from './options';
import { Roulette } from './roulette';
import { setupUI } from './ui';

const roulette = new Roulette();
(window as any).roulette = roulette;
(window as any).options = options;

document.addEventListener('DOMContentLoaded', () => {
  const checkReady = () => {
    if (roulette.isReady) {
      setupUI(roulette);
    } else {
      setTimeout(checkReady, 50);
    }
  };
  checkReady();
});
