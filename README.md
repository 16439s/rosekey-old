[Misskey](https://misskey-hub.net/) のフォークの [Firefish](https://joinfirefish.org/) のフォークです。

本家 Firefish のリポジトリは[こちら](https://git.joinfirefish.org/firefish/firefish)

`main` ブランチではこのフォークに適用された変更のコミット履歴のみが、`history` ブランチでは本家 Firefish のコミットを含む完全なコミット履歴が閲覧できます。

このフォークの機能について調べるには `main` ブランチを、コードの著者について調べるには `history` ブランチを参照してください。

# 変更点

## 今後の予定

[Issues](https://code.naskya.net/naskya/firefish/issues) にあります。

## 主要な変更点

- パフォーマンス向上のためアクティブユーザー以外のチャート生成を無効化
  - サードパーティー製クライアントが動かなくなるのを阻止するため API のエンドポイントは残していますが、叩いても `0` が並んだ配列しか返しません。
- モデレーターでない一般ユーザーにもカスタム絵文字の管理権を与えられるように
	- カスタム絵文字の管理が大変なサーバー管理者さんがたくさんいらっしゃったのでこの機能を追加するべきではないか他の開発者に訊いたところロール機能の実装を待つべきだと言われてしまったが、Firefish のロール機能は現状では仕様がまだ固まっておらず実装までに時間が掛かると考えられるため
	- 以下の権限を与えられます
		- 不許可: 絵文字の管理を許可しない
		- 追加: 新しい絵文字の追加のみを許可する
		- 追加と変更: 「追加」に加え、既存のカスタム絵文字の名前・カテゴリ・タグ・ライセンスの編集を許可する
		- 全て許可:「追加と変更」に加え、既存のカスタム絵文字の削除を許可する
- モバイル表示の下部のウィジェットボタンを再読み込みボタンに変更可能に
  - スマートフォンでウィジェットは使わないけど再読み込みはたくさんする人はいそう
- モバイル表示の下部のチャットボタンをアカウント切り替えボタンに変更可能に
  - これ無しで PWA で複数アカウントを使おうとすると腱鞘炎になる
- ローカルタイムラインの位置をグローバルタイムラインの直前に移動
  - ローカルタイムラインよりもソーシャルタイムラインのほうが使いやすいと考えたため

## 細かい変更点

- 検索の MFM で使用する検索エンジンを設定から変更可能に
  - 以下の選択肢から選べます
    - DuckDuckGo (duckduckgo.com)
    - SearXNG (searx.be)
    - Google Search (google.com)
    - Moon Search (search.naskya.net)
    - サーバーの投稿検索
- サーバー設定の初期値を変更
  - 新規登録を無効化
  - サーバーメトリクスの表示を有効化
  - ランダムなアイコンの生成を無効化
- 身バレ防止の設定を追加
  - 「おかえりなさい、◯◯さん」が出ないようにできるように
  - 自分のアイコンを非表示にできるように
  - 自分の名前とIDを非表示にできるように
    - 名前とIDの部分が空白になるので慣れるまで時間が掛かります
- ユーザーページのデフォルトのタブを「投稿と返信」に変更
- タイムラインにリプライを表示する設定をデフォルトで有効に
- 未読通知のタブをリアクションの通知を表示するタブに変更
  - 未読のタブ、使ってる人いる？
- MFM チートシートのボタンを投稿画面から左下のヘルプメニューに移動
	- これがあるために投稿画面下部のボタンが 2 段になってしまうことがあるため
- 「フォローされています」の表示を目立たせられるように
	- デフォルトの表示は目立たないため
- 最大 15 件の投稿を固定できるように
	- 5 件は少ないと思ったため
- 投稿ボタンを巨大にできるように
  - https://mstdn.poyo.me/@prime/110668364208741253 を真似しました
- アンテナにフォロー中のユーザーのホーム投稿も表示する
  - フォロー中のユーザーの投稿は見たいから
- 猫のアカウントはアイコンを常に丸く表示する
  - そのほうがかわいいため
- NSFW メディアを隠す設定をブラウザごとの設定からブラウザごとかつアカウントごとの設定に変更
  - 「このアカウントでは NSFW の画像を常に表示したい」みたいな需要が私にあったため
- インスタンスティッカーをデフォルトで常に表示する
  - そのほうが楽しいと思ったから
- 藍ちゃんウィジェットの復活
- インスタンスティッカーのツールチップにソフトウェアのバージョン番号も表示する
  - 気になるから
- いいねボタン（リアクションピッカーの左にある、⭐とか👍のリアクションをワンクリックで押せるやつ）で空のリアクション（Mastodon がふぁぼで送ってくるものと同じ）ではなく本当にその絵文字リアクション（⭐とか👍とか）を送るようにする
  - 最新の Misskey ではデフォルトリアクションが❤️になったため空のリアクションを送ると❤️として表示されてしまうが、❤️は ℒℴ𝓋ℯ... という気持ちを伝えるためのリアクションであってただの「いいね」とは異なるため、このボタンで❤️は送りたくないから
- 通知の表示を簡潔にする
  - 「がリアクションしました」とかリプライの上にある白い線とかが邪魔に思えたため
  - 一部の表示の色も Misskey の通知の色が個人的に好みだったので戻した
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
  - joinfirefish と FediDB のクローラーは許可しています
- 投稿プレビューをデフォルトでオンにする設定を追加
- バージョン番号にコミットハッシュが含まれるように
  - 正確なバージョンが分かるとバグ修正に役立つため

## このフォークから本家 Firefish に輸出された変更点

このフォークは本家に push する前のテスト環境としても使われるため、有用な機能はよく輸出されます（そしてニッチな機能だけが残る）

- 投稿中に表示されるインスタンスティッカーをクリックするとサーバー情報を開くように
- UI 用の言語とは別に、投稿翻訳に使用する言語を設定可能に
  - UI 用の言語は翻訳先の言語の第二候補として使われます（投稿の言語と投稿翻訳先に設定した言語が同じだった場合には UI 用の言語に翻訳されます）
- 投稿言語を自動検出して外国語の投稿に翻訳ボタンを表示する設定を追加
- 繁体中文への投稿翻訳を繁体字で表示する
  - DeepL 翻訳や LibreTranslate は簡体中文への翻訳しか提供していない……。
- 「Firefish について」のページに Misskey の主要な貢献者を表示
  - このソフトウェアは Misskey のフォークであるため
- 閲覧注意の投稿への返信で注釈の先頭に "re:" をつける設定を追加
  - 返信で閲覧注意は維持したいけどそのままの注釈を用いるのには違和感を覚えることがよくあるため
- 猫耳の角を少し丸くする（Misskey から取り込み）
  - そのほうがかわいいため
- インスタンスティッカーのツールチップに出るソフトウェア名で FoundKey, PeerTube, GNU social, WriteFreely などを正しく表示する

# 使用方法

## インストール

[Firefish のインストールスクリプト](https://git.joinfirefish.org/firefish/ubuntu-bash-install)のプロンプトで尋ねられるリポジトリの URL にこのリポジトリの URL を使ってください。

```
Repository url where you want to install:
> https://code.naskya.net/naskya/firefish
```

## アップデート

1. サーバーのバックアップを取る
1. サーバーを停止する
    ```sh
    $ sudo systemctl stop yourserver.example.com
    ```
1. `update.sh` を実行し、表示される指示に従う
    ```sh
    $ ./update.sh
    ```
1. サーバーを起動して動作を確認する
    ```sh
    $ sudo systemctl start yourserver.example.com
    ```

## [本家 Firefish](https://git.joinfirefish.org/firefish/firefish) からの乗り換え

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
1. 新しい Firefish のディレクトリに入ってビルドする
    ```sh
    $ cd calckey
    $ ./update.sh
    ```
1. サーバーを起動して動作を確認する
    ```sh
    $ sudo systemctl start yourserver.example.com
    ```
1. 元々 Firefish がインストールされていたディレクトリを削除する
    ```sh
    $ cd ..
    $ rm -rf calckey.old
    ```

## このフォークから[本家 Firefish](https://git.joinfirefish.org/firefish/firefish) へ戻る

1. サーバーのバックアップを取る
1. サーバーを停止する
    ```sh
    $ sudo systemctl stop yourserver.example.com
    ```
1. Firefish がインストールされているディレクトリ (e.g., `/home/calckey/calckey`) へ移動する
    ```sh
    $ cd /home/calckey/calckey
    ```
1. `packages/backend/ormconfig.js` をテキストエディターで開き、`migrations` に `migration-neko-revert/*.js` を追加する
    ```sh
    $ vim packages/backend/ormconfig.js
    ```
    ```diff
    - migrations: ["migration/*.js", "migration-neko/*.js"],
    + migrations: ["migration/*.js", "migration-neko/*.js", "migration-neko-revert/*.js"],
    ```
1. このフォークで加えられたデータベースへの変更を取り消す
    ```sh
    $ pnpm run migrate
    ```
1. Firefish がインストールされているディレクトリの親ディレクトリ (e.g., `/home/calckey`) に行く
    ```sh
    $ cd ..
    ```
1. Firefish がインストールされているディレクトリ (e.g., `./calckey`) の名前を変える
    ```sh
    $ mv calckey calckey.old
    ```
1. Firefish がインストールされているディレクトリと同じ名前で本家版の Firefish を clone する
    ```sh
    $ git clone https://git.joinfirefish.org/firefish/firefish.git calckey
    ```
1. 必要なファイルをコピーする
    ```sh
    $ rm -rf calckey/files calckey/custom calckey/.config
    $ cp -r calckey.old/files calckey
    $ cp -r calckey.old/custom calckey
    $ cp -r calckey.old/.config calckey
    ```
1. 新しい Firefish のディレクトリ (e.g., `./calckey`) に入り、`develop` ブランチに行く（既にそうなっているはず）
    ```sh
    $ cd calckey
    $ git checkout develop
    Already on 'develop'
    Your branch is up to date with 'origin/develop'.
    ```
1. Firefish をビルドする
    ```sh
    $ corepack prepare pnpm@latest --activate
    $ pnpm i
    $ NODE_ENV=production pnpm run build
    $ pnpm run migrate
    ```
1. サーバーを起動して動作を確認する
    ```sh
    $ sudo systemctl start yourserver.example.com
    ```
1. 元々 Firefish がインストールされていたディレクトリを削除する
    ```sh
    $ cd ..
    $ rm -rf calckey.old
    ```

### 注意

この手順を踏むとあなたの Firefish サーバーは `develop` 版になります。他のバージョンを動かしたい場合も、**次のアップデートがリリースされるまでは `develop` 版を動かしてください**。

例えば `beta` 版を動かしたい場合、次に `beta` 版がリリースされたらそちらに移れます。

```sh
$ git checkout beta
$ git pull --ff
$ corepack prepare pnpm@latest --activate
$ pnpm i
$ NODE_ENV=production pnpm run build
$ pnpm run migrate
```
