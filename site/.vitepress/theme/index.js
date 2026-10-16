import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import ColorPalette from './ColorPalette.vue';
import './style.css';

export default {
  ...DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'nav-bar-content-after': () => h(ColorPalette)
  })
};
