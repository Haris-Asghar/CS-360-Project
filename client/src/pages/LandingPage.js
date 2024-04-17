import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Link } from 'react-router-dom';

function Landing() {
  const emailAddress = 'group9@lums.edu.pk';
  const subject = 'Attendance Management System';
  const body = '';

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  useEffect(() => {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn.querySelector("i");

    const scrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    };

    ScrollReveal().reveal(".header__container p", {
      ...scrollRevealOption,
    });

    ScrollReveal().reveal(".header__container h1", {
      ...scrollRevealOption,
      delay: 500,
    });

    ScrollReveal().reveal(".about__image img", {
      ...scrollRevealOption,
      origin: "left",
    });

    ScrollReveal().reveal(".about__content .section__subheader", {
      ...scrollRevealOption,
      delay: 500,
    });

    ScrollReveal().reveal(".about__content .section__header", {
      ...scrollRevealOption,
      delay: 1000,
    });

    ScrollReveal().reveal(".about__content .section__description", {
      ...scrollRevealOption,
      delay: 1500,
    });

    ScrollReveal().reveal(".about__btn", {
      ...scrollRevealOption,
      delay: 2000,
    });

    ScrollReveal().reveal(".room__card", {
      ...scrollRevealOption,
      interval: 500,
    });

    ScrollReveal().reveal(".service__list li", {
      ...scrollRevealOption,
      interval: 500,
      origin: "right",
    });

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });

    navLinks.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtnIcon.setAttribute("class", "ri-menu-line");
    });
  }, []); // empty dependency array ensures that this effect runs only once after the initial render

  return (

    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <header class="header">
          <nav>
            <div class="nav__bar">
              <div class="logo">
                <img src="/assets/group-logo.webp" alt="logo" />
              </div>
              <div class="nav__menu__btn" id="menu-btn">
                <i class="ri-menu-line"></i>
              </div>
            </div>
            <ul class="nav__links" id="nav-links">
            </ul>
            <Link to="/auth">
              <button className='button'>Sign In</button>
            </Link>
          </nav>
          <div class="section__container header__container" id="home">
            <p>Attendance - Management - System</p>
            <h1>Attendance and Leave Management<br />Made <span>Easy</span>.</h1>
          </div>
        </header>

        <section class="section__container about__container" id="about">
          <div class="about__image">
            <img src="/assets/employee-dash.png" alt="Employee Dashboard" />
          </div>
          <div class="about__content">
            <p class="section__subheader">ABOUT THE SYSTEM</p>
            <h2 class="section__header">Robust Attendance and Leave Tracking</h2>
            <p class="section__description">
              With a focus on quality of life, simplicity, personalization, and
              seamlessness, our platform is dedicated to ensuring that all
              your management needs are fulfilled.
            </p>
            <div class="about__btn">
              <Link to="/auth">
                <button className='button'>Sign In</button>
              </Link>
            </div>
          </div>
        </section>

        <section class="section__container room__container">
          <p class="section__subheader">ALL THE ANALYTICS</p>
          <h2 class="section__header">Available At Your Fingertips.</h2>
          <div class="room__grid">

            <div class="room__card">
              <div class="room__card__image">
                <img src="/assets/admin-dash.png" alt="Admin dashboard" />
                <div class="room__card__icons">

                  <span><i class="ri-shield-star-line"></i></span>
                </div>
              </div>
              <div class="room__card__details">
                <h4>Comprehensive employee attendance and leave tracking</h4>
                <p>
                  With dedicated dashboards for both employee and admin users, your management can rest easy
                </p>
                <h5>See for yourself <span>right here</span></h5>
                <Link to="/auth">
                  <button className='button'>Sign In</button>
                </Link>
              </div>
            </div>

            <div class="room__card">
              <div class="room__card__image">
                <img src="/assets/employee-tab.png" alt="Employee Table" />
                <div class="room__card__icons">

                  <span><i class="ri-shield-star-line"></i></span>
                </div>
              </div>
              <div class="room__card__details">
                <h4>Supervise individual employee dashboards</h4>
                <p>
                  In-depth views allow adminstrators the ultimate power to monitor the progress and dashboards of their employees
                </p>
                <h5>You can start <span>right now</span></h5>
                <Link to="/auth">
                  <button className='button'>Sign In</button>
                </Link>
              </div>
            </div>

            <div class="room__card">
              <div class="room__card__image">
                <img src="/assets/leave-manage.png" alt="Leave Management" />
                <div class="room__card__icons">

                  <span><i class="ri-shield-star-line"></i></span>
                </div>
              </div>
              <div class="room__card__details">
                <h4>Robust and Effective Leave Management</h4>
                <p>
                  Track, oversee, and approve or reject employee leave requests from employees in real-time
                </p>
                <h5>Begin <span>here</span></h5>
                <Link to="/auth">
                  <button className='button'>Sign In</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section class="service" id="service">
          <div class="section__container service__container">
            <div class="service__content">
              <p class="section__subheader">WHAT WE OFFER</p>
              <h2 class="section__header">Simplicity and Effectiveness</h2>
              <ul class="service__list">
                <li>
                  <span><i class="ri-shield-star-line"></i></span>
                  Security
                </li>
                <li>
                  <span><i class="ri-24-hours-line"></i></span>
                  Availability
                </li>
                <li>
                  <span><i class="ri-map-2-line"></i></span>
                  Modularity
                </li>
              </ul>
            </div>
          </div>
        </section>


        <footer class="footer" id="contact">
          <div class="section__container footer__container">
            <div class="footer__col">
              <div class="logo">
                <a href="#home"><img src="/assets/group-logo.webp" alt="logo" /></a>
              </div>
              <p class="section__description">
                Our application is dedicated to ensuring that all your management needs are fulfilled.
              </p>
              <Link to="/auth">
                <button className='button'>Sign In</button>
              </Link>
            </div>
            <a href={mailtoLink}>Send Email</a>

            <div class="footer__col">
              <h4>CONTACT US</h4>
              <ul class="footer__links">
                <li></li>
              </ul>
            </div>
          </div>
          <div class="footer__bar">
            Copyright © 2024<br></br>
            Group 9
          </div>
        </footer>

        <script src="https://unpkg.com/scrollreveal"></script>
        <script src="main.js"></script>
      </body>
    </html>
  );
}



export default Landing;