var root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    right: {
      val: "F"
    }
  }
};

// 递归写法
// 前序
function preorder(root){
  if(!root){
     return
  }
  console.log(root.val)  // 打印当前遍历的节点
  preorder(root.left)    // 递归遍历左子树
  preorder(root.right)   // 递归遍历右子树
}

// 中序
function inorder(root) {
  if(!root) {
      return 
  }
   
  inorder(root.left)       // 递归遍历左子树
  console.log(root.val)    // 打印当前遍历的结点
  inorder(root.right)      // 递归遍历右子树
}

// 后序
function postorder(root) {
  if(!root) {
      return 
  }
   
  inorder(root.left)       // 递归遍历左子树
  inorder(root.right)      // 递归遍历右子树
  console.log(root.val)    // 打印当前遍历的结点
}