import RENDER_TYPE from '../utils/render-type';

export default {
  name: 'image-card',
  type: RENDER_TYPE,
  render({env, options, payload}) {
    if (payload.src) {
      var image = env.dom.createElement('amp-img');
      image.setAttribute('src', payload.src);
      return image;
    }
  }
};
