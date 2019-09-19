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
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
```
## モジュールモードでのstoreアクセス

### ハッシュキーを指定して呼び出す
```
this.$store.getters['hogeFile/hoge']
```

## Firestoreから分割して取得
```
firebase.firestore().db
  .collection('hoge')
  .orderBy(createdAt, asc)
  .startAfter(lastDocument)
  .limit(10)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(documents => {
      // dataにバインド
    })
    lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1]
  })
```
