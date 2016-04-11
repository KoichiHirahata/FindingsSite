#Findings Site（内視鏡・超音波検査所見閲覧システム） Ver.0.13.3
 【動作環境】Windows XP/7/8/8.1/10/Linux  
 【取り扱い種別】フリーソフト  
 【開発】（株）メイドインクリニック（<http://www.madeinclinic.jp>）  
 【開発環境】Microsoft Visual Studio 2015 (Visual C# 2015)


##概要  
弊社で開発している内視鏡・超音波所見入力システム（Findings Editor）で
記録した所見をWEBブラウザで見るためのシステムです。
Webブラウザを利用するので、__iPad、Android__でも所見を閲覧することができます。
通信はSSLで暗号化しており、ID、パスワードでログイン管理をしているので、
安全に運用できます。

##動作環境
Windows XP、7、8、8.1、10での動作を確認しています。
ただし、Windows XPはサポート期限が終了しているため、推奨しません。
一般的なLinuxでも動作するはずですが、検証はしていません。

##動作に必要なソフトウェア
Node.js

##インストール
###インストール方法（サーバー）
<https://nodejs.org/en/>　にアクセスして、Node.jsをインストールしてください。  

![node.js hp](http://www.madeinclinic.jp/software/FindingsSite/images/nodejsHP.png)    

PostgreSQLと通信できるマシン、またはPostgreSQLがインストールされている
マシンの適当なフォルダに解凍してください。  
レジストリは一切変更しません。  
routesフォルダ内のconf.jsをメモ帳などのエディタで開いてください。  

    exports.title = "所見閲覧システム";   
    exports.conf = "tcp://db_user:db_userのパスワード@サーバーIP:ポート/endoDB? ssl=true"; 
    exports.hp = "医療機関名";    
    exports.image_dir = "画像フォルダ"; //例：../images/
    exports.figure_dir = "シェーマフォルダ"; //例：D:/figures

が表示されます。

なお,   
exports.title  ページのタイトル  
exports.conf   接続設定  
exports.hp   所見内の医療機関名  
exports.image\_dir   表示する内視鏡画像のディレクトリ  
exports.figure\_dir    シェーマ画像のディレクトリ    
を表しています。　それぞれ適切な内容に書き換えてください。  

例1：  
exports.title = "所見閲覧システム";  
exports.conf = "tcp://db_user:testpassword@192.168.1.1:5432/endoDB?ssl=true";  
exports.hp = "○×クリニック";     
exports.image\_dir = "../images/";  
exports.figure\_dir = "D:/figures";   
※注意　パスを記述する際￥印は使えません。

画像例
![confafter]( http://www.madeinclinic.jp/software/FindingsSite/images/confafter.png)  

[FindingsEditor postgresのインストール](http://www.madeinclinic.jp/%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2/findings/fe_postgres/)
を参考にserver.keyとserver.crtを作成し、server.jsと同じフォルダにコピーしてください  

![serverkey]( http://www.madeinclinic.jp/software/FindingsSite/images/serverkey.png)

コマンドラインでそのフォルダに移動し、
node server.js
を実行すれば起動します。

![commandline]( http://www.madeinclinic.jp/software/FindingsSite/images/commandline.png)  

_Express server listening on port 1337_  
と表示されれば正しく起動されています。コマンドラインウィンドウは閉じないでください。

###インストール方法（クライアント）
クライアント（閲覧用の端末）は、WEBブラウザがあれば特に何もインストールする必要はありません。
（インターネットエクスプローラは6以上で動くはずですが、できるだけ
新しいものを利用してください。
可能であれば、ChromeやFireFoxなどのブラウザの利用をお勧めいたします。）

##使用方法

Webブラウザで
https://192.168.1.1:1337/
（IPは環境に合わせて適宜変更してください）にアクセスすれば利用できます。 
 IDとパスワードを入力してログインしてください。  

![loginimg]( http://www.madeinclinic.jp/software/FindingsSite/images/loginimg.png)  

次に患者IDを入力することでその患者さんの所見の一覧を表示させることができます。  

![inputID]( http://www.madeinclinic.jp/software/FindingsSite/images/inputID.png)

所見一覧から任意の所見の「表示」をクリックすることで所見を表示することができます。    
  
![shokenimg]( http://www.madeinclinic.jp/software/FindingsSite/images/shokenimg.png)  

また所見一覧から「画像」をクリックすることで画像を表示することもできます。

![gazoueturan](http://www.madeinclinic.jp/software/FindingsSite/images/gazoueturan.png)
***
連絡先  
ご不明な点、ご要望等ございましたら、こちらまでご連絡下さい。  
URL: <http://www.madeinclinic.jp>  
E-mail:<info@madeinclinic.jp> 
   
履歴  
2016/03/07 Ver. 0.13.3　画像表示機能の改善、シェーマ表示機能追加、画像表示時、同日に複数検査があればサムネイル表示。  
2016/03/02 Ver. 0.13.2　画像の表示（フリック可能）に対応。  

≪著作権および免責事項≫  
　本ソフトウェアはフリーソフトです。（GPL v3 ライセンス）
自由に使用していただいて構いませんが、  
著作権は株式会社メイドインクリニックが保有しています。  
なお、このソフトウェアを使用したことによって生じたすべての
障害・損害・不具合等に関し、当社は一切の責任を負いません。   