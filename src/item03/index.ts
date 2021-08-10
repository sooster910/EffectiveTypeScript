// "noImplicitAny": false


//error 는 있지만 여전히 컴파일이 된다. 
let x ='hello'
x=1234 //Type 'number' is not assignable to type 'string'.

console.log("hi")


// interface Square{
//     width:number;

// }

// interface Rectangle extends Square{
//     height:number;
// }
// type Shape = Square | Rectangle

function calculateArea(shape:Shape){
    if(shape instanceof Rectangle){
        return shape.width *shape.height;

    }else{
        return shape.width * shape.width;
    }
}

function NoErrorcalculateArea(shape:Shape){
    if("height" in shape){ //✅ shape은 값이므로 runtime에서 괜찮음 
        return shape

    }else{
        return shape.width * shape.width
    }
}


//class 

class Square{
    constructor(public width:number){}

}
class Rectangle extends Square{
    constructor(public width:number, public height:number){
        super(width)
    }
}

type Shape = Square | Rectangle;

function classCalculateArea(shape: Shape){
    if(shape instanceof Rectangle){ // ✅ Reactangle의 class로 값으로써 사용. 
        return shape.width *shape.width
    }else{
        return shape.width *shape.width
    }
}

function add(a:number, b:number):number;
function add(a:string, b:string):string;

function add (a:any,b:any){
    return a +b
}

const three= add(1,2)
const twelve = add('1','2')