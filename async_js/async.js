/////////////////////////////////////////////////////////////////
//               Ajax example                                  //
//                                                             //
/////////////////////////////////////////////////////////////////
// window.onload = () => {
//     let http = new XMLHttpRequest();

//     http.onreadystatechange = () => {
//         if (http.readyState === 4 && http.status === 200) {
//             console.log(JSON.parse(http.response));
//         }
//     };

//     http.open("GET", "/data/tweets.json", true);
//     http.send();

//     $(document).ready(() => {
//         $.get("/data/tweets.json", (data) => {
//             console.log(data);
//         });
//     });
// };
/////////////////////////////////////////////////////////////////

// window.onload = () => {
////////////////////////////////////////
// callback example
// let callback = (fruit) => {
//     console.log(fruit);
// }
// let fruits = ["banana", "apple", "pear"];
// 
// fruits.forEach(callback);
// 
// 
// let callback = (data) => {
//     console.log(data);
// }
// $.get("/data/tweets.json", callback);
////////////////////////////////////////

//////////////////////////////////////////////////////////
//              callback hell.
//
//////////////////////////////////////////////////////////
//     let errorHandler = (jqXHR, textStatus, error) => {
//         console.log(error);
//     }

//     let callbackTweets = (data) => {

//         console.log(data);
//         // get data from friends.
//         $.ajax({
//             type: "GET",
//             url: "/data/friends.json",
//             success: (data) => {
//                 console.log(data);
//                 // get data from videos.
//                 $.ajax({
//                     type: "GET",
//                     url: "/data/videos.json",
//                     success: (data) => {
//                         console.log(data);
//                         // get data from friends.

//                     },
//                     error: errorHandler
//                 });
//             },
//             error: errorHandler
//         });
//     };

//     $.ajax({
//         type: "GET",
//         url: "/data/tweets.json",
//         success: callbackTweets,
//         error: errorHandler
//     });
// };
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
//                  promises
//
//////////////////////////////////////////////////////////
// window.onload = () => {
// let get = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhttp = new XMLHttpRequest();
//         xhttp.open("GET", url, true);
//         xhttp.onload = () => {
//             if (xhttp.status === 200) {
//                 resolve(JSON.parse(xhttp.response));
//             } else {
//                 reject(xhttp.statusText);
//             }
//         };
//         xhttp.onerror = () => {
//             reject(xhttp.statusText);
//         };
//         xhttp.send();
//     });
// };

// let promise = get("/data/tweets.json");

// promise.then((tweets) => {
//     console.log(tweets);
//     return get("/data/friends.json");
// }).then((friends) => {
//     console.log(friends);
//     return get("/data/videos.json");
// }).then((videos) => {
//     console.log(videos);
// }).catch((err) => {
//     console.log(err);
// });

// Jquery
// $.get("/data/tweets.json").then((tweets) => {
//     console.log(tweets);
//     return $.get("/data/friends.json");
// }).then((friends) => {
//     console.log(friends);
//     return $.get("/data/videos.json");
// }).then((videos) => {
//     console.log(videos);
// }).catch((err) =>{
//     console.log(err);  
// });
// };
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
//                  generators
//
//////////////////////////////////////////////////////////
window.onload = () => {
    // example
    //     let gen = function* () {
    //         let x = yield 10;
    //         console.log(x);
    //     };

    //     let myGen = gen();

    //     console.log(myGen.next());
    //     console.log(myGen.next(20));
    let getWrap = function* () {
        let tweets = yield $.get("/data/tweets.json");
        console.log(tweets);
        let friends = yield $.get("/data/friends.json");
        console.log(friends);
        let videos = yield $.get("/data/videos.json");
        console.log(videos);
    }

    let genWrap = generator => {
        let gen = generator();

        let handle = yielded => {
            if (!yielded.done) {
                yielded.value.then(data => {
                    return handle(gen.next(data));
                });
            }
        }

        return handle(gen.next());
    };

    genWrap(getWrap);
};