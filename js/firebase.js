// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { get, remove, child, push, ref, set, query, orderByChild, limitToLast, getDatabase, onChildAdded, onChildChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const _0x3eb3ae=_0x6d74;function _0x6d74(_0x1f0fdd,_0x3d68f6){const _0x47830a=_0x4783();return _0x6d74=function(_0x6d74a1,_0x2845be){_0x6d74a1=_0x6d74a1-0x7b;let _0x432564=_0x47830a[_0x6d74a1];return _0x432564;},_0x6d74(_0x1f0fdd,_0x3d68f6);}(function(_0x500059,_0x342e00){const _0xe3674c=_0x6d74,_0x586df3=_0x500059();while(!![]){try{const _0x112f4a=-parseInt(_0xe3674c(0x84))/0x1+-parseInt(_0xe3674c(0x7e))/0x2*(parseInt(_0xe3674c(0x8b))/0x3)+parseInt(_0xe3674c(0x81))/0x4*(-parseInt(_0xe3674c(0x88))/0x5)+parseInt(_0xe3674c(0x7b))/0x6+-parseInt(_0xe3674c(0x89))/0x7*(-parseInt(_0xe3674c(0x82))/0x8)+-parseInt(_0xe3674c(0x87))/0x9*(-parseInt(_0xe3674c(0x7d))/0xa)+parseInt(_0xe3674c(0x80))/0xb*(parseInt(_0xe3674c(0x85))/0xc);if(_0x112f4a===_0x342e00)break;else _0x586df3['push'](_0x586df3['shift']());}catch(_0x1e8b56){_0x586df3['push'](_0x586df3['shift']());}}}(_0x4783,0x1bfeb));const firebaseConfig={'apiKey':_0x3eb3ae(0x7f),'authDomain':_0x3eb3ae(0x7c),'projectId':_0x3eb3ae(0x86),'storageBucket':'aboutmeobeo.appspot.com','messagingSenderId':'229820157119','appId':_0x3eb3ae(0x8a),'measurementId':_0x3eb3ae(0x83)};function _0x4783(){const _0x2abf59=['10kOwhko','60708xsobEh','AIzaSyCG_UzY99B1FRlEYvoDbX44_o0C_bwTjpU','33yVUVYK','4NONhKp','24qpKCvD','G-FZ0346VHHD','14140EFeuIU','746280ojccWA','aboutmeobeo','598797TyQLuA','673230tYlSYu','102473VegnGj','1:229820157119:web:3106d04b170e8d49c30a0a','9HtLCYo','344970YJmCjf','aboutmeobeo.firebaseapp.com'];_0x4783=function(){return _0x2abf59;};return _0x4783();}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en'
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

const loginWithGoogle = document.getElementById("login");
const userInfo = document.getElementById("user-info");
const logoutButton = document.getElementById("signout");
const commentContainer = document.getElementById("comment-container");

loginWithGoogle.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            logoutButton.style.display = "block";
            commentContainer.style.display = "block";
            updateUserProfile(user);
        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
        });
})

let isUserLoggedIn = false;

function checkAuthAndRedirect() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginWithGoogle.style.display = "none";
            isUserLoggedIn = true;
            logoutButton.style.display = "block";
            commentContainer.style.display = "block";
            userInfo.style.display = "block";
            updateUserProfile(user);
        } else {
            loginWithGoogle.style.display = "block";
            userInfo.style.display = "none";
            isUserLoggedIn = false;
        }
    });
}


document.addEventListener("DOMContentLoaded", checkAuthAndRedirect);

const authenticatedUIDs = [
    "eHLF0W8ynQbK9h66TeOpP0YoZaZ2",
    "v1v0wFYfY9TWkbqQbYoKQUoEfv02"
];

function updateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;
    const uid = user.uid;

    let verifyImageSrc = "";

    if (authenticatedUIDs.includes(uid)) {
        verifyImageSrc = "Icon/verify.svg";
    }

    let userNameHTML = `<span>Hello, ${userName}</span>, please write something for me :3`;
    if (verifyImageSrc) {
        userNameHTML += `<img class="verified" src="${verifyImageSrc}" alt="Verified" />`;
    }

    document.getElementById("userName").innerHTML = userNameHTML;
    document.getElementById("userEmail").textContent = userEmail;
    document.getElementById("userProfilePicture").src = userProfilePicture;
    document.getElementById("username-label").textContent = `C:\\User\\${user.displayName}>`;
}

