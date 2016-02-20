/* global QUnit */
import Renderer from 'mobiledoc-amp-renderer';
import ImageCard from 'mobiledoc-amp-renderer/cards/image';
import {
  MARKUP_SECTION_TYPE,
  CARD_SECTION_TYPE
} from 'mobiledoc-dom-renderer/utils/section-types';
import { innerHTML } from '../../helpers/dom';

const { test, module } = QUnit;
const MOBILEDOC_VERSION = '0.2.0';
const dataUri = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=";

let renderer;
module('Unit: Mobiledoc AMP Renderer - 0.2', {
  beforeEach() {
    renderer = new Renderer();
  }
});

test('renders a mobiledoc pull-quote', (assert) => {
  let mobiledoc = {
    version: MOBILEDOC_VERSION,
    sections: [
      [], // markers
      [   // sections
        [MARKUP_SECTION_TYPE, 'PULL-QUOTE', [
          [[], 0, 'hello world']]
        ]
      ]
    ]
  };
  let { result: rendered } = renderer.render(mobiledoc);
  assert.equal(innerHTML(rendered),
               '<aside>hello world</aside>');
});

test('renders a mobiledoc with built-in image card', (assert) => {
  assert.expect(1);
  let cardName = ImageCard.name;
  let payload = { src: dataUri };
  let mobiledoc = {
    version: MOBILEDOC_VERSION,
    sections: [
      [],      // markers
      [        // sections
        [CARD_SECTION_TYPE, cardName, payload]
      ]
    ]
  };
  let { result: rendered } = renderer.render(mobiledoc);

  assert.equal(innerHTML(rendered), `<div><amp-img src="${dataUri}"></amp-img></div>`);
});
