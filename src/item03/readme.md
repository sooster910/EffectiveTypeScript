# 코드 생성과 타입이 관계없음을 이해하기

이번 이야기는 코드를 생성하는 파트와 타입오류를 체크하는 파트가 컴파일 내에서 독립적으로 이루어진다는 것을 말하고 있는데, 즉 서로 영향을 미치지 않는다 인것 같다. 

코드에 오류가 있을 때 컴파일에 문제가 있다라고 말하는 경우를 이야기 하는데, 나도 그렇게 생각했었는데 사실 엄밀히 말하면 컴파일과 타입체크는 독립적이니, 타입체크에 문제가 있다고 
말하는게 낫다고 말한다.   
 
그럼 컴파일이 트랜스 파일과 일맥상통한 건가..?  
 
또한 여기선 오류가 있는 코드가 컴파일이 가능하다는 것에 대해 긍정적 이면을 말하는데 어떤부분에 문제가 생겼다고 했을 때, 타입스크립트는 오류가 있어도 컴파일을 하기 때문에  
오류를 수정하지 않더라도 어플리케이션의 다른 부분을 테스트 할 수 있다고 한다. 아마 컴파일에서 멈추면 그 다음 코드베이스 부분에 대한 결과를 알 수 없으니 보여주는게 더 낫다 라는 식으로 해석된다. 

**오류가 있을 때 컴파일을 원치 않는다면?**

`noEmitOnError :true` 

또는 빌드도구에 빌드가 되지 않게 설정 가능.


타입체킹을 위해 타입스크립트를 사용하지만 런타임과 컴파일시에 작동하는 코드를 유의 해서 현명하게 사용해야 하는 것 같다. 


```typescript

interface Square{
    width:number;
}

interface Rectangle extends Square{
    height:number;
}
type Shape = Square | Rectangle

function calculateArea(shape:Shape){
    if(shape instanceof Rectangle){
        return shape.width
        //❗️ 'Rectangle' only refers to a type, but is being used as a value here

    }else{
        return shape.width * shape.width
    }
}

```

위 코드는 트랜스파일링된 코드에선 런타임에서 바로 에러가 났다. 
`ReferenceError: Rectangle is not defined`

Rectangle이 타입스크립트에선 타입이고 자바스크립트에선 Rectangle이 존재하지 않는다. 그래서 레퍼런스에러를 내는데 타입스크립트에선 또한 먼저 에러를 내주고 있다. 🤔 
그 이유는 instanceof 를 사용하면 Rectangle가 위치한 자리는 클래스 올 자리인데 그러면 현재 Rectangle이 클래스인가? Type 으로써 쓰여졌다. 그래서 타입체킹을 해준 듯 하다. 

그럼 shape.width를 리턴하기 위해, width 프로퍼티에 대한 여부를 체크해야 하는데, 
```typescript
 if("height" in shape){
        return shape
```
런타임에서 해결한다. 
