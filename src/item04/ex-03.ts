class C {
    foo
    constructor(foo: string) {
      this.foo = foo;
    }
  }
  
  const c = new C('instance of C');
  console.log(c.foo) //instance of C'
  const d: C = {foo: 'object literal'};  // OK!
  console.log(d.foo) //object literal