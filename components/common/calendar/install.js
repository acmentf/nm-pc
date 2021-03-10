import {inlineCalendar } from './index';

const install = function(Vue) {
  if (install.installed) return;

  Vue.component(inlineCalendar.name, inlineCalendar);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  inlineCalendar,
};
