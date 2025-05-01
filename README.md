# Spring Game

Spring Bootを使用したゲームアプリケーションのプロジェクトです。

## 必要条件

- Java 17
- Gradle 8.x
- Spring Boot 3.3.11

## セットアップ

1. リポジトリをクローン
```bash
git clone [リポジトリURL]
cd SpringGame
```

2. 依存関係のインストール
```bash
gradle build
```

3. アプリケーションの起動
```bash
gradle bootRun
```

## 開発環境のセットアップ

### ホットリロードの設定
- 開発中は`gradle build --continuous`を実行して、変更を自動的に検知できます
- アプリケーションの再起動は不要です（一部の変更を除く）

### エンドポイント
- `GET /hello`: Hello Worldを返すテストエンドポイント

## プロジェクト構造

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── game/
│   │           ├── controller/
│   │           └── SpringGameApplication.java
│   └── resources/
│       ├── static/
│       └── application.properties
└── test/
    └── java/
        └── com/
            └── game/
```

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。 