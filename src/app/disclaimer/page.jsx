import React from "react";
import "./page.css";

const page = () => {
  return (
    <main className="disclaimer-page">

      <section className="disclaimer-hero">
        <div className="disclaimer-container">
          <span className="disclaimer-label">LEGAL</span>

          <h1>Disclaimer</h1>

          <p>
            Important information about the educational content, tools,
            advertisements, and services provided by CampusPlug.
          </p>

          <span className="disclaimer-updated">
            Last updated: September 8, 2026
          </span>
        </div>
      </section>

      <section className="disclaimer-content">
        <div className="disclaimer-container">

          <div className="disclaimer-section">
            <h2>1. Educational Purpose</h2>

            <p>
              CampusPlug is an educational platform created to provide
              students with study tools, resources, and information that
              may support their learning and academic preparation.
            </p>

            <p>
              The information and tools provided on CampusPlug are intended
              for general educational and informational purposes only.
            </p>
          </div>

          <div className="disclaimer-section">
            <h2>2. No Guarantee of Results</h2>

            <p>
              While we aim to provide useful and accurate educational
              content, CampusPlug does not guarantee any particular
              academic result, examination score, admission outcome,
              qualification, or other result from using the platform.
            </p>

            <p>
              Your results may depend on many factors, including your
              preparation, effort, circumstances, and the requirements
              of the relevant institution or examination body.
            </p>
          </div>

          <div className="disclaimer-section">
            <h2>3. Accuracy of Information</h2>

            <p>
              We make reasonable efforts to keep CampusPlug's information
              useful and up to date. However, educational information,
              examination requirements, admission requirements, dates,
              policies, and other details may change.
            </p>

            <p>
              You should verify important information with the relevant
              official institution, examination body, or other authoritative
              source before relying on it.
            </p>
          </div>

          <div className="disclaimer-section">
            <h2>4. Calculators and Study Tools</h2>

            <p>
              CampusPlug may provide calculators, quizzes, CBT practice,
              flashcards, study planners, progress tracking, and other
              educational tools.
            </p>

            <p>
              These tools are provided to assist with learning and
              organization. Results should be checked when accuracy is
              important, especially for academic submissions or other
              consequential decisions.
            </p>
          </div>

          <div className="disclaimer-section">
            <h2>5. Third-Party Services</h2>

            <p>
              CampusPlug uses third-party services to support certain
              parts of the platform. These may include Supabase for
              authentication and database services, Resend for email
              delivery, and Google AdSense for advertising.
            </p>

            <p>
              Third-party services operate independently and may have
              their own terms, privacy policies, and practices.
            </p>

            <p>
              CampusPlug is not responsible for the independent practices,
              availability, or content of third-party services.
            </p>
          </div>

          <div className="disclaimer-section">
            <h2>6. Advertising</h2>

            <p>
              CampusPlug may display advertisements through third-party
              advertising providers, including Google AdSense.
            </p>

            <p>
              Advertisements may be selected or delivered by third-party
              systems based on factors determined by the advertising
              provider and applicable user settings.
            </p>

            <p>
              The appearance of an advertisement on CampusPlug does not
              necessarily mean that CampusPlug recommends, guarantees,
              or endorses the advertised product, service, or organization.
            </p>
          </div>

          <div className="disclaimer-section">
            <h2>7. External Links</h2>

            <p>
              CampusPlug may contain links to external websites or
              resources operated by third parties.
            </p>

            <p>
              We do not control external websites and are not responsible
              for their content, accuracy, availability, security, or
              privacy practices.
            </p>
          </div>

          <div className="disclaimer-section">
            <h2>8. Availability and Technical Issues</h2>

            <p>
              We aim to keep CampusPlug available and functioning properly,
              but we cannot guarantee that the website or every feature will
              always be available, uninterrupted, or free from errors.
            </p>

            <p>
              Technical issues, maintenance, updates, outages, or other
              circumstances may temporarily affect the platform.
            </p>
          </div>

          <div className="disclaimer-section">
            <h2>9. User Responsibility</h2>

            <p>
              You are responsible for how you use the information and tools
              provided by CampusPlug.
            </p>

            <p>
              Important academic, examination, admission, financial, or
              other consequential decisions should not be based solely on
              information provided by CampusPlug. Where appropriate, verify
              information with an official or qualified source.
            </p>
          </div>

          <div className="disclaimer-section">
            <h2>10. Changes to This Disclaimer</h2>

            <p>
              We may update this Disclaimer as CampusPlug develops,
              introduces new services, or when circumstances require
              changes.
            </p>

            <p>
              Any updates will be published on this page together with
              a revised "Last updated" date.
            </p>
          </div>

          <div className="disclaimer-section">
            <h2>11. Contact Us</h2>

            <p>
              If you have questions about this Disclaimer or the information
              provided by CampusPlug, please contact us through the official
              CampusPlug contact channels.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
};

export default page;
