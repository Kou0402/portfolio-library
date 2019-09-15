# いろいろメモ

## Firestoreのデータ取得方法まとめ

### コレクションの全てのドキュメントを取得する。
```
db.collection("hoge").get().then(querySnapshot => {
  quetySnapshot.forEach(doc => {
    const fooData = doc.data()
  })
})
```
### get()で単一ドキュメントを取得する。
```
db.collection("hoge").doc("foo")
```
### Where句でドキュメントを取得する。
```
db.collection("hoge").where("foo", "==", true)
```
