import firebase from '@/plugins/firebase'

export default async ({ req, route, redirect }) => {
  if (!['/login'].includes(route.path)) {
    return
  }
  let isLogin = false
  await firebase.auth().onAuthStateChanged(user => {
    if (user) {
      isLogin = true
    } else {
      isLogin = false
    }
  })
  if (isLogin) {
    return redirect('/post')
  }
}
