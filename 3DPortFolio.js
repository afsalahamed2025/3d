const navs = document.querySelectorAll(".nav-list li");
const cube = document.querySelector(".box");
const sections = document.querySelectorAll(".section");

const resumeLists = document.querySelectorAll(".resume-list");
const resumeBoxs = document.querySelectorAll(".resume-box");
const projectsLists = document.querySelectorAll(".project-list");
const projectsBox = document.querySelectorAll(".project-box");

/* navbar actions and all section actions along with cube rotation when navbr is clicked */
navs.forEach((nav, idx) => {
  nav.addEventListener("click", () => {
    document.querySelector(".nav-list li.active").classList.remove("active");

    nav.classList.add("active");

    cube.style.transform = `rotateY(${idx * -90}deg)`;

    document.querySelector(".section.active").classList.remove("active");

    sections[idx].classList.add("active");

    const array = Array.from(sections);
    const arrSecs = array.slice(1, -1); // only requries 1, 2, 3 or does requirestart and end indexes
    arrSecs.forEach((arrSecs) => {
      if (arrSecs.classList.contains("active")) {
        sections[4].classList.add("action-contact");
      }
    });
    if (sections[0].classList.contains("active")) {
      sections[4].classList.remove("action-contact");
    }
  });
});

/* resume section  clicking tab-list */
resumeLists.forEach((list, idx) => {
  list.addEventListener("click", () => {
    document.querySelector(".resume-list.active").classList.remove("active");

    list.classList.add("active");

    document.querySelector(".resume-box.active").classList.remove("active");

    resumeBoxs[idx].classList.add("active");
  });
});

/* Projects section  clicking tab-list  */
projectsLists.forEach((list, idx) => {
  list.addEventListener("click", () => {
    document.querySelector(".project-list.active").classList.remove("active");
    list.classList.add("active");
    document.querySelector(".project-box.active").classList.remove("active");

    projectsBox[idx].classList.add("active");
  });
});

/* visibilty for contact section when reloading (cube reloading animation) */
setTimeout(() => {
  sections[4].classList.remove("active");
}, 1000);

/* meeaage */
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // Capture input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate inputs
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  Swal.fire({
    title: "Error",
    text: "Please enter a valid email address!",
    icon: "error",
  });
  return;
}

    // Template parameters for EmailJS
    const templateParams = {
      email: email,
      to_name: name,
      message: message,
    };

    // Sending the email
    emailjs
      .send("service_ujk4fno", "template_n81bjim", templateParams)
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          Swal.fire({
            title: "Success",
            text: "Your email has been sent successfully!",
            icon: "success",
          });
          event.target.reset(); // Clear the form upon success
        },
        (error) => {
          console.error("FAILED...", error);
          Swal.fire({
            title: "Error",
            text: "Failed to send email. Please try again later.",
            icon: "error",
          });
        }
      );
  });
