[Misskey](https://misskey-hub.net/) のフォークの [Firefish](https://joinfirefish.org/) のフォークです。

オリジナルの README は[こちら](./README.original.md)

# 変更点

## 今後の予定

[Issues](https://code.naskya.net/naskya/firefish/issues) にあります。

## 主要な変更点

- モバイル表示の下部のウィジェットボタンを再読み込みボタンに変更可能に
  - スマートフォンでウィジェットは使わないけど再読み込みはたくさんする人はいそう
- モバイル表示の下部のチャットボタンをアカウント切り替えボタンに変更可能に
  - これ無しで PWA で複数アカウントを使おうとすると腱鞘炎になる
- ローカルタイムラインの位置をグローバルタイムラインの直前に移動
  - ローカルタイムラインよりもソーシャルタイムラインのほうが使いやすいと考えたため
- 「Firefish について」のページに Misskey の主要な貢献者を表示
  - このソフトウェアは Misskey のフォークであるため

## 細かい変更点

- アンテナにフォロー中のユーザーのホーム投稿も表示する
  - フォロー中のユーザーの投稿は見たいから
- 猫のアカウントはアイコンを常に丸く表示する
  - そのほうがかわいいため
- 閲覧注意の投稿への返信で注釈の先頭に "re:" をつける設定を追加
  - 返信で閲覧注意は維持したいけどそのままの注釈を用いるのには違和感を覚えることがよくあるため
- NSFW メディアを隠す設定をブラウザごとの設定からブラウザごとかつアカウントごとの設定に変更
  - 「このアカウントでは NSFW の画像を常に表示したい」みたいな需要が私にあったため
- インスタンスティッカーをデフォルトで常に表示する
  - そのほうが楽しいと思ったから
- インスタンスティッカーのツールチップに出るソフトウェア名で FoundKey, PeerTube, GNU Social, WriteFreely などを正しく表示する
- 藍ちゃんウィジェットの復活
- インスタンスティッカーのツールチップにソフトウェアのバージョン番号も表示する
  - 気になるから
- いいねボタン（リアクションピッカーの左にある、⭐とか👍のリアクションをワンクリックで押せるやつ）で空のリアクション（Mastodon がふぁぼで送ってくるものと同じ）ではなく本当にその絵文字リアクション（⭐とか👍とか）を送るようにする
  - 最新の Misskey ではデフォルトリアクションが❤️になったため空のリアクションを送ると❤️として表示されてしまうが、❤️は ℒℴ𝓋ℯ... という気持ちを伝えるためのリアクションであってただの「いいね」とは異なるため、このボタンで❤️は送りたくないから
- 通知の表示を簡潔にする
  - 「がリアクションしました」とかリプライの上にある白い線とかが邪魔に思えたため
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
  - joinfirefish のクローラーは許可しています
- 投稿プレビューをデフォルトでオンにする設定を追加
- 猫耳の角を少し丸くする（Misskey から取り込み）
  - そのほうがかわいいため
- バージョン番号にコミットハッシュが含まれるように
  - 正確なバージョンが分かるとバグ修正に役立つため

# 使用方法

## インストール

[Firefish のインストールスクリプト](https://git.joinfirefish.org/firefish/ubuntu-bash-install)のプロンプトで尋ねられるリポジトリの URL にこのリポジトリの URL を使ってください。

```
Repository url where you want to install:
> https://code.naskya.net/naskya/firefish
```

## アップデート

`update.sh` を実行します。

```sh
$ ./update.sh
```

## Firefish（フォーク元）からの乗り換え

1. サーバーのバックアップを取る
1. サーバーを停止する
    ```sh
    $ sudo systemctl stop yourserver.example.com
    ```
1. Firefish がインストールされているディレクトリ (e.g., `/home/calckey/calckey`) の親ディレクトリ (e.g., `/home/calckey`) に移動する
    ```sh
    $ cd /home/calckey
    ```
1. Firefish がインストールされているディレクトリ (e.g., `./calckey`) の名前を変える
    ```sh
    $ mv calckey calckey.old
    ```
1. 元々 Firefish がインストールされていたディレクトリ (e.g., `./calckey`) と同じ名前でこのリポジトリをクローンする
    ```sh
    $ git clone https://code.naskya.net/naskya/firefish calckey
    ```
1. 必要なファイルを元のディレクトリからコピーする
    ```sh
    $ rm -rf calckey/files calckey/custom calckey/.config
    $ cp -r calckey.old/files calckey
    $ cp -r calckey.old/custom calckey
    $ cp -r calckey.old/.config calckey
    ```
1. ビルドする
    ```sh
    $ ./calckey/update.sh
    ```
1. サーバーを起動して動作を確認する
    ```sh
    $ sudo systemctl start yourserver.example.com
    ```
1. 元々 Firefish がインストールされていたディレクトリを削除する
    ```sh
    $ rm -rf calckey.old
    ```

## このフォークから Firefish（フォーク元）へ戻る

ToDo (#58)
