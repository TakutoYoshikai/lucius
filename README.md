# Lucius
Lucius is a egosurfing bot.

### Usage
**1. git clone**
```bash
git clone https://github.com/TakutoYoshikai/lucius.git
```
**2. change name variable in app.js**
```javascript
let name = "Your name";
let slackName = "Your slack username";
```
**3. create a bot application on your slack workspace, and copy the token.**
**4. write the token in slack.json**
```json
{
        "name": "lucius",
        "token": "your token"
}
```
**5. log in on Twitter, and generate tokens below, and write the tokens in twitter.json.**
```json
{
  "consumer_key" : "xxx",
  "consumer_secret" : "yyy",
  "access_token_key" : "zzz",
  "access_token_secret": "ttt"
}
```
**6. add the words in ignore.txt if you ignore specific words.**
```text
John
Bob
Alice
```
**8. npm install**

**9. register a cron job.**
