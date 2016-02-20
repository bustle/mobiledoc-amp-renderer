export function innerHTML(parentNode) {
  let content = [];
  let node = parentNode.firstChild;
  while (node) {
    content.push(node.outerHTML);
    node = node.nextSibling;
  }
  return content.join('');
}
