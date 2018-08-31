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
    if (!node) {
      return null;
    }
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

  // stack.push('starTrek');
  // stack.push('Kirk');
  // stack.push('Spock');
  // stack.push('McCoy');
  // stack.push('Scotty');
  // stack.display();
  // console.log(stack.pop());
  // stack.display();

  // stack.push(1);
  // stack.push(5);
  // stack.push(2);
  // stack.push(6);
  stack.push(1);
  stack.push(32);
  stack.push(432);
  stack.push(9);
  stack.push(23);
  stack.push(2);
  stack.display();

  sortStack(stack);

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

const parenthesesMatch = str => {
  const stack = new Stack();
  const startParens = RegExp('[{\(\[]');
  // find out why end paraens isnt working
  // const endParens = RegExp('[\)\]}]');
  let char;
  let removed;
  let singleStop = false;
  let doubleStop = false;
  let idx1;
  let idx2;
  for (let i=0; i < str.length; i++) {
    char = str.charAt(i);
    if (char === '\'' && !doubleStop) {
      singleStop = !singleStop;
      idx1=i;
    } 
    if (char === '"' && !singleStop) {
      doubleStop = !doubleStop;
      idx2=i;
    } 
    if (!singleStop && !doubleStop) {
      if (startParens.test(char)) {
        stack.push({
          char:str.charAt(i),
          index: i
        });
      }
      // if (endParens.test(char)) {
      if (char === ')' || char === ']' || char === '}') {
        removed = stack.pop();
        if (removed) {
          if (char === ')') {
            if (removed.char !== '(') {
              return `expecting ) but found ${removed.char} @ index ${i}`;
            }
          }
          if (char === ']') {
            if (removed.char !== '[') {
              return `expecting ] but found ${removed.char} @ index ${i}`;
            }
          }
          if (char === '}') {
            if (removed.char !== '{') {
              return `expecting } but found ${removed.char} @ index ${i}`;
            }
          }
        }
        if (!removed) {
          return `closed ${char} without open starting @ index ${i}`;
        }
      }
    }
  }

  if (singleStop) {
    return `unclosed single quote @ index ${idx1}`;
  }
  if (doubleStop){
    return `unclosed double quote @ index ${idx2}`;
  }
  
  if (!stack.peek()) {
    return 'No unpaired';
  }

  return `open ${stack.peek().data.char} without closed starting @ index ${stack.peek().data.index}`;
};


// function sortStack(stack) {
//   const tempStack = new Stack();
//   while (stack.top !== null) {
//     let temp = stack.pop();
//     while ((tempStack.top !== null) && (tempStack.peek() > temp)) {
//       // console.log(peek(orderedStack));
//       stack.push(tempStack.pop());
//     }
//     tempStack.push(temp);
//   }
//   console.log(JSON.stringify(tempStack));
//   while (tempStack.top !== null) {
//     stack.push(tempStack.pop());
//   }
//   console.log('This is the ordered stack', JSON.stringify(stack));
// }
const sortStack = (stk) => {
  let stack1 = stk;
  let stack2 = new Stack();
  let unsorted = true;


  // console.log(curr.data);
  // console.log('nodeHold ----', nodeHold);
  // console.log(curr.data > nodeHold );
  while (unsorted) {  
    let curr = stack1.peek();
    let nodeHold = stack1.peek().next.data; 
    let popped;
    unsorted = false;  
    while (curr) {      
      console.log(curr.data, ' and ', nodeHold);
      if (curr.data < nodeHold) {
        popped = stack1.pop();
        stack2.push(popped);
        curr = stack1.peek();
      } else {
        if (nodeHold === null) {
          popped = stack1.pop();
          stack2.push(popped);
          curr = stack1.peek();
        } else {
          nodeHold = curr.data;
          stack1.pop();
          popped = stack1.pop();
          stack2.push(popped);
          stack2.push(nodeHold);
          curr = stack1.peek();
          unsorted = true;
        }
      }
      curr ? nodeHold = curr.next ? curr.next.data : null : null;
    }
    let refillPop;
    let refill = stack2.peek();
    while(refill){
      refillPop = stack2.pop();
      stack1.push(refillPop);
      refill = stack2.peek();
    }
    curr = stack1.peek();
  }

  let refillPop;
  let refill = stack2.peek();
  while(refill){
    refillPop = stack2.pop();
    stk.push(refillPop);
    refill = stack2.peek();
  }
  return stk;
};

// true, true, true, false
// console.log(is_palindrome('dad'));
// console.log(is_palindrome('A man, a plan, a canal: Panama'));
// console.log(is_palindrome('1001'));
// console.log(is_palindrome('Tauhida'));

// console.log(parenthesesMatch('(1 + 2) + 3'));
// console.log(parenthesesMatch('(1 + 2) + 3)'));
// console.log(parenthesesMatch(')1 + 2) + 3'));
// console.log(parenthesesMatch('(1 + 2 + (3)'));
// console.log(parenthesesMatch('([({})])'));
// console.log(parenthesesMatch('([({)}])'));
// console.log(parenthesesMatch('\'{("\''));
// console.log(parenthesesMatch('[{\'(\'}(\'\')]'));
// console.log(parenthesesMatch('[{\'("}(\'\')]'));

main();

