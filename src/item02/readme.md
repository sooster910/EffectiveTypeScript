# 타입스크립트 설정 이해하기 

## `noImplicitAny`
변수들이 미리 정의된 타입을 가져야 하는가 ? 에 대한 여부를 제어 한다.  
 
아마도 타입을 지정하지 않으면 암묵적으로 any로 지정하게 되는데, noImplicitAny이니 암묵적인 지정을 하지 않겠다 라고 하니 반대로 생각하면, 사용자가 지정을 해줘라이런 부분에 대한 체킹을 제어하기 위한 것인 것 같다.   
 
false 일 경우, 타입스크립트가 any타입으로 추론한다. 
`Parameter 'a' implicitly has an 'any' type, but a better type may be inferred from usage.ts(7044)
(parameter) a: any`

true일 경우,  
`error TS7006: Parameter 'a' implicitly has an 'any' type.`  

타입이 없는경우 any타입으로 간주되는 암시적any 상태이기 때문에, 이 부분에 대해 명시적으로 :any선언 또는 좀 더 분명한 타입을 사용 하면 에러를 해결할 수 있다. 
저자는 타입정보를 가질 때 더 효과적이므로, 되도록 true로 설정하는것을 권했다.  

**어느 상황에 설정 또는 비설정?**
- 새 프로젝트를 시작할 때 설정하는 것을 추천- 가독성, 생산성 향상
- 자바스크립트를 타입스크립트로 전환하는 상황에는 설정해제 


## `stricNullChecks`

- `null`과 `undefined` 가 모든 타입에서 허용하는가? 에 대한 여부 확인

- false 시 ,
```typescript
const x: number = null; ✅ 
```
null 또는 undefined 의 값에 대해 관대해짐을 볼 수 있다.  

- true 시,

null과 undefined의 값이 모든 타입에 허용되는 것은 아니다. 

```typescript
Type 'null' is not assignable to type 'number
```
null 또는 undefined의 값을 number type에 지정할 수 없다고 나온다. 

책에서 명시적으로 null 타입을 허용 함으로써 오류를 해결한다고 한다.

```typescript 
const x:number | null = null 
```


모든 타입에 허용 되는 것은 아니라고 했으니, `any`타입으로 시도해 보니 any는 괜찮다.
  
`noImplicityAny`는 매개변수에 해당 되는 것 같다. 변수에 타입을 지정하지 않았을 땐, 타입체킹에 이상이 없다고 나온다. 
```typescript
const el = document.getElementById('status');
el.textContent = 'Ready'; ❗️// Object is possibly 'null'.ts(2531)
```
- 추론한 타입은 `const el: HTMLElement | null` 이다.
컴파일러 입장에선 el에 대해서는 HTMLElement 가 확실치는 않다. 그래서 null일 수도 있다.

여기서 null값 을 허용하지 않으려면,
```typescript
if(el){
    el.textContent = 'Ready' //const el: HTMLElement  : 확실하게 assertion한다.
}

el!.textContent= 'Ready' //const el: HTMLElement | null이지만, !를 사용함으로써 el이 null값은 아니라고 가정한다. 
```
stricNullCheckes 설정 없이 개발을 하기로 했다면, "undefined" 는 객체가 아니라는 런타임 오류를 주의 하라고 한다.   

`stric:true` 설정을 하게 되면 `strictNullChecks` 와 `noImplicitAny` 체크를 모두 하게 된다. 즉, 이 두개의 설정이 따로 없어도 된다. 

