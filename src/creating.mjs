import setText, { appendText } from "./results.mjs";

export function timeout(){
    let wait = new Promise( (resolve) => {
        setTimeout( () => {
            resolve("Timeout!");
        }, 1500);
    });

    wait.then( text => setText(text) );
}

export function interval(){
    let counter = 0;
    let wait = new Promise( (resolve) => {
        setInterval( () => {
            console.log("Interval");
            resolve(`Timeout! ${++counter}`);
        }, 1500);
    });

    wait
    .then( text => setText(text) )
    .finally( () => appendText( `--Done ${counter}`));
}

export function clearIntervalChain(){
    let counter = 0;
    let interval = 0;  
    let wait = new Promise( (resolve) => {
        interval = setInterval( () => {
            console.log("Interval");
            resolve(`Timeout! ${++counter}`);
        }, 1500);
    });

    wait
    .then( text => setText(text) )
    .finally( () => clearInterval(interval));
}

export function xhr(){
    let request = new Promise ( (resolve,reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open('GET',"http://localhost:3000/users/3");
        xhr.onload = () => {
            if(xhr.status === 200){
                resolve(xhr.responseText)
            } else{
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject('Request failed');
        xhr.send();
    });
    request
    .then( result => setText(result))
    .catch( reason => setText(reason));
}

export function allPromises(){
    let categories = axios.get("http://localhost:3000/itemCategories");
    let statuses = axios.get("http://localhost:3000/orderStatuses");  
    let userTypes = axios.get("http://localhost:3000/userTypes");
    
    Promise.all( [categories, statuses,userTypes] )
    .then( (cat, stat, type) => {
        setText("");

        appendText(JSON.stringify(cat.data));
        appendText(JSON.stringify(stat.data));
        appendText(JSON.stringify(type.data));
    });
}

export function allSettled(){
}

export function race(){
}