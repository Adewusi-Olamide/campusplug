import React from "react";
import "./page.css";

const page = () => {
  return (
    <main className="cookie-page">

      <section className="cookie-hero">
        <div className="cookie-container">
          <span className="cookie-label">LEGAL</span>

          <h1>Cookie Policy</h1>

          <p>
            This Cookie Policy explains how CampusPlug and certain
            third-party services may use cookies and similar technologies
            when you use our website.
          </p>

          <span className="cookie-updated">
            Last updated: September 8, 2026
          </span>
        </div>
      </section>

      <section className="cookie-content">
        <div className="cookie-container">

          <div className="cookie-section">
            <h2>1. What Are Cookies?</h2>

            <p>
              Cookies are small text files that may be stored on your device
              when you visit a website. Cookies can help websites remember
              information, provide certain features, improve performance,
              and support services such as authentication and advertising.
            </p>
          </div>

          <div className="cookie-section">
            <h2>2. How CampusPlug Uses Cookies</h2>

            <p>
              CampusPlug and services used to operate the platform may use
              cookies or similar technologies for purposes such as:
            </p>

            <ul>
              <li>Keeping the website and its features functioning properly.</li>
              <li>Supporting account authentication and security.</li>
              <li>Remembering certain preferences or settings.</li>
              <li>Protecting the platform from misuse or security threats.</li>
              <li>Supporting advertising and measuring advertising performance where applicable.</li>
            </ul>
          </div>

          <div className="cookie-section">
            <h2>3. Essential and Authentication Cookies</h2>

            <p>
              Some cookies or similar technologies may be necessary for
              CampusPlug to provide important website features.
            </p>

            <p>
              For example, CampusPlug uses Supabase to support account
              authentication and backend services. Authentication-related
              technologies may be used to help keep users signed in,
              maintain secure sessions, and protect accounts.
            </p>
          </div>

          <div className="cookie-section">
            <h2>4. Preference Cookies</h2>

            <p>
              Cookies or similar technologies may be used to remember
              certain choices or preferences you make while using
              CampusPlug.
            </p>

            <p>
              These technologies can help provide a more consistent and
              convenient experience when you return to the website.
            </p>
          </div>

          <div className="cookie-section">
            <h2>5. Advertising Cookies and Google AdSense</h2>

            <p>
              CampusPlug may use Google AdSense to display advertisements
              on the website.
            </p>

            <p>
              Google and its advertising partners may use cookies, device
              identifiers, or similar technologies to deliver, limit,
              personalize, and measure advertisements, subject to applicable
              laws, settings, and user choices.
            </p>

            <p>
              Depending on your location and applicable settings, advertising
              may be personalized or non-personalized.
            </p>

            <p>
              CampusPlug does not control all technologies used directly by
              Google or other advertising partners when advertisements are
              delivered through their services.
            </p>
          </div>

          <div className="cookie-section">
            <h2>6. Third-Party Technologies</h2>

            <p>
              CampusPlug uses or may use third-party services to support
              different parts of the platform.
            </p>

            <p>
              These services may include Supabase for authentication and
              database functionality, Resend for email delivery, and
              Google AdSense for advertising.
            </p>

            <p>
              Some of these providers may use their own cookies or similar
              technologies in connection with the services they provide.
              Their handling of information is subject to their own policies
              and practices.
            </p>
          </div>

          <div className="cookie-section">
            <h2>7. Managing Cookies</h2>

            <p>
              Most web browsers allow you to control cookies through their
              settings. Depending on your browser, you may be able to block,
              delete, or manage cookies and other stored website data.
            </p>

            <p>
              You may also have access to advertising preference controls
              provided by advertising providers, including Google.
            </p>

            <p>
              Please note that disabling or blocking certain cookies may
              affect the functionality of CampusPlug, including account
              authentication or other website features.
            </p>
          </div>

          <div className="cookie-section">
            <h2>8. Cookie Consent</h2>

            <p>
              Where required by applicable law, CampusPlug may request your
              consent before using certain non-essential cookies or similar
              technologies.
            </p>

            <p>
              You may be able to manage or update your cookie preferences
              through controls provided on the website, where available.
            </p>
          </div>

          <div className="cookie-section">
            <h2>9. Changes to This Cookie Policy</h2>

            <p>
              We may update this Cookie Policy when CampusPlug introduces
              new features, services, technologies, or when legal
              requirements change.
            </p>

            <p>
              Any updates will be posted on this page together with a
              revised "Last updated" date.
            </p>
          </div>

          <div className="cookie-section">
            <h2>10. Contact Us</h2>

            <p>
              If you have questions about this Cookie Policy or how
              CampusPlug uses cookies and similar technologies, please
              contact us through the official CampusPlug contact channels.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
};

export default page;


