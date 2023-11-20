[Misskey](https://misskey-hub.net/) のフォークの [Firefish](https://joinfirefish.org/) のフォークです。

本家 Firefish のリポジトリは[こちら](https://git.joinfirefish.org/firefish/firefish)

`main` ブランチではこのフォークに適用された変更のコミット履歴のみが、`history` ブランチでは本家 Firefish のコミットを含む完全なコミット履歴が閲覧できます。

このフォークの機能について調べるには `main` ブランチを、コードの著者について調べるには `history` ブランチを参照してください。

# 変更点

## 主要な変更点

- 検索フィルターを強化中
  - `from: me` を検索ワードの末尾につけると自分の投稿のみを検索できるように変更
    - 検索クエリの例: `予定 from:me`
    - ホーム・フォロワー限定・ダイレクト・秘密の投稿を含む自分の全ての投稿から検索します
- 全文検索のエンジンを [PGroonga](https://pgroonga.github.io/) に変更
  - PGroonga のインストールが必要になります！詳しくは[この投稿](https://post.naskya.net/notes/9ldi29amfanomef5)をご覧ください
  - Meilisearch, Elasticsearch, Sonic は使えません
- 「秘密」という公開範囲を追加
  - 宛先無しのダイレクト投稿を言い換えているだけです
  - 既存の投稿を削除せずに後から秘密にすることもできます
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

- サーバーの管理者が左下のヘルプメニューに利用規約以外のページも固定できるように
- 依存ライブラリのバージョンをアップデート
  - AiScript のバージョンも上がりました！
- 絵文字ピッカーに表示されるカスタム絵文字の検索結果の件数を最大 100 件に変更（Misskey の変更を取り込み）
- HTML のコードに入るコメントアートを削除
  - 全ページにこんなの入れなくても……
- 本家 Firefish へのまだマージされていないマージリクエストを独断でマージ
  - [バグ修正](https://git.joinfirefish.org/firefish/firefish/-/merge_requests/10631)
  - [ドライブのファイルに「このファイルが添付された投稿の一覧」のメニューを追加](https://git.joinfirefish.org/firefish/firefish/-/merge_requests/10634)
- デフォルトではバイブレーションを無効に
- ログインしていなければ投稿検索ができないように
  - 攻撃対策のため
  - もしこのせいでサードパーティークライアントに不具合が出る場合には変更するかもしれません
- 投稿と投稿の間を空けて表示する設定をデフォルトでは無効に
- Enter キーのみでチャットを送信する設定をデフォルトでは無効に
- 管理者アカウントも引っ越しできるように
- デフォルトのアイコンの太さを細めに変更
- スタイルを選択する画面のサンプルのアイコンを星に変更
- リアクションの履歴を公開する設定をデフォルトで有効に
  - 私がみんなのリアクションを見たいと思っているため
  - もちろん設定から無効にできます
- 標準のフォントを Atkinson Hyperlegible にする変更を取り消し
  - フォントを変更したい場合は[このカスタム CSS](https://gitlab.com/LunarEclipse363/lunar-misskey-tweaks#setting-a-different-font) を使ってください
- 簡体中文の翻訳が存在しない項目では繁体中文の翻訳を用いるように（本家では逆）
  - [サポミク](https://fedi.sup39.dev/@sup39)さんが独自機能に使われているラベルの繁体中文訳を提供してくださったため
- オンラインステータスが非公開のアカウントにはステータスを表す丸印を表示しないように
  - 灰色の丸が表示されていてもそんなに嬉しくないため
- デフォルトで検索エンジンからのクロールを拒否するように変更
- 検索の MFM で使用する検索エンジンを設定から変更可能に
  - 以下の選択肢から選べます
    - DuckDuckGo (duckduckgo.com)
    - SearXNG (searx.be)
    - Google Search (google.com)
    - Moon Search (search.naskya.net)
    - サーバーの投稿検索
- サーバー設定の初期値を変更
  - 新規登録を無効化
    - 新規登録を受け付けたくないのに無効化する前にアカウントを登録されてしまうことを防ぐため
  - プライベートモード（連合しないモード）を有効化
    - サーバーの準備が整っていないうちにリモートサーバーに認識されてしまうことを防ぐため
  - サーバーメトリクスの表示を有効化
    - 有効化しているサーバーが多いため
  - ランダムなアイコンの生成を無効化
    - ランダムなアイコンはそんなにかわいくないため
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
  - [mstdn.maud.io / mstdn.poyo.me の機能](https://mstdn.poyo.me/@prime/110668364208741253) を真似しました
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
- デフォルトの robots.txt の設定を変更し、クローラーを拒否するように
  - joinfirefish と FediDB のクローラーは許可しています
- 投稿プレビューをデフォルトでオンにする設定を追加
- バージョン番号に最新のコミットの日付とコミットハッシュの頭文字が含まれるように
  - 正確なバージョンが分かるとバグ修正に役立つため

## 検証中の変更点

うまく動いていそうだったら本家に push されます

- Docker ユーザーも PWA のアイコンを変更できるように
  - 以下の画像ファイルを追加して Docker コンテナを再起動し、ブラウザのキャッシュを削除して PWA をインストールしてみてください
    - `custom/assets/favicon.png`
      - サーバーのページの favicon（一辺 32 px から 192 px くらいの正方形の画像）
    - `custom/assets/favicon.ico`
      - [ICO 形式](https://ja.wikipedia.org/wiki/ICO_(%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%83%E3%83%88))の favicon（`ffmpeg -i favicon.png favicon.ico` などで変換可能）
    - `custom/assets/apple-touch-icon.png`
      - 一辺 256 px 程度の正方形の画像
    - `custom/assets/icons/192.png`
      - 一辺 192 px の正方形の画像
    - `custom/assets/icons/512.png`
      - 一辺 512 px の正方形の画像
    - `custom/assets/icons/maskable.png`
      - 一辺 512 px 程度の正方形の画像（端が切り取られて使われる可能性があるため余白があるといい）
    - `custom/assets/icons/monochrome.png`
      - 一辺 512 px 程度の正方形の画像（白黒であるといい）

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

## Docker ユーザー

### インストール

ToDo ([#a3WPw](https://code.naskya.net/decks/4wJQ3/tickets/a3WPw))

- インストールスクリプトの提供を考えています
- 慣れている方向けの説明: [`docker.io/naskya/firefish`](https://hub.docker.com/r/naskya/firefish) を用いて Firefish をインストールし、以下のコマンドを用いて PGroonga の拡張機能を有効にしてください。

    ```bash
    docker-compose exec db psql --command="CREATE EXTENSION pgroonga;" --dbname=firefish
    ```

### アップデート

重要なお知らせがある場合にはアップデートスクリプトを通じてお伝えするので、必ず `update.sh` を用いてアップデートしてください。

1. サーバーのバックアップを取る
2. `update.sh` を実行し、表示される指示に従う

    ```bash
    ./update.sh
    ```

3. サーバーを起動して動作を確認する

    ```bash
    docker-compose up --detach
    ```

## 非 Docker ユーザー

### インストール

ToDo ([#a3WPw](https://code.naskya.net/decks/4wJQ3/tickets/a3WPw))

- インストールスクリプトかインストール方法の説明を提供することを考えています
- 遠回りな方法ですが、公式のインストールスクリプトを使いたい場合にはそれを用いて本家の Firefish をインストールしてから下記の手順でこのフォークに移行できます。
- 慣れている方への説明: PostgreSQL を用いた通常の Firefish のインストールに加えて PGroonga のインストールおよびデータベースの拡張機能の有効化を行います。

### アップデート

重要なお知らせがある場合にはアップデートスクリプトを通じてお伝えするので、必ず `update.sh` を用いてアップデートしてください。

1. サーバーのバックアップを取る
2. サーバーを停止する

    ```bash
    sudo systemctl stop yourserver.example.com
    ```

3. `update.sh` を実行し、表示される指示に従う

    ```bash
    ./update.sh
    ```

4. サーバーを起動して動作を確認する

    ```bash
    sudo systemctl start yourserver.example.com
    ```

#### 正常にアップデートできなかった場合

```bash
./update.sh |& tee /tmp/fflog
```

を実行して（ログが `/tmp/fflog` に保存されます）、OS などの環境の情報とともにログの内容を[私](https://post.naskya.net/@dev)まで送ってください。

ログは長いのでおそらく一投稿に収まりません。そのため、ログを送る際には投稿にファイルを直接添付するか、[Pastebin](https://pastebin.com/) などのサービスを使ってください。

ログを送ったら `/tmp/fflog` は削除してよいです。

```bash
rm /tmp/fflog
```

### [本家 Firefish](https://git.joinfirefish.org/firefish/firefish) からの乗り換え

1. サーバーのバックアップを取る
2. サーバーを停止する

    ```bash
    sudo systemctl stop yourserver.example.com
    ```

3. Firefish がインストールされているディレクトリ (e.g., `/home/calckey/calckey`) の親ディレクトリ (e.g., `/home/calckey`) に移動する

    ```bash
    cd /home/calckey
    ```

4. Firefish がインストールされているディレクトリ (e.g., `./calckey`) の名前を変える

    ```bash
    mv calckey calckey.old
    ```

5. 元々 Firefish がインストールされていたディレクトリ (e.g., `./calckey`) と同じ名前でこのリポジトリをクローンする

    ```bash
    git clone https://code.naskya.net/naskya/firefish calckey
    ```

6. 必要なファイルを元のディレクトリからコピーする

    ```bash
    rm -rf calckey/files calckey/custom calckey/.config
    cp -r calckey.old/files calckey
    cp -r calckey.old/custom calckey
    cp -r calckey.old/.config calckey
    ```

7. 全文検索エンジン（Meilisearch, Sonic, Elasticsearch のいずれか）を使用している場合には、`.config/default.yml` からその設定を削除またはコメントアウトする

    先頭に `#` をつけると設定をコメントアウトできます。

    ```yaml
    #sonic:
    #  host: localhost
    #  port: 1491
    #  auth: SecretPassword
    #  collection: notes
    #  bucket: default
    ```

    全文検索エンジンは停止またはアンインストールしてしまってよいです。本家の Firefish に戻るつもりがあるなら停止を、そうでなければアンインストールをおすすめします。

    停止コマンドの例

    ```bash
    sudo systemctl disable --now sonic
    ```

8. PostgreSQL のバージョンを確認する

    ```bash
    psql --version
    ```

9. PGroonga をインストールする

    コマンドの例（詳しくは[この投稿](https://post.naskya.net/notes/9ldi29amfanomef5)を参考にしてください）

    ```bash
    sudo apt install -y software-properties-common
    sudo add-apt-repository -y universe
    sudo add-apt-repository -y ppa:groonga/ppa
    sudo apt install -y wget lsb-release
    wget https://packages.groonga.org/ubuntu/groonga-apt-source-latest-$(lsb_release --codename --short).deb
    sudo apt install -y -V ./groonga-apt-source-latest-$(lsb_release --codename --short).deb
    echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release --codename --short)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
    sudo apt update
    sudo apt install -y -V postgresql-14-pgdg-pgroonga
    ```

10. `.config/default.yml` に書かれているデータベースの名前を確認する（以下の例では `mk1`）

    ```yaml
    db:
      host: localhost
      port: 5432
      db: mk1  # <---
    ```

11. 以下のコマンドを実行して PGroonga の拡張機能を有効にする（`mk1` の部分は自分のデータベース名に変えて実行）

    ```bash
    sudo -iu postgres psql --command="CREATE EXTENSION pgroonga;" --dbname=mk1
    ```

12. 新しい Firefish のディレクトリに入ってビルドする

    ```bash
    cd calckey
    ./update.sh --skip-all-confirmations
    ```

    **注意**: `--skip-all-confirmations` というオプションは普段のアップデートでは使わないでください。重要なお知らせがある場合でも表示がスキップされてしまいます。

13. サーバーを起動して動作を確認する

    ```bash
    sudo systemctl start yourserver.example.com
    ```

14. 元々 Firefish がインストールされていたディレクトリを削除する

    ```bash
    cd ..
    rm -rf calckey.old
    ```

### このフォークから[本家 Firefish](https://git.joinfirefish.org/firefish/firefish) へ戻る

1. サーバーのバックアップを取る
2. サーバーを停止する

    ```bash
    sudo systemctl stop yourserver.example.com
    ```

3. Firefish がインストールされているディレクトリ (e.g., `/home/calckey/calckey`) へ移動する

    ```bash
    cd /home/calckey/calckey
    ```
4. 最新版にアップデートする

    ```bash
    ./update.sh
    ```

5. `.config/default.yml` に書かれているデータベースの名前を確認する（以下の例では `mk1`）

    ```yaml
    db:
      host: localhost
      port: 5432
      db: mk1  # <---
    ```

6. このフォークで加えられたデータベースへの変更を取り消す（`mk1` の部分は自分のデータベース名に変更する）

    ```bash
    sudo -iu postgres psql --file=neko/revert.sql --dbname=mk1
    ```

7. PGroonga をアンインストールする

    コマンドの例

    ```bash
    sudo apt purge --remove postgresql-14-pgdg-pgroonga
    sudo add-apt-repository --remove ppa:groonga/ppa
    sudo apt-key del ACCC4CF8
    sudo apt update
    ```

8. Firefish がインストールされているディレクトリの親ディレクトリ (e.g., `/home/calckey`) に行く

    ```bash
    cd ..
    ```

9. Firefish がインストールされているディレクトリ (e.g., `./calckey`) の名前を変える

    ```bash
    mv calckey calckey.old
    ```

10. Firefish がインストールされているディレクトリと同じ名前で本家版の Firefish を clone する

    ```bash
    git clone https://git.joinfirefish.org/firefish/firefish.git calckey
    ```

11. 必要なファイルをコピーする

    ```bash
    rm -rf calckey/files calckey/custom calckey/.config
    cp -r calckey.old/files calckey
    cp -r calckey.old/custom calckey
    cp -r calckey.old/.config calckey
    ```

12. 新しい Firefish のディレクトリ (e.g., `./calckey`) に入り、`develop` ブランチに行く（実際には既に `develop` にいるはず）

    ```bash
    cd calckey
    git checkout develop
    ```

13. Firefish をビルドする

    ```bash
    corepack prepare pnpm@latest --activate
    pnpm i
    NODE_ENV=production pnpm run build
    pnpm run migrate
    ```

14. サーバーを起動して動作を確認する

    ```bash
    sudo systemctl start yourserver.example.com
    ```

15. 元々 Firefish がインストールされていたディレクトリを削除する

    ```bash
    cd ..
    rm -rf calckey.old
    ```

#### 注意

この手順を踏むとあなたの Firefish サーバーは `develop` 版になります。他のバージョンを動かしたい場合も、**次のアップデートがリリースされるまでは `develop` 版を動かしてください**。

例えば `beta` 版を動かしたい場合、次に `beta` 版がリリースされたらそちらに移れます。

```bash
git checkout beta
git pull --ff
corepack prepare pnpm@latest --activate
pnpm i
NODE_ENV=production pnpm run build
pnpm run migrate
```
