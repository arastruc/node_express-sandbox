// ### Désavantage déclenche le code si const
// const maPromesse = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("toto");
//   }, 1000);
// });

// const maPromesseRompue = new Promise((_, reject) => {
//   setTimeout(() => {
//     reject("titi");
//   }, 1000);
// });

// ### Promise Then

function promesseFunc(duration = 1000) {
  console.log("Promesse OK" + duration);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("toto" + duration);
    }, duration);
  });
}

function promesseRompueFunc(duration = 1500) {
  console.log("Promesse KO" + duration);
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("titi");
    }, duration);
  });
}

// promesseFunc()
//   .then((r) => {
//     console.log(r);
//     // throw new Error (r)
//     return r;
//   })

//   .then(function (result) {
//     return new Promise((resolve, _) => {
//       // (*)
//       setTimeout(() => resolve(result + "2eme"), 1000);
//     });
//   })
//   // /.then(()=>  maPromesseRompue.catch(console.log))
//   .then(console.log)
//   .catch((e) => console.log("Echec" + e));

// promesseFunc()
//   .then(console.log)
//   .then(promesseFunc)
//   .then(console.log)
//   .then(promesseRompueFunc)
//   .catch(console.log)
//   .finally(() => console.log("fini "));

// All, race, allSetled, any
// Promise.race([promesseRompueFunc(1000), promesseFunc(1500)])
//   .then(console.log)
//   .catch((e) => console.log("Echec" + e));

//### Async

async function main() {
  const result1 = await promesseFunc();
  console.log(result1);
  const result2 = await promesseFunc(1000);
  console.log(result2);
}

main();
