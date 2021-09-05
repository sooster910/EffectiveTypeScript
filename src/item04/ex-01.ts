interface Vector3D{
    x:number;
    y:number;
    z:number
}

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

  // NamedVector 구조가 Vector2D와 호환되기 때문에, calculateLength호출이 가능-> 즉 구조적 타이핑이라는 용어가 사용됨 
  // 이런 구조적 타이핑은 문제를 발생시키기도함 


  const normalize=(v:Vector3D)=>{ //Vector3D 인터페이스로 넘김 
    //3D  인터페이스로 넘겼지만, 사실 calculateLength에선 Vector2D의 인터페이스로 지정했기 때문에. 
    //Vector2D를 다루고 있다.  
    const length = calculateLength(v);
    return{
        x:v.x /length,
        y:v.y/length,
        z:v.z/length,
    }
  }

   const normalizeValue=normalize({x:3,y:4,z:5});
   console.log(normalizeValue)
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



