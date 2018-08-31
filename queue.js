// const {Stack} = require('./stack');

//Creates a node containing the data and a reference to the next item
class _Node {
  constructor(value) {
    this.value=value,
    this.next=null,
    this.prev=null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    //create a node with the data that you want to add to the queue
    const node = new _Node(data);

    //if the queue is empty, 
    //make the node the first node on the queue
    if (this.first === null) {
      this.first = node;
    }
    //if there is something on the queue already
    //then take the node that is currently at the end of the queue
    //and link it to the new node
    if (this.last) {
      node.next = this.last;
      this.last.prev = node;
    }
    //make the new node the last item on the queue
    this.last = node;
  }
  dequeue() {
  //if the queue is empty, there is nothing to return
    if (this.first === null) {
      return;
    }
    //make the first item on the queue to be the 
    //the item that is next on the line 
    // the item after the current first item

    const node = this.first;
    this.first = node.prev;

    //if this is the last item in the queue
    if (node === this.last) {
      this.last = null;
    }

    return node.value;
  }
}

const peek = (queue) => {
  return queue.first;
};

const display = (queue) => {
  let curr = peek(queue);
  console.log('----- Start of queue -----');
  while (curr) {
    console.log(curr.value);
    curr = curr.prev;
  }
  console.log('----- End of queue -----');
};

let main = () => {
  const queue = new Queue();
  queue.enqueue('starTrekQ');
  queue.enqueue('Kirk');
  queue.enqueue('Spock');
  queue.enqueue('Uhura');
  queue.enqueue('Sulu');
  queue.enqueue('Checkov');

  // console.log(peek(queue));
  // display(queue);

  const squareQ = new Queue();
  squareQ.enqueue({gender: 'F', name:'Jane'});
  squareQ.enqueue({gender: 'M', name:'Frank'});
  squareQ.enqueue({gender: 'M', name:'John'});
  squareQ.enqueue({gender: 'M', name:'Sherlock'});
  squareQ.enqueue({gender: 'F', name:'Madonna'});
  squareQ.enqueue({gender: 'M', name:'David'});
  squareQ.enqueue({gender: 'M', name:'Chris'});
  squareQ.enqueue({gender: 'F', name:'Beyonce'});
  squareQ.enqueue({gender: 'F', name:'Sasha'});
  
  dancePair(squareQ);

  const bankQ = new Queue();
  bankQ.enqueue('A');
  bankQ.enqueue('B');
  bankQ.enqueue('C');
  bankQ.enqueue('D');
  bankQ.enqueue('E');
  bankQ.enqueue('F');
  bankQ.enqueue('G');
  bankQ.enqueue('H');
  bankQ.enqueue('I');
  // display(bankQ);
  ophidianBank(bankQ);
};

const dancePair = (queue) => {
  let combinedQueue = queue;
  let mQueue = new Queue();
  let fQueue = new Queue();

  while (combinedQueue.first !== null) {
    if (combinedQueue.first.value.gender === 'M') {
      mQueue.enqueue(combinedQueue.dequeue());
    } else {
      fQueue.enqueue(combinedQueue.dequeue());
    }
  }
  
  while (mQueue.first !== null && fQueue.first !== null) {
    console.log(`Female dancer is: ${fQueue.first.value.name} and the male dancer is: ${mQueue.first.value.name}`);
    mQueue.dequeue();
    fQueue.dequeue();
  }
  let count = 0;
  if (mQueue.first !== null) {
    while (mQueue.first !== null) {
      mQueue.dequeue();
      count++;
    }
    console.log(`There ${count > 1 ? 'are' : 'is'} ${count} male dancer${count > 1 ? 's' : ''} waiting to dance.`);
  } else if (fQueue.first !== null) {
    while (fQueue.first !== null) {
      fQueue.dequeue();
      count++;
    }
    console.log(`There ${count > 1 ? 'are' : 'is'} ${count} female dancer${count > 1 ? 's' : ''} waiting to dance.`);
  } else {
    console.log('Everyone has a partner! Dance Party!');
  }
};


const ophidianBank = queue => {
  let hold;
  let count=0;
  while(peek(queue)) {
    let random = Math.floor(Math.random()*4);
    if (random === 0) {
      hold = queue.dequeue();
      console.log(`${hold} had to go back in line`);
      queue.enqueue(hold);
    } else {
      queue.dequeue();
    }
    count++;
    // display(queue);
  }

  console.log(`took ${count} tries`);
};
main();