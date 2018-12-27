# 金庫管理システムについて

# Raspberry Pi
OS:Raspbian
## Raspberry Piのインストール

## 標準の設定

### CLI Debian系での基本操作
```sh:ターミナル
$ cd ./移動したいディレクトリ   #Change Directoryの略,ディレクトリを移動するのに使用
$ ls   #コマンドを打った場所のファイルやディレクトリが分かる
$ cp ./コピー元 ./コピー先  #ファイルをコピーする.オプションを追加でディレクトリごと可(以下同様)
$ mv ./元のファイル位置 ./ファイルの移動先   #ファイルを移動させる. ディレクトリごと可
$ rm ./消したいファイル #ファイルを消す,ディレクトリごと可であるが,ディレクトリが中にある場合は別
$ man コマンド   #コマンドのマニュアルを表示,qキーで終わる.なおほとんど英語のドキュメント
$ sudo   #スーパーユーザーの権限で実行したいときに使用
$ sudo apt-get install パッケージ   #パッケージのインストール／更新(大体sudo必須)
$ sudo apt-get update   #パッケージリストを更新(大体sudo必須)
$ sudo apt-get upgrade   #インストールされてるパッケージの更新(大体sudo必須)
$ sudo apt-get remove パッケージ　  #パッケージを削除する(大体sudo必須)
$ sudo apt-cache search 検索文字列　#検索文字列からパッケージを探す(大体sudo必須)
$ reboot   #再起動
$ shutdown now   #シャットダウン
$ sudo chmod 3桁の8進数 ファイルorディレクトリ #ファイルやディレクトリの権限を変更する(大体sudo必須)
```

../を打つことで一つ上のディレクトリに移動できる.ルートから移動したい場合は/から始める.

### ユーザーについて行ったこと

#### ユーザーの名前を変更
まず,ユーザーを新しく登録し,そのユーザーにpiの権限を与える.
```sh:ターミナル
$ sudo useradd -M username
$ sudo gpasswd -a username
```


### 日本語入力を出来るようにする:
```sh:ターミナル
$ sudo apt-get install jfbterm uim uim-anthy
```

