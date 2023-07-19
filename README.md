[Misskey](https://misskey-hub.net/) のフォークの [Firefish](https://joinfirefish.org/) のフォークです。

オリジナルの README は[こちら](./README.original.md)

# 変更点

## 主要な変更点

- 「Firefish について」のページに Misskey の主要な貢献者を表示
  - このソフトウェアは Misskey のフォークであるため

## 細かい変更点

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
