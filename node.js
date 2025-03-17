export default class Node {
  #data;
  #left = null;
  #right = null;

  constructor(data) {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }

  get left() {
    return this.#left;
  }

  get right() {
    return this.#right;
  }

  set data(data) {
    this.#data = data;
  }

  set left(node) {
    this.#left = node;
  }

  set right(node) {
    this.#right = node;
  }
}