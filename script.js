/* =========================================================
   ELEMENTS
========================================================= */

const menuButton = document.querySelector("#menu-icon");
const menuIcon = menuButton?.querySelector("i");
const navbar = document.querySelector("#navbar");

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

const contactForm = document.querySelector("#contact-form");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function toggleMenu() {
    if (!menuButton || !navbar || !menuIcon) {
        return;
    }

    const isOpen = navbar.classList.toggle("active");

    menuIcon.classList.toggle("bx-menu", !isOpen);
    menuIcon.classList.toggle("bx-x", isOpen);

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
}


if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

function closeMenu() {

    if (!navbar || !menuButton || !menuIcon) {
        return;
    }

    navbar.classList.remove("active");

    menuIcon.classList.remove("bx-x");
    menuIcon.classList.add("bx-menu");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}


/* Close menu after clicking a navigation link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {
        closeMenu();
    });

});


/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================= */

function updateActiveSection() {

    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === `#${sectionId}`) {
                    link.classList.add("active");
                }

            });

        }

    });

}


/* =========================================================
   SCROLL HANDLER
========================================================= */

let scrollTimeout;

window.addEventListener(
    "scroll",
    () => {

        if (!scrollTimeout) {

            scrollTimeout = setTimeout(() => {

                updateActiveSection();

                scrollTimeout = null;

            }, 50);

        }

    },
    { passive: true }
);


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", event => {

    if (
        !navbar ||
        !menuButton ||
        !navbar.classList.contains("active")
    ) {
        return;
    }

    const clickedInsideMenu =
        navbar.contains(event.target);

    const clickedMenuButton =
        menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        closeMenu();
    }

});


/* =========================================================
   CLOSE MENU WITH ESCAPE
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* =========================================================
   CONTACT FORM
========================================================= */

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.querySelector("#full-name").value.trim();

        const email =
            document.querySelector("#email-id").value.trim();

        const phone =
            document.querySelector("#phone").value.trim();

        const subject =
            document.querySelector("#subject").value.trim();

        const message =
            document.querySelector("#message").value.trim();


        /* Browser validation */

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;
        }


        /* Your email address */

        const recipient =
            "jagankumarpanda06@gmail.com";


        /* Create email body */

        const emailBody =
`Hi Jagan,

My name is ${name}.
Email: ${email}
Phone: ${phone || "Not provided"}

${message}`;


        /* Gmail compose URL */

        const gmailUrl =
            `https://mail.google.com/mail/?view=cm&fs=1` +
            `&to=${encodeURIComponent(recipient)}` +
            `&su=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(emailBody)}`;


        /* Open Gmail */

        window.open(
            gmailUrl,
            "_blank",
            "noopener,noreferrer"
        );

    });

}


/* =========================================================
   INITIAL ACTIVE SECTION
========================================================= */

updateActiveSection();