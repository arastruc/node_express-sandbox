// const fs = require("fs");

// const timeoutScheduled = Date.now();

// function someAsyncOperation() {
//   fs.readFile("toto.txt", () => {
//     setTimeout(() => {
//       const delay = Date.now() - timeoutScheduled;
//       console.log(`${delay}ms TimeOut have passed since I was scheduled`);
//     });
//     setImmediate(() => {
//       const delay = Date.now() - timeoutScheduled;
//       console.log(`${delay}ms Immediate have passed since I was scheduled`);
//     });

//     setImmediate(() => {
//       const delay = Date.now() - timeoutScheduled;
//       console.log(`${delay}ms Immediate 2 have passed since I was scheduled`);
//     });
//   });
// }

// // do someAsyncOperation which takes 95 ms to complete
// someAsyncOperation();

// // () => {
// //   const startCallback = Date.now();

// //   // do something that will take 10ms...
// //   while (Date.now() - startCallback < 10) {
// //     // do nothing
// //   }
// // });

// timeout_vs_immediate.js
const fs = require("fs");

const timeoutScheduled = Date.now();

fs.readFile("toto.txt", (_, data) => {
  setTimeout(() => {
    console.log(data);
    const delay = Date.now() - timeoutScheduled;
    console.log(`${delay}ms TimeOut have passed since I was scheduled`);
    console.log("timeout");
  }, 0);

  setImmediate(() => {
    // console.log(data);
    const delay = Date.now() - timeoutScheduled;
    console.log(`${delay}ms Immediate 1 have passed since I was scheduled`);
    console.log("immediate");
  });
  setImmediate(() => {
    console.log(data);
    const delay = Date.now() - timeoutScheduled;
    console.log(`${delay}ms Immediate 2 have passed since I was scheduled`);
    console.log("immediate");
  });
});
