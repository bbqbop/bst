const Node = function(data){
    this.data = data;
    this.left = null;
    this.right = null;
};
const Tree = function(array){
    function __sortArray(arr){
        if (arr.length <= 1){
            return arr;
        }
        const mid = Math.floor(arr.length / 2);
        const left = __sortArray(arr.slice(0, mid));
        const right = __sortArray(arr.slice(mid))
        return __merge(left, right);
    }
    function __merge(left, right){
        const mergedArray = [];
        let leftIdx = 0;
        let rightIdx = 0;
        while (leftIdx < left.length && rightIdx < right.length){
            if (left[leftIdx] < right[rightIdx]){
                mergedArray.push(left[leftIdx]);
                leftIdx++;
            }
            else {
                mergedArray.push(right[rightIdx]);
                rightIdx++;
            }
        }
        return mergedArray.concat(left.slice(leftIdx)).concat(right.slice(rightIdx));
    }
    function __eraseDuplicates(arr){
        for (i = 0; i < arr.length - 1; i++){
            if (arr[i] === arr[i + 1]){
                arr.splice(i, 1);
            }
        }
        return arr;
    }
    function __buildTree(array, start = 0, end = array.length - 1){
        if (start > end) {
            return null;
        }
        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);
        node.left = __buildTree(array, start, mid - 1);
        node.right = __buildTree(array, mid + 1, end);
        return node;
    }
    const editedArray = __eraseDuplicates(__sortArray(array));
    this.root = __buildTree(editedArray);
}
Tree.prototype = {
    insert : function(value, node = this.root){
        if (node === null){
            node = new Node(value);
            return node;
        }
        if (value < node.data){
            node.left = this.insert(value, node.left);
        }
        else if (value > node.data){
            node.right = this.insert(value, node.right);
        }
        return node;
    }, 
    delete : function(value, node = this.root){
        if (node === null){
            return node;
        }
        if (value < node.data){
            node.left = this.delete(value, node.left);
        }
        else if (value > node.data){
            node.right = this.delete(value, node.right);
        }
        else {
            // if node has only one or no children
            if (node.left === null){
                return node.right;
            }
            else if (node.right === null){
                return node.left;
            }
            // if node has two children
                // find successor (smallest num to the right):
            node.data = this.findSmallest(node.right);
                // delete the successor node
            node.right = this.delete(node.data, node.right)
        }
        return node;
    },
    findSmallest: function(node){
        let value = node.data;
        while (node.left !== null){
            value = node.left.data;
            node = node.left;
        };
        return value;
    },
    find: function(value, node = this.root){
        // if node is empty, return;
        if (node === null || node.data === value){
            return node;
        }
        if (value < node.data){
            return this.find(value, node.left)
        }
        else if (value > node.data){
            return this.find(value, node.right);
        }
    }, 
    levelOrder: function(callback = (x) => array.push(x), array = []){
        const queue = [];
        queue.push(this.root);
        while (queue.length >= 1){
            if (queue[0] === null){
                queue.shift();
                continue
            }
            callback(queue[0].data);
            queue.push(queue[0].left, queue[0].right);
            queue.shift();
        }
        return array;
    },
    inOrder: function(callback = (x)=> array.push(x), array = [], node = this.root){
        if (node == null){
            return
        }
        this.inOrder(callback, array, node.left);
        callback(node.data);
        this.inOrder(callback, array, node.right);
        return array;
    },
    preOrder: function(callback = (x)=> array.push(x), array = [], node = this.root){
        if (node == null){
            return
        }
        callback(node.data);
        this.preOrder(callback, array, node.left);
        this.preOrder(callback, array, node.right);
        return array;
    },
    postOrder: function(callback = (x)=> array.push(x), array = [], node = this.root){
        if (node == null){
            return
        }
        this.postOrder(callback, array, node.left);
        this.postOrder(callback, array, node.right);
        callback(node.data);
        return array;
    },
    height: function(node = this.root){
        if (node === null){
            return -1;
        }
        const heightLeft = this.height(node.left)
        const heightRight = this.height(node.right);

        return heightLeft > heightRight ? heightLeft + 1 : heightRight + 1;
    },
    depth: function(value){
        let depth = 0;
        let node = this.root;

        while (node != null){
            if (value == node.data){
                return depth;
            }
            if (value < node.data){
                node = node.left;
            }
            else node = node.right;
            depth++;
        }
        return -1
    },
    isBalanced: function(){
    }
}

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

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const bst = new Tree(testArray);

// EDIT METHODS:

    // bst.insert(10);
    // bst.delete(8);

    // print edited tree:
prettyPrint(bst.root);
ß
// READ METHODS:
    // .find :
            // console.log('return node if found :\n\n', bst.find(9), `\n\nreturn null if not: ${bst.find(10)}\n\n`);

    // .levelOrder (breadth-first):
        // if called with a callback function, every value in the BST will be passed to the CB in level order :
            // bst.levelOrder((x) => console.log(x));
        // if called without argument, it will return an array of all the values in level order : 
            // console.log(bst.levelOrder());

    // same for .inOrder, .preOrder & .postOrder (depth-first):
            // console.log(bst.inOrder())
            // console.log(bst.preOrder())
            // console.log(bst.postOrder())

    // .height
        // returns the height of a given node, returns total height without an argument :
            // console.log(bst.height())   
            // console.log(bst.height(bst.find(67)))  

    // .depth
        // returns the depth of a given value, -1 if value is not found:
            // console.log(bst.depth(324))

    



