import MobiledocDOMRenderer from 'mobiledoc-dom-renderer';
import imageCard from './cards/image';

export default class RendererFactory {
  constructor(_options={}) {
    var options = {};
    var key;
    for (key in _options) {
      if (_options.hasOwnProperty(key)) {
        options[key] = _options[key];
      }
    }
    options.sectionElementRenderer = options.sectionElementRenderer || {};
    if (!options.sectionElementRenderer['PULL-QUOTE']) {
      options.sectionElementRenderer['PULL-QUOTE'] = (_, dom) => dom.createElement('aside');
    }
    options.cards = options.cards || [imageCard];
    this.renderer = new MobiledocDOMRenderer(options);
  }

  render(mobiledoc) {
    return this.renderer.render(mobiledoc);
  }
}
