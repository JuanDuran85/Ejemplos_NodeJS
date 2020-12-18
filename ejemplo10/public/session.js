// Check if the user is logged in (based on loggedInUser cookie)
const cookie = decodeURIComponent(document.cookie);
console.log(cookie);

if (cookie.startsWith('loggedInUser=')) {
    // Add logout link
    const links = document.getElementById('links');
    const logoutListItem = links.lastElementChild.cloneNode(true);
    const logoutLink = logoutListItem.firstElementChild;
    console.log("dentro de cookie");
    console.log(logoutListItem);
    console.log(logoutLink);
    logoutLink.text = 'Logout';
    logoutLink.href = '/logout';

    links.appendChild(logoutListItem);

    // Get user email from cookie
    const [nameAndValue] = cookie.split(';');
    console.log(nameAndValue);
    const email = nameAndValue.slice('loggedInUser='.length);
    console.log(email);

    // Display user email
    const loggedInUserField = document.getElementById('loggedInUser');
    loggedInUserField.textContent = email;
}
