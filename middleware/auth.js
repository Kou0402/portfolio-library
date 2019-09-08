import firebase from '@/plugins/firebase'

export default async ({ req, route, redirect }) => {
  console.log(route.path)
  if (!['/login'].includes(route.path)) {
    console.log('1')
    return
  }
  console.log('2')
  let isLogin = false
  const res = await firebase.auth().onAuthStateChanged(user => {
    console.log('3')
    if (user) {
      isLogin = true
    } else {
      isLogin = false
    }
  })
  console.log(res)
  console.log('4')
  console.log(isLogin)
  if (isLogin) {
    console.log('post')
    return redirect('/post')
  }
}
