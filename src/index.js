import '@Css/style'
import '@Scss/style'
import _ from 'lodash';

function logAdd() {
  console.log('================')
  console.log(_.add(2+2))
  console.log('================')
}

function greet(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Hello ${name}!`);
    }, 1000);
  });
}

// I know this is dumb
// Just for demo purpose
async function print() {
  const response = await greet('John Johnes Doe');
  console.log(response);
}

print();
logAdd()