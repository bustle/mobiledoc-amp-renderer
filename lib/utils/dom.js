const VOID_TAGS = 'area base br col command embed hr img input keygen link meta param source track wbr amp-img'.split(' ');
const BOOLEAN_ATTRIBUTE_TRUE = '-symbol-boolean-attribute-true';

class Node {
  constructor() {
    this.childNodes = [];
  }

  appendChild(element) {
    this.childNodes.push(element);
  }

  toString() {
    let html = '';

    for (let i=0; i<this.childNodes.length; i++) {
      html += this.childNodes[i].toString();
    }

    return html;
  }
}

class Element extends Node {
  constructor(tagName) {
    super();
    this.tagName = tagName.toLowerCase();
    this.isVoid = VOID_TAGS.indexOf(this.tagName) !== -1;
    this.attributes = [];
  }

  setBooleanAttribute(propName) {
    this.attributes.push(propName, BOOLEAN_ATTRIBUTE_TRUE);
  }

  setAttribute(propName, propValue) {
    this.attributes.push(propName, propValue);
  }

  toString() {
    let html = `<${this.tagName}`;

    if (this.attributes.length) {
      for (let i=0; i < this.attributes.length; i=i+2) {
        let propName = this.attributes[i],
            propValue = this.attributes[i+1];
        if (propValue === BOOLEAN_ATTRIBUTE_TRUE) {
          html += ` ${propName}`;
        } else {
          html += ` ${propName}="${propValue}"`;
        }
      }
    }
    html += `>`;

    if (!this.isVoid) {
      for (let i=0; i<this.childNodes.length; i++) {
        html += this.childNodes[i].toString();
      }
      html += `</${this.tagName}>`;
    }

    return html;
  }
}

function addHTMLSpaces(text) {
  return text.replace(/  /g, ' &nbsp;');
}

class TextNode {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return addHTMLSpaces(this.value);
  }
}

export function createElement(tagName) {
  return new Element(tagName);
}

export function appendChild(target, child) {
  target.appendChild(child);
}

export function createTextNode(text) {
  return new TextNode(text);
}

export function setAttribute(element, propName, propValue) {
  element.setAttribute(propName, propValue);
}

export function createDocumentFragment() {
  return new Node();
}

export function normalizeTagName(name) {
  return name.toLowerCase();
}