## 共同開発
[github](https://github.com/)を用いてチームとのファイル共有を行った.
### github install
```sh:ターミナル
$ sudo apt-get install git-core
```

## 使用しているサーバー
* [Apache2](https://httpd.apache.org/) - HTTPサーバー
* [MariaDB](https://mariadb.org/) - MySQLの派生として開発されているデータベースサーバー

## ファイル構成
```sh:ディレクトリの位置
/home/
└ cic-shimane/
  └ public_html/
  ├ cgi-bin/   ・・・pythonのファイルを格納
  │　└ img/
  ├ html/      ・・・Web画面
  │　└ img/
  └ test/      ・・・CGIのテスト用ファイル
```
## 使用している言語

### Python
python (バージョン)
: Python (2.7.13)

#### Python インストール
install:
```sh:ターミナル
$ sudo apt-get install python
```

pythonのインストールではpipを使う場合がある.pipがインストールされているかどうかの確認とpipでのインストール方法を記載しておく.

pipの確認:
```sh:ターミナル
$ python -m pip -V
```

今回,pipがインストールしていなかったのでインストールする.

pipがない場合:
```sh:ターミナル
$ sudo apt-get install python-pip
```

pipでインストールされたモジュールを確認する方法を記載する.また,pipを使って試しにnumpy(学術演算などに利用)をインストールしてみる.

pip モジュール確認:
```sh:ターミナル
$ python -m pip freeze
```

numpy install:
```sh:ターミナル
$ python -m pip install numpy
```

他にもやり方はあるので検索して確かめるのも良い.


#### 標準ライブラリで使用したもの
 - cgi:ゲートウェイインターフェースの規格.Webサーバーで使用
 - time:時刻データのアクセスと変換.時間の計測で使用
 - datetime:日付の取得で使用
#### GPIOで使ったライブラリのバージョン
 - RPi.GPIO (0.6.5)

開発に必要そうなパッケージをinstall:
```sh:ターミナル
$ sudo apt-get install python-dev
$ sudo apt-get install python-setuptools
$ sudo apt-get install python-rpi.gpio
```

サーボモーターをGPIOから操作するPythonの書き方
: Pythonでサーボモーター(TSU-3)を右に回すソースコード

```python:~/public_html/cgi-bin/serco_lock.py
#!/usr/bin/python       #PythonをCGIで使うときに必要
import RPi.GPIO as GPIO #GPIOを操作するライブラリを入れる
if __name__ == '__main__':
    GPIO.setmode(GPIO.BCM)  #GPIOの操作方法を設定
    gp_out = 18                          #GPIO18を使用
    GPIO.setup(gp_out, GPIO.OUT)#18ピンに出力
    servo = GPIO.PWM(gp_out, 360)#18ピンに360Hzで信号を送るようにする
    servo.start(90)       #Duty Cycleを決める関数で40以下は左,60以上は右に回る.0-100の値を設定する.
    #servo.ChangeDutyCycle(10) #Duty Cycleを引数の値に変更
    GPIO.cleanup() #GPIOの信号処理を終了
```

GPIOピンについて
: 以下はサーボモータとGPIOが対応しているピンを示す

| サーボモーターの線 | GPIO ピン | 内容 |
| ------ | ------ | ------ |
| 赤線 | 1ピン | 電圧 |
| 黒線 | 6ピン | Ground  |
| 白線 | 12ピン| PWMの信号を送る  |

参考URL
1. [Raspberry Piでサーボモータ（SG90）を制御する](http://bufferoverruns.blogspot.com/2016/08/raspberry-pisg-90.html)
2. [Raspberry PiのGPIOのピンについて](http://lchikaamazon.hatenablog.com/entry/2013/11/18/171637)

#### データベースの操作で使ったライブラリのバージョン
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
## サーバーを立てる

### HTTPサーバー

#### Apacheのインストール
HTTPサーバーを立てるのにApache2を使用
install:
```sh:ターミナル
$ sudo apt-get install apache2
$ sudo service apache2 start
```
動作確認
テスト用のhtmlを以下のように作成する
test.html:
```html：/var/www/html/test.html
<html>
  <head>
    <title>test</title>
  </head>
  <body>This page is test page.</body>
</html>
```
wifiのipアドレスを確認:
```sh
$ ifconfig
```
![ifconfig結果](./img/ifconfig.png)

wlan0のinetアドレスの横にあるのが今回使うipアドレス
同じwifiに繋げている別PCのブラウザからhttp://192.168.11.75/test.htmlと入力し,以下の画面が出れば成功（192.168.11.75の部分は各自のipアドレス)

#### 作業するディレクトリを変更する

デフォルトでは,コンテンツの読み込みディレクトリが/var/www/になっており,ここで作業を行うと毎回sudoをしないといけなくなる.そのため~/public_html/に対してできるようにしておく.

UserDirを有効化する:
```sh:ターミナル
$ sudo a2enmod userdir
$ mkdir ~/public_html
$ sudo cp /var/www/html/test.html ~/public_html
$ sudo service apache2 restart
```

これで,別PCのブラウザからhttp://192.168.11.75/~pi/test.html でアクセスできるようになる.(192.168.11.75の部分は各自の環境に応じて変更)

#### CGIの設定
今回はPythonを使用しているのでそれ用に設定する.
ブラウザでPythonスクリプトを実行するためにCGIの設定を行う

まずは,CGIを有効にする:
```sh:ターミナル
$ sudo ln -s /etc/apache2/mods-available/cgi.load /etc/apache2/mods-enabled/cgi.load
```

apache2の設定ファイルを変更
```sh:/etc/apache2/sites-available/000-default.ifconfig
・
・省略
・
// 以下のコメントを外す
Include conf-available/serve-cgi-bin.conf
・
・省略
・
```

拡張子.pyのCGIが動作できるように設定する
```sh:/etc/apache2/mods-available/mine.conf
（変更前）
#AddHandler cgi-script .cgi
（変更後)
AddHandler cgi-script .cgi .py
```
Pythonなどのスクリプト言語では#がコメントアウト,CやJAVAなどのコンパイル言語では//や　/*--コメント--*/　となる

CGIを動かすディレクトリの設定
```sh:/etc/apache2/conf-available/serve-cgi-bin.conf

(変更前)
               ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
               <Directory "/usr/lib/cgi-bin">
(変更後)
               ScriptAlias /cgi-bin/ /home/pi/public_html/cgi-bin
               <Directory "/home/pi/public_html/cgi-bin">
```
再起動
```sh:ターミナル
$ sudo service apache2 restart
```
Pythonスクリプトの準備
```python:~/public_html/cgi-bin/test.py

#!/usr/bin/python

print "Content-type: text/html"
print
print "<html>"
print "<head>"
print "<title>test</title>"
print "</head>"
print "<body>This page is test page.</body>"
print "</html>"
```

以上の設定を行い,
別PCのブラウザから,http://192.168.11.75/~pi/cgi-bin/test.py にアクセスすると,"This page is test page. "が表示される.

#### 参考URL
1. [Raspberry PiとPythonでHttpサーバーを立てる](https://qiita.com/aryoa/items/2c28b466e911a3dd101d)
LEDの点灯も行っているので試してみると良い
2. [apache2の設定ファイルなどのありか](http://www.linux.net-japan.info/install08.html)
3. [Debian系でapache2のmod_rewriteなどを有効にする方法](https://qiita.com/u-akihiro/items/c7a5bb38c34858d00c2a)

### データベースサーバー

#### MariaDBのインストール
データベースサーバーを立てるのにMariaDBを使用,環境構築するために使用するライブラリをインストールする.


MariaDB install:
```sh:ターミナル
$　sudo apt-get install mysql-server
$
```
本当はMYsqlがインストールされると思っていた

##### 失敗談
次のモジュールをインストールしたらなぜかapache2が反応しなくなったライブラリ
```sh:ターミナル
$ pip install mysql-connector-python
```

#### MariaDBの文字コードを変換
現在の文字コードを確認する:
```sh:ターミナル
$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 44
Server version: 5.5.44-0+deb8u1 (Raspbian)

Copyright (c) 2000, 2015, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> show variables like 'char%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8                       |
| character_set_connection | utf8                       |
| character_set_database   | latin1                     |
| character_set_filesystem | binary                     |
| character_set_results    | utf8                       |
| character_set_server     | latin1                     |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
8 rows in set (0.00 sec)

MariaDB [(none)]> status;
--------------
mysql  Ver 15.1 Distrib 10.0.11-MariaDB, for Linux (x86_64) using readline 5.1

Connection id:          3
Current database:
Current user:           root@localhost
SSL:                    Not in use
Current pager:          stdout
Using outfile:          ''
Using delimiter:        ;
Server:                 MariaDB
Server version:         10.0.11-MariaDB MariaDB Server
Protocol version:       10
Connection:             Localhost via UNIX socket
Server characterset:    latin1
Db     characterset:    latin1
Client characterset:    utf8
Conn.  characterset:    utf8
UNIX socket:            /var/lib/mysql/mysql.sock
Uptime:                 2 min 18 sec

Threads: 1  Questions: 6  Slow queries: 0  Opens: 0  Flush tables: 1  Open tables: 63  Queries per second avg: 0.043
--------------

```

RaspberryPiではutf8よりもutf8mb4の方が良いらしい.変更するには'character-set-server = utf8mb4'の行を'/etc/my.cnf.d/server.cnf'に追加する

文字コードをutf8mb4にする:
```sh:/etc/my.cnf.d/server.cnf
// 省略...
[mysqld]
character-set-server = utf8mb4
#collation-server     = utf8_general_ci
#skip-character-set-client-handshake
// ...省略
```


#### MariaDBの操作方法


MySQLクライアントの実行:
```sh:ターミナル
$　sudo mysql -u root -p
```
データベースの確認:
```sh:MariaDBの操作
　MariaDB [(none)]> SHOW DATABASES;
```

下記はデータベースを文字コードがutf8mb4のmyhome_dbという名前で作成する
データベースの作成:
```sh:MariaDBの操作
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
3 rows in set (0.00 sec)

mysql> CREATE DATABASE myhome_db CHARACTER SET utf8mb4;
Query OK, 1 row affected (0.00 sec)

mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| myhome_db          |
| mysql              |
| performance_schema |
+--------------------+
4 rows in set (0.00 sec)

mysql>
```

実際にデータを管理するときはデータベースを選び,その中のテーブルで管理する.
データベースを選択:
```sh:MariaDBの操作
　MariaDB [(none)]> USE myhome_db
 Reading table information for completion of table and column names
 You can turn off this feature to get a quicker startup with -A

 Database changed
 MariaDB [myhome_db]>
```

以下のテーブルを作成する例を下記に表していく.'weather_tb'という名称で以下の項目を用意する.
* date DATE NOT NULL
* dow CHAR(3) NOT NULL
* time TIME NOT NULL
* weather VARCHAR(20) NOT NULL

テーブルの作成:
```sh:MariaDBの操作

MariaDB [myhome_db]> CREATE TABLE weather_tb(
    -> date DATE NOT NULL,
    -> dow CHAR(3) NOT NULL,
    -> time TIME NOT NULL,
    -> weather VARCHAR(20) NOT NULL,
    -> PRIMARY KEY(date,time));
Query OK, 0 rows affected (0.06 sec)

MariaDB [myhome_db]>
```
補足で,key CHAR(3)やlock CHAR(3)などのすでに登録されている項目を作成できない(名前は重複しないように付ける).

テーブルの確認:
```sh:MariaDBの操作
MariaDB [myhome_db]> SHOW TABLES;
+---------------------+
| Tables_in_myhome_db |
+---------------------+
| weather_tb          |
+---------------------+
1 row in set (0.00 sec)
MariaDB [myhome_db]>
```



テーブルにレコードを追加:
```sh:MariaDBの操作
　MariaDB [myhome_db]> INSERT INTO weather_tb values('2016-06-18','Sat','06:30:00','晴');
  Query OK, 1 row affected (0.01 sec)
  MariaDB [myhome_db]>
```

テーブルのレコードを確認:
```sh:MariaDBの操作
  MariaDB [myhome_db]> SELECT * FROM weather_tb;
+------------+-----+----------+---------+
| date       | dow | time     | weather |
+------------+-----+----------+---------+
| 2016-06-18 | Sat | 06:30:00 | 晴      |
+------------+-----+----------+---------+
1 row in set (0.00 sec)
  MariaDB [myhome_db]>
```

テーブルのレコードを更新:
```sh:MariaDBの操作
　MariaDB [myhome_db]> UPDATE weather_tb SET weather='雨' WHERE date='2016-06-18';
  Query OK, 1 row affected (0.03 sec)
  Rows matched: 1  Changed: 1  Warnings: 0
   MariaDB [myhome_db]> SELECT * FROM weather_tb;
  +------------+-----+----------+---------+
  | date       | dow | time     | weather |
  +------------+-----+----------+---------+
  | 2016-06-18 | Sat | 06:30:00 | 雨      |
  +------------+-----+----------+---------+
  1 row in set (0.00 sec)
　MariaDB [myhome_db]>
```

テーブルのカラムを削除:
```sh:MariaDBの操作
　MariaDB [myhome_db]> DELETE FROM weather_tb WHERE date='2016-06-18';
  Query OK, 1 row affected (0.01 sec)
  MariaDB [myhome_db]> SELECT * FROM weather_tb;

  Empty set (0.00 sec)
　MariaDB [myhome_db]>
```

#### 参考URL
1. [MySQLを使う](http://make.bcde.jp/raspberry-pi/データベースを使うmysql/)
2. [MariaDBで文字コードを変更](http://blog.snowcait.info/2014/06/04/mariadb-utf8/)
3. [Raspberry PiでPythonからMySQLデータベースを扱う](https://make-muda.net/2016/07/3550/)

## 実際に行ったプログラムの説明


#### 参考URL
1. [Raspberry PiでPythonからMySQLデータベースを扱う](https://make-muda.net/2016/07/3550/)