function logout() {
    signOut(auth)
        .then(() => {
            clearUserProfile();
            userInfo.style.display = "none";
            commentContainer.style.display = "none";
            logoutButton.style.display = "none";
            document.getElementById('open-contact-list').style.display = "none";
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
}

document.getElementById("signout").addEventListener("click", logout);

function clearUserProfile() {
    document.getElementById("userName").textContent = "";
    document.getElementById("userEmail").textContent = "";
    document.getElementById("userProfilePicture").src = "Icon/grey-img.jpg";
    document.getElementById("username-label").textContent = "";
}

function submitComment() {
    const user = auth.currentUser;
    if (user) {
        var commentInput = document.getElementById('comment-input').value;

        if (!commentInput) {
            alert("Comment must not be empty.");
            return;
        }

        if (commentInput.length > 500) {
            alert("Message must not exceed 500 characters.");
            return;
        }

        var comment = {
            content: commentInput,
            timestamp: new Date().getTime(),
            username: user.displayName,
            avatarUrl: user.photoURL
        };

        var userCommentRef = ref(getDatabase(app), 'comments/' + user.uid);
        set(userCommentRef, comment).then(() => {
            console.log("Message saved successfully.");
            document.getElementById('comment-input').value = '';
            loadComments();
        }).catch((error) => {
            console.error("Error saving comment: ", error);
        });
    } else {
        alert("Please log in to send Message.");
    }
}


document.getElementById("send-comment").addEventListener("click", submitComment);

function loadComments() {
    const db = getDatabase(app);
    const commentsRef = ref(db, 'comments');
    const commentsQuery = query(commentsRef, orderByChild('timestamp'), limitToLast(20));

    const listCommentDiv = document.getElementById('list-comment');
    listCommentDiv.innerHTML = '';

    onChildAdded(commentsQuery, (data) => {
        const comment = data.val();
        comment.id = data.key;
        addCommentToDOM(comment);
    });

    onChildChanged(commentsQuery, (data) => {
        const comment = data.val();
        comment.id = data.key;
        updateCommentInDOM(comment);
    });
}

// Hàm để thêm comment vào DOM
function addCommentToDOM(comment) {
    const listCommentDiv = document.getElementById('list-comment');
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.id = `comment-${comment.id}`;

    const avatarImg = document.createElement('img');
    avatarImg.className = 'comment-avatar';
    avatarImg.alt = 'comment avatar';
    avatarImg.src = comment.avatarUrl || 'default-avatar-url.jpg';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'comment-name';
    nameSpan.textContent = comment.username;

    const timeSpan = document.createElement('span');
    timeSpan.className = 'comment-time';
    const date = new Date(comment.timestamp);
    timeSpan.textContent = date.toLocaleString();

    const contentSpan = document.createElement('span');
    contentSpan.className = 'comment-content ellipsis';
    contentSpan.textContent = comment.content;

    commentDiv.appendChild(avatarImg);
    commentDiv.appendChild(nameSpan);
    commentDiv.appendChild(timeSpan);
    commentDiv.appendChild(contentSpan);

    listCommentDiv.insertBefore(commentDiv, listCommentDiv.firstChild);
}

// Hàm để cập nhật comment trong DOM
function updateCommentInDOM(comment) {
    const commentDiv = document.getElementById(`comment-${comment.id}`);
    if (commentDiv) {
        commentDiv.querySelector('.comment-avatar').src = comment.avatarUrl || 'default-avatar-url.jpg';
        commentDiv.querySelector('.comment-name').textContent = comment.username;
        commentDiv.querySelector('.comment-time').textContent = new Date(comment.timestamp).toLocaleString();
        commentDiv.querySelector('.comment-content').textContent = comment.content;
    } else {
        addCommentToDOM(comment);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadComments();
});


// Lắng nghe sự kiện submit của form

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const user = auth.currentUser;
    if (user) {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const contactsRef = ref(database, 'contacts');
        const newContactRef = push(contactsRef);
        const newContactKey = newContactRef.key;

        const contactData = {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            subject: subject,
            message: message,
            timestamp: Date.now()
        };

        set(newContactRef, contactData)
        .then(() => {
            alert("Message sent successfully!");
            document.getElementById('contactForm').reset();
            getAllContacts();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    } else { loginWithGoogle.click(); }
});

// Hàm để lấy tất cả các contact
function getAllContacts() {
    const dbRef = ref(database);
    get(child(dbRef, 'contacts')).then((snapshot) => {
        if (snapshot.exists()) {
            const contacts = snapshot.val();
            displayContacts(contacts);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error("Error getting document: ", error);
    });
}

// Hàm để hiển thị các contact
function displayContacts(contacts) {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    for (const key in contacts) {
        if (contacts.hasOwnProperty(key)) {
            const contact = contacts[key];
            const contactElement = document.createElement('div');
            contactElement.classList.add('contact');

            contactElement.innerHTML = `
                <h3>${contact.fullName}</h3>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Phone Number:</strong> ${contact.phoneNumber}</p>
                <p><strong>Subject:</strong> ${contact.subject}</p>
                <p><strong>Message:</strong> ${contact.message}</p>
                <p><strong>Timestamp:</strong> ${new Date(contact.timestamp).toLocaleString()}</p>
                <button class="delete-contact" data-key="${key}">Delete</button>
            `;

            contactList.appendChild(contactElement);
        }
    }

    // Lắng nghe sự kiện click vào nút delete
    document.querySelectorAll('.delete-contact').forEach(button => {
        button.addEventListener('click', function() {
            const contactKey = this.getAttribute('data-key');
            deleteContact(contactKey);
        });
    });
}

// Hàm để xóa contact
function deleteContact(contactKey) {
    const contactRef = ref(database, 'contacts/' + contactKey);
    remove(contactRef)
    .then(() => {
        alert("Contact deleted successfully!");
        getAllContacts();
    })
    .catch((error) => {
        console.error("Error deleting document: ", error);
    });
}


// Kiểm tra xác thực người dùng
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        if (authenticatedUIDs.includes(uid)) {
            document.getElementById('open-contact-list').style.display = "block";
            getAllContacts();
        } else {
            console.log("You are not authorized to view contacts.");
        }
    } else {
        console.log("No user is signed in.");
    }
});

document.getElementById('open-contact-list').addEventListener("click", function(){ 
    document.getElementById('show-contact-list').style.display = "block"; 
    getAllContacts();
});

function updateVisitCount() {
    const visitCountRef = ref(database, 'visits');
    get(visitCountRef).then(snapshot => {
        let currentCount = snapshot.val();
        if (currentCount === null) {
            currentCount = 0;
        }
        set(visitCountRef, currentCount + 1);
        document.getElementById('total-view').textContent = 'Number of website visits: ' + (currentCount + 1);
    });
}

window.onload = updateVisitCount;