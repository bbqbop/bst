const Node = function(data){
    this.data = data;
    this.left = null;
    this.right = null;
};

const Tree = function(array){
    const editArray = eraseDuplicates(sortArray(array));
    function sortArray(arr){
        if (arr.length <= 1){
            return arr;
        }
        const mid = Math.floor(arr.length / 2);
        const left = sortArray(arr.slice(0, mid));
        const right = sortArray(arr.slice(mid))
        return merge(left, right);
    }
    function merge(left, right){
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
    function eraseDuplicates(arr){
        for (i = 0; i < arr.length - 1; i++){
            if (arr[i] === arr[i + 1]){
                arr.splice(i, 1);
            }
        }
        return arr;
    }
    // this.root = this.buildTree(sortedArray);
    console.log(editArray);
}
Tree.prototype = {
    buildTree : function(array){
    }
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

new Tree(testArray);