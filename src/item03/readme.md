# 코드 생성과 타입이 관계없음을 이해하기

이번 이야기는 코드를 생성하는 파트와 타입오류를 체크하는 파트가 컴파일 내에서 독립적으로 이루어진다는 것을 말하고 있는데, 즉 서로 영향을 미치지 않는다 인것 같다. 

코드에 오류가 있을 때 컴파일에 문제가 있다라고 말하는 경우를 이야기 하는데, 나도 그렇게 생각했었는데 사실 엄밀히 말하면 컴파일과 타입체크는 독립적이니, 타입체크에 문제가 있다고 
말하는게 낫다고 말한다.   
 
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

그럼 shape.height 리턴하기 위해, height 프로퍼티에 대한 access 여부를 체크해야 하는데, 
```typescript
 if("height" in shape){
        return shape
```
이런식으로 타입체크가 아닌 런타임에서 shape에 height 프러퍼티가 있는지 확인하는 것으로 해결한다.

또는, class를 사용하게 되면 값으로써, 타입으로써 모두 사용이 가능하다. 


```typescript

class Square{
    constructor(public width:number){}

}
class Rectangle extends Square{
    constructor(public width:number, public height:number){
        super(width)
    }
}

type Shape = Square | Rectangle;

```

이렇게 사용하여 타입스크립트는 타입체킹에서 에러 없이 알아서 타입을 추론해 준다.

type들이 값으로써 참조되는지 타입으로서 참조되는지를 구분하는게 중요한 것 같다. 

#### 타입 연산은 런타임에 영향을 주지 않는다.

`as number` 와 같은 타입연산에서, 타입을 강제화 하기 위해서 타입연산을 사용했지만 런타임에서 자바스크립트로 트랜스파일링 하는 과정에서는 타입이 강제화 되지 않는다. 결국 타입을 강제화 하려고 한것이 런타임에 아무런 영향을 주지 못하고 컴파일 되어버린다. 

이 부분은 조심해야 할 것 같다. 타입체커를 통과해 아무런 에러를 내지 않다는 점은 곧 런타임에서 문제가 생기기 때문이다. 

#### 런타임 타입은 선언된 타입과 다를 수 있다. 
fetch request로 부터의 리턴된 객체를 interface를 이용하여 
type을 선언했을때, 실지 리턴된 객체내의 property 또는 value의 타입이 다를 수도 있다는 것을 이야기한다. 
이 부분을 좀 고려하여 다르게 리턴 될 수 있다는 case를 사용하거나 any를 사용하면 되려나..?

#### 타입스크립트 타입으로는 함수를 오버로드 할 수 없다. 
타입스크립트는 함수오버로딩이 안된다고 한다. 
그 이유는 런타임시 타입이 제거되고 나면, 중복된 함수가 정의 되어 있기 때문이다. 

대신 타입스크립트는 **타입 수준**에서는 함수 오버 로딩이 가능하다. 그렇다고 해서 구현체가 여러개가 된다는 의미는 아니다. 
 







타입스크립트에 대해 알아갈 수 록 재미있는 것 같고, 왜 그런지에 대해 납득이 되는 설명덕분에 실제 타입을 사용할 때 한번더 생각해보게 된다. 옷 신기하다!  
