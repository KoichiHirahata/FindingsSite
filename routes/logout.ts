export function index(req, res) {
    req.session.login = false;
    req.session.name = null;
    res.redirect('/');
}