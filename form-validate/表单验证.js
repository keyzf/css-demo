export class Test {
  constructor() {
    this.options = [
      {
        key: 'inputTitle',
        error: 'Please enter Title',
      },
      {
        key: 'inputTitle',
        check: value => value.length <= 100,
        error: 'Title up to 100 characters',
      },
      {
        key: 'inputDescription',
        check: value => /^[A-Z0-9]+$/.test(value),
        error: 'Description up to 50 characters',
      }
    ]
  }
  validate() {
    return new Promise((resolve, reject) => {
      let { options } = this;
      for (let i = 0; i < options.length; i++) {
        let { key, check, error } = options[i];
        let condition = check ? !check(this[key]) : !this[key];
        if (condition) {
          reject(error);
          break;
        }
      }
      resolve();
    })
  }
}

let Test = new Test();
Test.
validate.then(() => {
  // 验证通过后执行的代码
}).catch(err => {
  //验证提示
  this.$message.warning(err);
})