const users = require('./users');

function login(req, res) {
    // Get user credentials
    const { email, password } = req.body;
    console.log(email, password);
    // Authenticate the user
    if (authenticate(email, password)) {
        // Mark user session as authenticated
        res.cookie('loggedInUser', email);
        // Get return address
        //const returnTo = eval('(' + req.query.returnTo + ')');
        //const returnTo = JSON.parse(req.query.returnTo);
        let returnTo;
        console.log(returnTo)
        try {
            returnTo = JSON.parse(req.query.returnTo);
        } catch (error) {
            console.log(error)
        };
        if (!returnTo || typeof returnTo.url !== 'string') {
            res.clearCookie('loggedInUser');
            throw new Error('Invalid returnTo object');
        }
        // Redirect to the return address
        console.log(returnTo);
        res.redirect(returnTo.url);
    } else {
        // HTTP 401 when authentication fails
        res.sendStatus(401);
    }
}

function authenticate(email, password) {
    // Try each user
    console.log(email, password);

    for (let i = 0; i < users.length; ++i) {
        // If email and password match
        if (users[i].email === email && users[i].password === password) {
            // Authentication successful
            return true;
        }
    }
    // If no user matched, authentication failed
    return false;
}

module.exports = login;
