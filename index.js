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
        const root = new Node(array[mid]);
        root.left = __buildTree(array, start, mid - 1);
        root.right = __buildTree(array, mid + 1, end);
        return root;
    }
    const editedArray = __eraseDuplicates(__sortArray(array));
    this.root = __buildTree(editedArray);
}
Tree.prototype = {
    insert : function(value, root = this.root){
        if (root === null){
            root = new Node(value);
            return root;
        }
        if (value < root.data){
            root.left = this.insert(value, root.left);
        }
        else if (value > root.data){
            root.right = this.insert(value, root.right);
        }
        return root;
    }, 
    delete : function(value, root = this.root){
        if (root === null){
            return root;
        }
        if (value < root.data){
            root.left = this.delete(value, root.left);
        }
        else if (value > root.data){
            root.right = this.delete(value, root.right);
        }
        else {
            // if node has only one or no children
            if (root.left === null){
                return root.right;
            }
            else if (root.right === null){
                return root.left;
            }
            // if node has two children
                // find successor (smallest num to the right):
            root.data = this.findSmallest(root.right);
                // delete the successor node
            root.right = this.delete(root.data, root.right)
        }
        return root;
    },
    findSmallest: function(root){
        let value = root.data;
        while (root.left !== null){
            value = root.left.data;
            root = root.left;
        };
        return value;
    }, 
    find: function(value, root = this.root){
        // if root is empty, return;
        if (root === null || root.data === value){
            return root;
        }
        if (value < root.data){
            return this.find(value, root.left)
        }
        else if (value > root.data){
            return this.find(value, root.right);
        }
    }, 
    levelOrder: function(cb = false){
        const output = [];
        const queue = [];
        queue.push(this.root);
        while (queue.length >= 1){
            if (queue[0] === null){
                queue.shift();
                continue
            }
            output.push(queue[0].data);
            queue.push(queue[0].left, queue[0].right);
            queue.shift();
        }
        if (cb){
            return output.forEach(value => cb(value))
        }
        return output;
    },
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

// bst.insert(10);
// bst.delete(8);

// .find :
    // console.log('return node if found :\n\n', bst.find(9), `\n\nreturn null if not: ${bst.find(10)}\n\n`);

prettyPrint(bst.root);

// .levelOrder :
    // if called with a callback function, every value in the BST will be passed to the CB in level order :
        // bst.levelOrder((x) => console.log(x));
    // if called without argument, it will return an array of all the values in level order : 
        // console.log(bst.levelOrder());


