import 'core-js';
import 'raf/polyfill';

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    };
  };

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function(callback) {
    setTimeout(callback, 0);
  };
