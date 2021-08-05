
//error 는 있지만 여전히 컴파일이 된다. 
let x ='hello'
x=1234 //Type 'number' is not assignable to type 'string'.

console.log("hi")


interface Square{
    width:number;

}

interface Rectangle extends Square{
    height:number;
}
type Shape = Square | Rectangle

function calculateArea(shape:Shape){
    if(shape instanceof Rectangle){
        return shape.width *shape.height;

    }else{
        return shape.width * shape.width;
    }
}

function NoErrorcalculateArea(shape:Shape){
    if("height" in shape){
        return shape

    }else{
        return shape.width * shape.width
    }
}

