#Findings Site（内視鏡・超音波検査所見閲覧システム） Ver.0.13.2
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
PostgreSQLと通信できるマシン、またはPostgreSQLがインストールされている
マシンの適当なフォルダに解凍してください。  
レジストリは一切変更しません。  
routesフォルダ内のconf.jsをメモ帳などのエディタで開いてください。  

    exports.conf = "tcp://db_user:db_userのパスワード@サーバーIP:ポート/endoDB?ssl=true"; 
    exports.hp = "医療機関名";    

を適切な内容に書き換えてください。 
 
例1：  
    exports.conf = "tcp://db_user:testpassword@localhost:5432/endoDB?ssl=true";    
    exports.hp = "○○クリニック"; `  

例2：    
exports.conf = "tcp://db_user:testpassword@192.168.1.1:5432/endoDB?ssl=true";  
exports.hp = "○○クリニック";  

[FindingsEditor postgresのインストール](http://www.madeinclinic.jp/%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2/findings/fe_postgres/)
を参考にserver.keyとserver.crtを作成し、server.jsと同じフォルダにコピーしてください  
コマンドラインでそのフォルダに移動し、
node server.js
を実行すれば起動します。

###インストール方法（クライアント）
WEBブラウザがあれば特に何もインストールする必要はありません。
（インターネットエクスプローラは6以上で動くはずですが、できるだけ
新しいものを利用してください。
可能であれば、ChromeやFireFoxなどのブラウザの利用をお勧めいたします。）

##使用方法
Webブラウザで
https://192.168.1.1:1337/
（IPは環境に合わせて適宜変更してください）にアクセスすれば利用できるはずです。  
なお、ログイン後に
https://192.168.1.1:1337/?pt_id=1000
にアクセスすれば、患者番号1000の患者さんの所見一覧が表示されます。
（患者番号は任意の番号を指定してください。）

***
連絡先  
ご不明な点、ご要望等ございましたら、こちらまでご連絡下さい。  
URL: <http://www.madeinclinic.jp>  
E-mail:<info@madeinclinic.jp> 
   
履歴  
2016/03/02 Ver. 0.13.2　画像の表示（フリック可能）に対応。  

≪著作権および免責事項≫  
　本ソフトウェアはフリーソフトです。（GPL v3 ライセンス）
自由に使用していただいて構いませんが、  
著作権は株式会社メイドインクリニックが保有しています。  
なお、このソフトウェアを使用したことによって生じたすべての
障害・損害・不具合等に関し、当社は一切の責任を負いません。  
ソースコードはGitHub上で公開しています。  
<https://github.com/KoichiHirahata>

