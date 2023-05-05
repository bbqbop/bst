const Tree = require('./binaryTree.js');

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

// const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
// const bst = new Tree(testArray);

// prettyPrint(bst.root)

function createRandomArray(size, range){
    const newArray = [];
    for (let i = 0; i < size; i++){
        newArray.push(Math.floor(Math.random() * range))
    }
    return newArray;
}

// Create binary search tree from array of random numbers :

const testTree = new Tree(createRandomArray(10, 100));
console.log(`Populate new Tree with 10 random numbers between 1 & 100: \n`)
prettyPrint(testTree.root);
console.log(`\nConfirm that it's balanced : ${testTree.isBalanced()}\n`);
console.log(`Print out all elements:\n`)
console.log(`    in level order : ${testTree.levelOrder()}\n`)
console.log(`    in pre order : ${testTree.preOrder()}\n`)
console.log(`    in order : ${testTree.inOrder()}\n`)
console.log(`    in post order : ${testTree.postOrder()}\n`)

const bigNumbersToUnbalance = createRandomArray(5, 1000);
bigNumbersToUnbalance.forEach(num => testTree.insert(num));

console.log('Unbalance the tree with added large Numbers:\n');
prettyPrint(testTree.root);
console.log(`\nConfirm that it's unbalanced : ${testTree.isBalanced()}\n`);
console.log(`Re-balance the tree:\n`);
testTree.reBalance();
prettyPrint(testTree.root);
console.log(`\nConfirm that it's re-balanced : ${testTree.isBalanced()}\n`);
console.log(`Print out all elements:\n`)
console.log(`    in level order : ${testTree.levelOrder()}\n`)
console.log(`    in pre order : ${testTree.preOrder()}\n`)
console.log(`    in order : ${testTree.inOrder()}\n`)
console.log(`    in post order : ${testTree.postOrder()}\n`)



