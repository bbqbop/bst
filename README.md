# Binary Tree
This project provides a Tree class for building and manipulating binary trees and the accompanying driver.js to run a demonstration. It's an implementation using JavaScript and Node.js



### Installation
Clone this repository to your local machine, and then import the Tree class in your Node.js application by including the following line at the top of your JavaScript file:

```
const Tree = require('./binaryTree.js');
```

### Usage
To use the Tree class, you'll first need to create a new instance of the Tree object. You can pass an array of values to the constructor to build the initial tree:

```
const myTree = new Tree([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]);
```
# Features

Once you have a Tree object, you can use its methods to insert, delete, find, and traverse nodes in the tree.

### Insertion
To insert a new node into the tree, call the insert method on your Tree object, passing in the value you want to insert:

```
myTree.insert(7);
```

### Deletion
To delete a node from the tree, call the delete method on your Tree object, passing in the value you want to delete:

```
myTree.delete(7);
```

### Searching
To find a node in the tree, call the find method on your Tree object, passing in the value you want to find:

```
const myNode = myTree.find(5);
```

### Traversal
You can traverse the nodes in your tree in four ways: breadth-first (level-order) and depth-first in-order, pre-order, and post-order. To traverse the nodes in a particular order, call the corresponding method on your Tree object, passing in a callback function to handle each node. The traversal methods return an Array of the node values in the specified order:

```
// Level-order traversal
myTree.levelOrder(callBack);

// In-order traversal
myTree.inOrder(callBack);

// Pre-order traversal
myTree.preOrder(callBack);

// Post-order traversal
myTree.postOrder(callBack);

// without callback
const newArray = myTree.levelOrder();
```

### Height and Depth
You can find the height of a node with the height method. When no node is supplied, the method returns the total tree height:

```
const myHeight = myTree.height();

const nodeHeight = myTree.height(myTree.find(2))
```
You can find the depth of a node in the tree with the depth method:

```
const myDepth = myTree.depth(5);
```

### isBalanced & reBalance
**isBalanced()** determines if the tree is balanced (i.e., the heights of the left and right subtrees differ by at most one).
Returns true if the tree is balanced, false otherwise.

**reBalance()** rebalances the tree using an in-order traversal and rebuilding the tree from scratch.
No parameters or return values.

### Examples
To see more examples of how to use this Tree class, see the driver.js file included in this repository.

### Contributors
Dierk Peters, 2023
