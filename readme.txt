# Readme

コミット作成ツールのelectron版です、履歴やお気に入りの機能が追加されています
これはソースなのでビルドして使用してください

## build方法

1. `npm install`
1. `npm run makePackage`

## タスク

- dev
  開発用で、トランスパイルしてからelectronで開きます
- makePackage
  トランスパイルしてからelectronのパッケージを作成します

## 構造

- src
  htmlやcss,トランスパイル後のjsがあり、electronがビルドするディレクトリ
- ts
  typescriptの処理、詳細は後述
- favorite.json
  お気に入りにしたコミットメッセージ情報がリストで保存される
- history.json
  コミットメッセージを作成するとその情報と時間が保存される

## tsディレクトリの内容

- addEvents.ts
  dom要素にイベントを追加する処理と、読み込み後に実行する処理がある、htmlはこれだけ利用すれば良い
- afterEvent.ts
  後処理が記載されている、コミットメッセージ作成屋、初期化、インポート、エクスポート、コピー
- common.ts
  汎用的に利用できる処理をまとめたもの、主にDOM操作系かも
- Data.ts
  コミットメッセージの入力した情報のクラスとクラスとDOMのやり取りの処理
- favorite.ts
  お気に入り機能
- history.ts
  履歴機能
- main.ts
  electronのメインプロセス
- preload.cts
  レンダラプロセスからメインプロセスを実行するための処理、これはcjs形式ではないといけない
- typelist.ts
  repositoryとtype関係の処理をまとめたもの
