export default function (context) {
    if (!context.store.getters.isAuth) {
        console.log('[Middleware] Auth');
        context.redirect('/admin/auth');
    }
}