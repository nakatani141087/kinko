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

#### 標準ライブラリで使用したもの
 - cgi:ゲートウェイインターフェースの規格.Webサーバーで使用
 - time:時刻データのアクセスと変換.時間の計測で使用
 - datetime:日付の取得で使用
#### GPIOで使ったライブラリのバージョン
 - RPi.GPIO (0.6.5)

install:
```sh
$ sudo apt-get install python-rpi.gpio
```

サーボモーターをGPIOから操作するPythonの書き方
: Pythonでサーボモーター(TSU-3)を右に回すソースコード

```python
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
### Apache2
HTTPサーバーを立てるのにApache2を使用
First Tab:
```sh
$ node app
```


### MariaDB
データベースサーバーを立てるのにMariaDBを使用
First Tab:
```sh
$ node app
```
