# プラハチャレンジ DDD 課題用のリポジトリ

### Install Dependencies:

```bash
$ yarn install
```

### Create Database(docker で環境構築する場合)

```bash
$ cd .docker
$ docker-compose up -d
```

### Migration and Seed

※ ORM に[Prisma](https://www.prisma.io/) を用いているので、マイグレーション実行後には prisma client(Query builder の役割を持つ)側にもカラムの変更を反映させる必要があります。

```bash
$ yarn run migrate:dev (本番環境の場合はyarn migrate:prd)
$ yarn run model-generate
$ yarn run db:seed
```

### Test

**単体テスト**

```bash
$ yarn test
```

**結合テスト**

```bash
$ yarn test:integration
```

### Design

- ER 図(`er.png`)・ドメインモデル図(`domain-model.png`)・ユースケース図(`usecase.png`)は`./design`配下に置いています。

### エラー処理について

- 型安全にコードを書きたい(throw error すると型の恩恵を受けられない)
- エラーメッセージやエラー情報を柔軟に定義したい
- 複雑化させたくない

上記の理由からカスタムエラーのオブジェクトを実装するパターンを参考にしました。
https://qiita.com/kabosu3d/items/680728362314f51bdcb0#3-%E3%82%A8%E3%83%A9%E3%83%BC%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E8%BF%94%E5%8D%B4%E3%81%99%E3%82%8B

基本的には、`BaseError`クラスを継承したカスタムクラスを作成してエラーを表現します。
共通のエラーは`utils/errors/sharedErrors.ts`に定義する。
