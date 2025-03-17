import Node from "./node.js";

export default class Tree {
  #root = null;

  /**
   * Create a new tree, optionally with an array of numbers
   * @param {Array<Number>} array Array of numbers to build the tree
   */
  constructor(array = []) {
    // sort the array
    array = array.sort(function (a, b) {
      return a - b;
    });

    // remove duplicates
    array = array.filter(function (item, index) {
      return array.indexOf(item) === index;
    });

    this.#root = this.#buildTree(array);
  }

  /**
   * Recursively build a balanced binary search tree from an array of numbers
   * @param {Array<Number>} array Array of numbers to build the tree
   * @returns {Node} The root node of the tree
   */
  #buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    // set the root to the middle of the array
    let middle = Math.floor(array.length / 2);
    let root = new Node(array[middle]);

    // recursively build the left and right subtrees
    root.left = this.#buildTree(array.slice(0, middle));
    root.right = this.#buildTree(array.slice(middle + 1));

    return root;
  }

  /**
   * Insert a value into the tree
   * @param {Number} value Value to insert into the tree
   * @returns {Boolean} True if the value was inserted, false if it already exists
   */
  insert(value) {
    const node = new Node(value);
    let current = this.#root;

    if (this.#root === null) {
      this.#root = node;
      return true;
    }

    while (current !== null) {
      if (value < current.data) {
        if (current.left === null) {
          current.left = node;
          return true;
        }
        current = current.left;
      } else if (value > current.data) {
        if (current.right === null) {
          current.right = node;
          return true;
        }
        current = current.right;
      } else {
        // value already exists
        return false;
      }
    }
  }

  /**
   * Delete a value from the tree
   * @param {Number} value Value to delete from the tree
   * @returns {Boolean} True if the value was deleted, false if it was not found
   */
  delete(value) {
    let current = this.#root;
    let parent = null;
    let isLeftChild = false;

    // find the node to delete
    while(current !== null && current.data !== value) {
      parent = current;
      if (value < current.data) {
        current = current.left;
        isLeftChild = true;
      } else {
        current = current.right;
        isLeftChild = false;
      }
    }

    // value not found
    if (current === null) {
      return false;
    }

    // case 1: node has no children
    if (current.left === null && current.right === null) {
      if (current === this.#root) {
        this.#root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }

    // case 2: node has one child
    else if (current.right === null) {
      if (current === this.#root) {
        this.#root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if (current.left === null) {
      if (current === this.#root) {
        this.#root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    }

    // case 3: node has two children
    else {
      // find inorder successor by finding minimum value in right subtree
      let successor = current.right;
      let successorParent = current;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      // change current value to successor value
      current.data = successor.data;

      // delete successor
      if (successor === successorParent.left) {
        successorParent.left = successor.right;
      }
      else {
        successorParent.right = successor.right
      }
    }

    return true;
  }

  /**
   * Find a value in the tree
   * @param {Number} value Value to find in the tree
   * @returns {Node} Node containing the value, or null if it was not found
   */
  find(value) {
    let current = this.#root;

    while (current !== null) {
      if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      } else {
        return current;
      }
    }

    return null;
  }

  /**
   * Traverse the tree in level order and call a callback function for each node
   * @param {function(Node):void} callback Callback function to call for each node
   */
  levelOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback function is required");
    }

    const queue = [];
    queue.push(this.#root);

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  /**
   * Traverse the tree in in-order and call a callback function for each node
   * @param {function(Node):void} callback Callback function to call for each node
   */
  inOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback function is required");
    }

    const stack = [];
    let current = this.#root;

    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      callback(current);
      current = current.right;
    }
  }

  /**
   * Traverse the tree in pre-order and call a callback function
   * @param {function(Node):void} callback Callback function to call for each node
   */
  preOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback function is required");
    }

    const stack = [];
    stack.push(this.#root);
    
    while (stack.length > 0) {
      let current = stack.pop();
      callback(current);

      if (current.right !== null) {
        stack.push(current.right);
      }
      if (current.left !== null) {
        stack.push(current.left);
      }
    }
  }

  /**
   * Traverse the tree in post-order and call a callback function
   * @param {function(Node):void} callback Callback function to call for each node
   */
  postOrder(callback) {
    if(callback === undefined) {
      throw new Error("Callback function is required");
    }

    const revStack = [];
    const stack = [];
    revStack.push(this.#root);

    while(revStack.length > 0) {
      const current = revStack.pop();
      stack.push(current);

      if(current.left !== null) {
        revStack.push(current.left);
      }
      if(current.right !== null) {
        revStack.push(current.right);
      }
    }

    while(stack.length > 0) {
      callback(stack.pop());
    }
  }

  /**
   * Get the height of the specified node
   * @param {Node} node Node to get the height of
   * @returns {Number} Height of the node
   */
  height(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  /**
   * Get the depth of the specified node
   * @param {Node} node Node to get the depth of
   * @returns {Number} Depth of the node
   */
  depth(node) {
    if (node === null) {
      return -1;
    }

    let current = this.#root;
    let depth = 0;

    while (current !== null) {
      if (node.data === current.data) {
        return depth;
      } else if (node.data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      depth++;
    }

    return -1;
  }

  /**
   * Check if the tree is balanced
   * @returns {Boolean} True if the tree is balanced, false if it is not
   */
  isBalanced() {
    if (this.#root === null) {
      return true;
    }

    const queue = [];
    queue.push(this.#root);

    while (queue.length > 0) {
      const node = queue.shift();

      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return true;
  }

  /**
   * Rebalance the tree
   */
  rebalance() {
    const array = [];
    this.inOrder((node) => {
      array.push(node.data);
    });

    this.#root = this.#buildTree(array);
  }

  /**
   * Print the tree to the console in an eaasily readable format
   * @param {Node} node Node to print, defaults to the root
   * @param {String} prefix Leading characters to print for the structure of the tree
   * @param {Boolean} isLeft True if the node is a left child
   */
  prettyPrint(node = this.#root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
