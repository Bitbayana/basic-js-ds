const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this.insertNode(this.rootNode, data);
  }

  insertNode(node, data) {
    if (node === null) {
      return new Node(data);
    }

    if (data < node.data) {
      node.left = this.insertNode(node.left, data);
    } else {
      node.right = this.insertNode(node.right, data);
    }

    return node;
  }

  has(data) {
    return this.searchNode(this.rootNode, data) !== null;
  }

  searchNode(node, data) {
    if (node === null || node.data === data) {
      return node;
    }

    if (data < node.data) {
      return this.searchNode(node.left, data);
    } else {
      return this.searchNode(node.right, data);
    }
  }

  find(data) {
    const node = this.searchNode(this.rootNode, data);
    return node ? node.data : null;
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
    } else {
      if (node.left === null && node.right === null) {
        node = null;
      } else if (node.left === null) {
        node = node.right;
      } else if (node.right === null) {
        node = node.left;
      } else {
        const minNode = this.findMinNode(node.right);
        node.data = minNode.data;
        node.right = this.removeNode(node.right, minNode.data);
      }
    }

    return node;
  }

  findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  min() {
    const node = this.findMinNode(this.rootNode);
    return node ? node.data : null;
  }

  max() {
    let node = this.rootNode;
    while (node && node.right !== null) {
      node = node.right;
    }
    return node ? node.data : null;
  }
}

module.exports = {
  BinarySearchTree
};