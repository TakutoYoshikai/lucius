# Lucius
ルシウスはあなたの名前がTwitter上で呟かれた時、あなたに知らせてくれる下僕です。

## 使い方
1. ターミナルでClone
```
git clone https://github.com/TakutoYoshikai/lucius.git
```
2. app.jsのname変数を自分の名前に変更
```
let name = "Your name";
let slackName = "Your slack username";
```
3. SlackにBotを作成し、Tokenを取得
4. 取得したTokenをslack.jsonで指定
```
{
        "name": "lucius",
        "token": "your token"
}
```

5. 自分に関するツイート以外を取り除く為、ignore.txtに無視したい単語を追加する。
```
吉開太郎
吉開花子
吉開二郎
```
6. Node.jsをインストール
動作が確認出来ているのはNode.js v6.2.0

7. cron経由で一定時間おきに実行
