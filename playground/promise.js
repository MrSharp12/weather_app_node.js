let asynchAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arugments must be numbers');
            }
        }, 1500);
    });
}

asynchAdd(10, 40).then((res) => {
    console.log('Result: ', res);
    return asynchAdd(res, 33);
}).then((res) => {
    console.log('Should be 83', res);
}).catch((errorMessage) => {
    console.log(errorMessage);
});
// let somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('Hey, it worked!');
//         reject('unable to fulfill promise');
//     }, 2500); 
// });

// somePromise.then((message) => {
//     console.log('Success: ', message);
// }, (errorMessage) => {
//     console.log('Error: ', errorMessage);
// });