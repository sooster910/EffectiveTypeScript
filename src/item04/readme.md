

### 타입스크립트는 자바스크립트(덕 타이핑 기반)를 모델링하기위한 구조적 타이핑을 사용한다.

- `NamedVector` 구조가 `Vector2D`와 호환되기 때문에, `calculateLength()` 호출이 가능-> 즉 구조적 타이핑이라는 용어가 사용됨 


```typescript

interface Vector2D {
    x: number;
    y: number;
  }

interface NamedVector{
    name: string;
    x:number;
    y:number;
}
const v:NamedVector = {x:3,y:4,name:"zee"};

const calculateLength=(v: Vector2D)=> {
    return Math.sqrt(v.x**2 +v.y**2);

  }

  console.log(calculateLength(v));

```
- 이런 구조적 타이핑은 문제를 발생시키기도함.
- 기대값과는 다른 값이 나옴.

```typescript
  

  const normalize=(v:Vector3D)=>{ //Vector3D 인터페이스로 넘김 
     
    const length = calculateLength(v); //3D  인터페이스로 넘겼지만, 사실 calculateLength에선 Vector2D의 인터페이스로 지정했기 때문에. 
    //Vector2D를 다루고 있다.

    return{
        x:v.x/length,
        y:v.y/length,
        z:v.z/length,
    }
  }

   const normalizeValue = normalize({x:3,y:4,z:5});
   console.log(normalizeValue)


```

기대했던 값 :
```javascript
{ x: 0.4242640687119285,
  y: 0.565685424949238,
  z: 0.7071067811865475 }

```

실제 값 :
```javascript
{ x: 0.6, y: 0.8, z: 1 }

```

그럼 왜 타입스크립트에선 `calculateLength()`에서 2D벡터를 받도록 선언되었음에도 불구하고, 3D 벡터를 받는데는 문제가 없었던 걸까?

- 구조적 타이핑 관점에서 x,y가 Vector2D와 호한되기 때문에, 오류 발생도 없었고 타입체커가 문제로 삼지 않았다. 
- 디벨로퍼들은 함수를 작성할 때 호출에 사용되는 매개변수의 속성들이 실제 매개변수의 타입에 선언된 속성만을 가질거라 생각하기가 쉽다. 

예1) 

```typescript
    interface Vector3D{
        x:number;
        y:number;
        z:number
    }
   function calculateLength1(v:Vector3D){
        let length=0;
        for(const axis of Object.keys(v)){
            const coord = v[axis];
            length+=Math.abs(coord);
        }
        return length;
   }


```


이 코드를 실행하면 
```
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Vector3D'.
  No index signature with a parameter of type 'string' was found on type 'Vector3D'.

47             const coord = v[axis];
                             ~~~~~~~

```
에러를 가진다. 

코드의 흐름을 보면 에러가 왜 나왔는지 납득하기가 조금 어렵다. 그 이유는 아마도, v는 x,y,z 속성을 가진 객체이고 이 객체의 타입은 모두 number이며 변수 `coord` 또한 당연히 숫자가 되므로, length 결과를 얻는데에도 문제가 없다고 생각하므로 오류의 납득이 어렵다.  

하지만 본문에선, 사실 v[axis]가 number일 거라고만 단정하기 어렵다는 것이다. 

예를 들어,

```typescript
interface NamedVector3D{
    x:number,
    y:number,
    z:number,
    name:string
}

const v: NamedVector3D = {
    x:3,
    y:4,
    z:5,
    name: 'namedVector3D'
}

calculateLength1(v) 

```

이런경우의 코드는, 타입체킹에서는 `NamedVector3D`는 `Vector3D`의 속성을 다 가지고 있기 때문에 문제가 없다.
하지만 런타임에서 for 문에서 실제 `length+=Math.abs(coord);` 연산에서 `coord` 가 `name`속성을 가지는 변수는 타입이 `string`이기 때문에 에러가 난다. 

이것을 해결할 다양한 방법이 있겠지만, 현재 이 챕터에서는 각 속성을 모두 더하는 구현이 더 낫다는 결론이다.  

```typescript 
interface Vector3D {
  x: number;
  y: number;
  z: number;
}
function calculateLengthL1(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}

```

### 클래스도 구조적 타이핑 규칙을 따른다.   

예)

```typescript

class C {
    foo
    constructor(foo: string) {
      this.foo = foo;
    }
  }
  
const c = new C('instance of C');
console.log(c.foo) //instance of C'
const d: C = {foo: 'object literal'};  // OK!
console.log( d instanceOf C) //false
console.log(d.foo) //object literal

```
클래스 C 는 값으로서의 클래스와, 타입으로서의 클래스를 나타냈다.

`class C` 를 타입으로 사용했을 때 `d`가 C타입에 할당되는 이유:

객체 d는 C의 타입으로서 체크하는 일반 객체이다. 구조적으로는 필요한 속성과 생성자가 존재하기 때문에 컴파일시 문제가 없다. 


책의 뒷부분에 설명될 이런 구조적타이핑의 문제로 야기되는 것들을 해결할 방안이 나온다. 