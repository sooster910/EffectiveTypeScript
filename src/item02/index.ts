function add(a,b){
    return a+b
}

add(10,undefined)

const x:number = undefined;  
console.log(x)

const el = document.getElementById('status');
el.textContent = 'Ready';
console.log(el.textContent)


if(el){
    el.textContent = 'Ready' //const el: HTMLElement  : 확실하게 assertion한다.
}

el!.textContent= 'Ready' //const el: HTMLElement | null이지만, !를 사용함으로써 el이  null값은 아니라고 가정한다. 
 


