let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Toggle Navbar Icon & Menu
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Active Section Tracking
window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                let currentLink = document.querySelector('header nav a[href*=' + id + ']');
                if (currentLink) currentLink.classList.add('active');
            });
        }
    });

    // Close mobile menu on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// GMAIL REDIRECT FUNCTION
function sendEmail() {
    // Get values from form
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email-id').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Check if fields are empty
    if(!name || !email || !subject || !message) {
        alert("Please fill all required fields before sending.");
        return;
    }

    // Your Gmail address
    const recipient = "jagankumarpanda06@gmail.com"; 

    // Construct the email body
    // %0D%0A creates a new line in the email
    const body = `Hi Jagan,%0D%0A%0D%0AMy name is ${name} (${email}).%0D%0A%0D%0A${message}`;

    // Gmail Web Interface Link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${body}`;

    // Open in new tab
    window.open(gmailUrl, '_blank');
}
