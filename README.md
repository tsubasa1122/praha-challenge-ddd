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

### Migration

※ ORM に[Prisma](https://www.prisma.io/) を用いているので、マイグレーション実行後には prisma client(Query builder の役割を持つ)側にもカラムの変更を反映させる必要があります。

```bash
$ yarn run migrate:dev (本番環境の場合はyarn migrate:prd)
$ yarn run model-generate
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
