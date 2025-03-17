import Tree from "./tree.js";

// get array of random numbers from 0 to 99
// create a new tree with the array
// check if the tree is balanced
// print all elements in the tree in level, pre, post, and in order
// add random numbers from 100 to 199 to the tree
// check if the tree is balanced
// rebalance the tree
// check if the tree is balanced
// print all elements in the tree in level, pre, post, and in order

const array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
const tree = new Tree(array);

tree.prettyPrint();
console.log(`Is the tree balanced? ${tree.isBalanced()}`);
console.log("Level Order:");
tree.levelOrder(function (node) {
  console.log(node.data);
});
console.log("Pre Order:");
tree.preOrder(function (node) {
  console.log(node.data);
});
console.log("Post Order:");
tree.postOrder(function (node) {
  console.log(node.data);
});
console.log("In Order:");
tree.inOrder(function (node) {
  console.log(node.data);
});

Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 100).forEach(
  function (data) {
    tree.insert(data);
  }
);

tree.prettyPrint();
console.log(`Is the tree balanced? ${tree.isBalanced()}`);

tree.rebalance();

tree.prettyPrint();
console.log(`Is the tree balanced? ${tree.isBalanced()}`);
console.log("Level Order:");
tree.levelOrder(function (node) {
  console.log(node.data);
});
console.log("Pre Order:");
tree.preOrder(function (node) {
  console.log(node.data);
});
console.log("Post Order:");
tree.postOrder(function (node) {
  console.log(node.data);
});
console.log("In Order:");
tree.inOrder(function (node) {
  console.log(node.data);
});
