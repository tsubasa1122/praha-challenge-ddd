# プラハチャレンジ DDD 課題用のリポジトリ

### Install Dependencies:

```bash
$ yarn install
```

### Create Database(docker で環境構築する場合)

```bash
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
$ yarn test:unit
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

### 疑問点　 or 対応予定

- 例外処理の方針
  - 上記のエラー処理についての欄で記載していたが throw しないとトランザクションのロールバックを手動で行う必要がある
  - Custom エラーは残しておいた方が良さそう
- 集約ごとのインスタンス生成時にわざわざ Factory を作るべきなのか？
  - 個人的には別集約のインスタンスを生成する際に Factory は使用するイメージがある
  - Factory の目的を深掘りした方が良さそう
- コントローラーでのバリデーションについて
  - 良さげなライブラリを探す
- 在籍ステータスをどのように管理するか？
  - 現場: name
  - status code 的なカラムを持たせるべき？
- DTO 的なクラスを作るべきか？
- prismaClient のインスタンスをどこで生成するか？
- インスタンス参照しているエンティティの生成方法
- request.body に型を付ける方法を調べる
  - 今は as を使ってアサーションしている
  - params にしか対応していなさそう？https://blog-mk2.d-yama7.com/2020/03/20200314_express-reqres-generics/
  - https://stackoverflow.com/questions/48027563/typescript-type-annotation-for-res-body
- catch e <- の error の型が any になってしまう問題をどうしたらいいのか
  - そもそも Javascript の仕様なので回避策がなさそう？
    - 一旦はガード節を用いて、Error クラスのインスタンスなら指定のメッセージを返すような実装にした
  - https://labs.septeni.co.jp/entry/2020/07/23/100000
  - https://github.com/Microsoft/TypeScript/issues/20024
  - https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript/54649617
  - https://github.com/express-promise-router/express-promise-router/issues/230
- テスト時の prisma のモック化をどうしているのか？
  - ドキュメントに従って DI する実装にしてみた
  - https://www.prisma.io/docs/guides/testing/unit-testing#mocking-the-prisma-client
  - 実際のテスト DB を使ってテストしたい。データのリセットはどうする？
    - そもそも DB のデータを使っている時点で結合テスト？
    - repository のテストをしたい場合は結合テストとして扱った方が良いのだろうか？
- TODO: faker 的なものを入れる
- パラメータのテストについて
  - 値が undefined になる場合のテストはした方がいいのか？
  - undefined になり得るパターンがイマイチ分かっていない...
  - 空文字(""), null はテスト出来ているので問題ない？
- インスタンス参照しているオブジェクトを recreate する際に参照先のクラスの recreate メソッドを強制的に呼ぶ方法は何かある？

  - recreate 時に渡すパラメータを参照先のオブジェクトを生成するために必要となるプリミティブな値を渡すようにし、recreate 内で recreate メソッドを呼ぶようにする？

  ```ts
  interface ParticipantRecreateParams {
    name: string
    email: string
    enrollmentStatus: {
      name: string
    }
  }

  public static recreate(
    props: ParticipantRecreateParams,
    id: Identifier,
  ): Participant {
    const enrollmentStatus = EnrollmentStatus.recreate(props.enrollmentStatus)
    const { name, email } = props
    return new Participant({name, email, enrollmentStatus}, id)
  }
  ```

- get 系の処理で usecase を作るべきか？
  - データを取得するだけならいらなそう？
- QueryService のインターフェイスはどこに配置する？
- Data ベースから取得したデータはプリミティブな値になる
  - enrollmentStatus の name など、独自の型を定義した場合、インスタンスを際生成する際はどうしている？
  - DB の値 = 正しいとみてプリミティブな値(今回だと string)を入れるように型を付ける
- $disconnect を明示的に行う理由
- Participant の各プロパティを VO に分解した方が良い？
- prisma 側のエラー検知方法を調査する
- 今のドメインモデル図だとタスクの新規作成時にステータスも保持しないといけない
  - そもそもユーザーがタスクを登録するという用件に対応するべき？
- 大きめの TypeScript プロジェクトの名前付けはどうしているんだろう？
  - 例えば、`/participant/task.ts`と`/task.ts`というファイルがあった時、どちらも Task class になるのは問題ない？
- 課題を作成時に参加者全員に紐付ける処理を行う場合
  - 今は全件取得して登録しているがデータが増えた(参加者が増えた)時にボトルネックになりそう
    - 1. バルクインサートする(一時的対策)
    - 2. 非同期処理にする
  - QS ではなく、通常のリポジトリで getAll メソッドを生やしてるが使い分けで混乱しそう...
- 課題更新 API をどうするべきか
  - 今回の課題では一度課題を作成したら内容を修正出来ないようにした(考え出すと進まなくなるので...)
- 課題の更新 API の URL 設計をどうする？
  - 1. patch `/:taskId/not_started`などステータスごとにパスを分ける？(ステータスの更新はデータの更新はシンプルなので、ここまでやる必要はないかも？)
  - 2. patch `/:taskId` DDD 的にはリソース毎に更新させるので、これが正しい？(あくまでもデータの取り出しだけなので、URL は関係ない？)
  - 3. patch `/:taskId/status` 個人的にはこれが一番しっくりくる
- value object でよく使うクラスは prefix を付けるべきか？
  - 例: name -> participantName とした方が良い？
- value object は usecase 層で作成しているみたい
  - https://github.com/stemmlerjs/ddd-forum/blob/ea393502396c91b7d85fdcc664b158de683a0bf2/src/modules/users/useCases/createUser/CreateUserUseCase.ts#L29-L31
  - 自分は create メソッド内で生成する実装にした
  - Factory クラスを作っても良さそう？
    - 松岡さんの本から、モデル内に FactoryMethod を作っている例があったので、それを採用して良さそう
      - Value Object も必要になったら実装するで良いらしい
- ID リストに専用の型を付けたい
  - 今だと Aggregate root クラスに自動で Identifier が紐づくように実装してしまっている
- 参加者のステータスは参加者が直接変える？ or 管理者が変えるのか決めた方が良さそう
- プロパティは一旦全部 private にした方がいい？
- ドメインモデルのためにテーブル構造を変えるのは微妙...？
  - チーム - 参加者の結びつきを取得するためにテーブルを作るのか？
- prisma のコンソールを気軽に叩く仕組みはないのか？

### TODO

- [] DTO を作る
- [] ユースケースにトランザクションを貼る
- [] dist 配下に test ファイルを出力しないようにする
