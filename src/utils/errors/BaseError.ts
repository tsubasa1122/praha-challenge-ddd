// 参考にしてカスタムクラスを作った https://qiita.com/shibukawa/items/ffe7264ecff78f55b296#%E7%AC%AC%E4%BA%8C%E6%A1%88%E6%88%90%E5%8A%9F

export abstract class BaseError extends Error {
  constructor(e?: string) {
    super(e)
    this.name = new.target.name
  }
}
