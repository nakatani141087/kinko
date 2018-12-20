# Raspberry Pi
-----------
## Raspberry Piのインストール
-----------
## 標準の設定
日本語入力を出来るようにする:
```sh
$ sudo apt-get install jfbterm uim uim-anthy
```
# 金庫管理システムについて
-----------
## 使用しているサーバー
* [Apache2](https://httpd.apache.org/) - HTTPサーバー
* [MariaDB](https://mariadb.org/) - MySQLの派生として開発されているデータベースサーバー
-----------
## ファイル構成 
/home/
└ cic-shimane/
　└ public_html/
　  ├ cgi-bin/   ・・・pythonのファイルを格納
　  │　└ img/
　  ├ html/      ・・・Web画面
　  │　└ img/
　  └ test/      ・・・CGIのテスト用ファイル
-----------
## 使用している言語
### Python
python (バージョン)
: Python (2.7.13)

標準ライブラリで使用したもの
 - cgi:ゲートウェイインターフェースの規格.Webサーバーで使用
 - time:時刻データのアクセスと変換.時間の計測で使用
 - datetime:日付の取得で使用
GPIOで使ったライブラリのバージョン
 - RPi.GPIO (0.6.5)
install:
```sh
$ sudo apt-get install python-rpi.gpio
```

How to:

データベースの操作で使ったライブラリのバージョン
  - PyMySQL (0.9.2)



### HTML
ファイル名

* home.html - ホーム画面
* about.html - システム説明画面
* contact.html - メールフォーム画面
* controll.html - 金庫の解錠と施錠画面
* login.html - ログイン画面
* signUp.html - ユーザー登録画面

-----------