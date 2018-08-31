//Creates a node containing the data and a reference to the next item
class _Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    //if the top of the stack is empty, then the data will be the
    //top of the stack
    if (this.top === null) {
      this.top = new _Node(data, null);
      return this.top;
    }

    //if the top already has something then create a new node
    //add data to the new node
    // have the pointer point to the top 
    const node = new _Node(data, this.top);
    this.top = node;
  }

  pop() {
    //in order to remove the top of the stack, you have to point
    //the pointer to the next item and that next item becomes the
    //top of the stack
    const node = this.top;
    this.top = node.next;
    return node.data;
  }

  peek() {
    // console.log(this.top ? this.top : 'Empty stack');
    return this.top ? this.top : null;
  }

  display() {
    let str='';
    let curr = this.top;
    console.log('----- Top of stack -----');
    while (curr) {
      console.log(curr.data);
      str += curr.data;
      curr = curr.next;
    }
    console.log('----- Bottom of stack -----');

    // console.log(str);
    return str;
  }
}

let main = () => {
  const stack = new Stack();

  stack.push('starTrek');
  stack.push('Kirk');
  stack.push('Spock');
  stack.push('McCoy');
  stack.push('Scotty');
  stack.display();
  console.log(stack.pop());
  stack.display();
};

function is_palindrome(str) {
  str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  // your code goes here
  const stack = new Stack();
  for (let i = 0; i < str.length; i++ ) {
    stack.push(str.charAt(i));
  }

  let reverseStr = '';
  let curr = stack.peek();
  while (curr) {
    reverseStr += stack.pop();
    curr = stack.peek();
  }
  return str === reverseStr;
}

const parens = str => {
  
};

// true, true, true, false
console.log(is_palindrome('dad'));
console.log(is_palindrome('A man, a plan, a canal: Panama'));
console.log(is_palindrome('1001'));
console.log(is_palindrome('Tauhida'));

// main();