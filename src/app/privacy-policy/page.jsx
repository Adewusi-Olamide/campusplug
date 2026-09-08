import React from "react";
import "./page.css";

const page = () => {
  return (
    <main className="privacy-page">

      <section className="privacy-hero">
        <div className="privacy-container">
          <span className="privacy-label">LEGAL</span>

          <h1>Privacy Policy</h1>

          <p>
            Your privacy matters to us. This Privacy Policy explains how
            CampusPlug collects, uses, stores, and protects your information.
          </p>

          <span className="privacy-updated">
            Last updated: September 8, 2026
          </span>
        </div>
      </section>

      <section className="privacy-content">
        <div className="privacy-container">

          <div className="privacy-section">
            <h2>1. Introduction</h2>

            <p>
              Welcome to CampusPlug. CampusPlug is an educational platform
              designed to provide students with study tools, resources,
              and features that support learning and academic organization.
            </p>

            <p>
              This Privacy Policy explains what information we may collect,
              why we collect it, how we use it, and the choices available
              to you when using CampusPlug.
            </p>
          </div>

          <div className="privacy-section">
            <h2>2. Information We Collect</h2>

            <p>
              Depending on how you use CampusPlug, we may collect or receive
              the following types of information:
            </p>

            <ul>
              <li>
                Account information such as your name and email address.
              </li>

              <li>
                Authentication information required to sign in and secure
                your account.
              </li>

              <li>
                Study information that you choose to create or save,
                including notes, flashcards, study plans, and quiz results.
              </li>

              <li>
                Information about your use of CampusPlug's features and
                services.
              </li>

              <li>
                Technical information such as browser, device, and basic
                website activity information where necessary for operating
                the platform.
              </li>
            </ul>

            <p>
              We aim to collect only information that is reasonably necessary
              to provide, maintain, secure, and improve CampusPlug.
            </p>
          </div>

          <div className="privacy-section">
            <h2>3. How We Use Your Information</h2>

            <p>
              We may use information associated with your use of CampusPlug
              to:
            </p>

            <ul>
              <li>Create and manage your CampusPlug account.</li>
              <li>Authenticate and secure your account.</li>
              <li>Provide the study tools and features you request.</li>
              <li>Save and display your study activity and progress.</li>
              <li>Send important account or service-related emails.</li>
              <li>Improve the performance and functionality of CampusPlug.</li>
              <li>Protect the platform and its users from abuse or security threats.</li>
              <li>Display and measure advertising where applicable.</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>4. Account Authentication and Supabase</h2>

            <p>
              CampusPlug uses Supabase to provide certain backend services,
              including account authentication and database functionality.
            </p>

            <p>
              Information associated with your CampusPlug account and
              certain study-related data may be stored using Supabase's
              infrastructure so that CampusPlug can provide account-based
              features.
            </p>

            <p>
              Supabase processes information according to its own privacy
              practices and policies.
            </p>
          </div>

          <div className="privacy-section">
            <h2>5. Email Communications and Resend</h2>

            <p>
              CampusPlug uses Resend to help deliver certain emails sent
              by the platform.
            </p>

            <p>
              These emails may include account-related messages,
              verification emails, password or authentication messages,
              and other important service communications.
            </p>

            <p>
              When an email is sent through Resend, information necessary
              to deliver that email may be processed by Resend in accordance
              with its own privacy practices.
            </p>
          </div>

          <div className="privacy-section">
            <h2>6. Advertising and Google AdSense</h2>

            <p>
              CampusPlug may use Google AdSense to display advertisements
              on the website.
            </p>

            <p>
              Google and its advertising partners may use cookies or similar
              technologies to help deliver, personalize, measure, and improve
              advertisements, subject to applicable settings, laws, and
              policies.
            </p>

            <p>
              The advertisements displayed on CampusPlug may be based on
              various factors, including the content of the page, general
              information, or advertising preferences and technologies used
              by Google and its partners.
            </p>

            <p>
              CampusPlug does not control the information collected directly
              by third-party advertising providers through their advertising
              technologies.
            </p>
          </div>

          <div className="privacy-section">
            <h2>7. Cookies and Similar Technologies</h2>

            <p>
              CampusPlug may use cookies and similar technologies for
              essential website functionality, authentication, preferences,
              security, advertising, and other purposes described in our
              Cookie Policy.
            </p>

            <p>
              Third-party services used by CampusPlug may also use their
              own cookies or similar technologies.
            </p>

            <p>
              For more information, please review our Cookie Policy.
            </p>
          </div>

          <div className="privacy-section">
            <h2>8. Third-Party Services</h2>

            <p>
              CampusPlug relies on third-party providers to help operate
              certain parts of the platform. These may include:
            </p>

            <ul>
              <li>Supabase for authentication and database services.</li>
              <li>Resend for email delivery.</li>
              <li>Google AdSense for advertising services.</li>
            </ul>

            <p>
              These providers may process information as necessary to
              provide their services and are subject to their own terms
              and privacy policies.
            </p>
          </div>

          <div className="privacy-section">
            <h2>9. Data Security</h2>

            <p>
              We take reasonable measures to protect information associated
              with CampusPlug from unauthorized access, alteration,
              disclosure, or destruction.
            </p>

            <p>
              However, no online service or method of electronic storage
              can guarantee absolute security.
            </p>
          </div>

          <div className="privacy-section">
            <h2>10. Data Retention</h2>

            <p>
              We generally retain information for as long as reasonably
              necessary to provide CampusPlug's services, maintain accounts,
              provide requested features, comply with applicable legal
              obligations, resolve disputes, or protect the platform.
            </p>

            <p>
              Retention periods may vary depending on the type of information
              and the purpose for which it was collected.
            </p>
          </div>

          <div className="privacy-section">
            <h2>11. Your Privacy Choices</h2>

            <p>
              Depending on applicable law, you may have rights regarding
              certain personal information, including the ability to request
              access, correction, or deletion of your information.
            </p>

            <p>
              You may also be able to manage certain cookie and advertising
              preferences through your browser or available advertising
              controls.
            </p>

            <p>
              To make a privacy-related request, please contact CampusPlug
              through our official contact channels.
            </p>
          </div>

          <div className="privacy-section">
            <h2>12. Children's Privacy</h2>

            <p>
              CampusPlug is an educational platform intended for students
              and general educational use.
            </p>

            <p>
              We do not knowingly collect unnecessary personal information
              from children. Where applicable, users should have the
              involvement or permission of a parent or legal guardian when
              required by the laws that apply to them.
            </p>

            <p>
              If you believe that a child has provided personal information
              to CampusPlug inappropriately, please contact us so that we
              can review the situation.
            </p>
          </div>

          <div className="privacy-section">
            <h2>13. Changes to This Privacy Policy</h2>

            <p>
              We may update this Privacy Policy from time to time as
              CampusPlug develops, new services are introduced, or legal
              and technical requirements change.
            </p>

            <p>
              When changes are made, the updated version will be posted
              on this page together with a revised "Last updated" date.
            </p>
          </div>

          <div className="privacy-section">
            <h2>14. Contact Us</h2>

            <p>
              If you have questions about this Privacy Policy or how
              CampusPlug handles information, please contact us through
              the official CampusPlug contact channels.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
};

export default page;