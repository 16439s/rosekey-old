[Misskey](https://misskey-hub.net/) のフォークの [Firefish](https://joinfirefish.org/) のフォークです。

オリジナルの README は[こちら](./README.original.md)

# 変更点

## 主要な変更点

- モバイル表示の下部のチャットボタンをアカウント切り替えボタンに変更可能に
  - これ無しで PWA で複数アカウントを使おうとすると腱鞘炎になる
- ローカルタイムラインの位置をグローバルタイムラインの直前に移動
  - ローカルタイムラインよりもソーシャルタイムラインのほうが使いやすいと考えたため
- 「Firefish について」のページに Misskey の主要な貢献者を表示
  - このソフトウェアは Misskey のフォークであるため

## 細かい変更点

- 支援者リストをファイルから読み込む
  - 外部のサーバーが落ちるとユーザーページが開けなくなることを防ぐため
- 閲覧注意の注釈と画像の代替テキストもアンテナで調べる対象にする
  - ~~「そぎぎ」でアンテナを作れる~~
- インデックス拒否に `noindex` に加えて `nofollow,noarchive,nocache,noimageindex` も指定
- インスタンスティッカーに表示するサーバーのアイコンとして favicon を優先する
  - favicon のほうがよくカスタマイズされているため
- 誤爆しやすい位置にあるフォローボタンを隠す設定を追加
  - フォローを誤爆すると悲しいため
- クローラーを拒否する [robots.txt](./custom/assets/robots.txt) の追加
- 投稿プレビューをデフォルトでオンにする設定を追加
- 猫耳の角を少し丸くする（Misskey から取り込み）
  - そのほうがかわいいため
- バージョン番号にコミットハッシュが含まれるように
  - 正確なバージョンが分かるとバグ修正に役立つため

# インストール方法

[Firefish のインストールスクリプト](https://gitlab.prometheus.systems/firefish/ubuntu-bash-install)中で尋ねられるリポジトリの URL にこのリポジトリの URL を使ってください。

```
Repository url where you want to install:
> https://code.naskya.net/naskya/firefish
```

# アップデート方法

`update.sh` を実行します。

```sh
$ ./update.sh
```
