"use client";

import React, { useEffect, useState } from "react";
import "./CookieBanner.css";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("campusplug_cookie_consent");

    if (!cookieConsent) {
      setShowBanner(true);
    }

    const handleOpenSettings = () => {
      setShowBanner(true);
      setShowSettings(true);
    };

    window.addEventListener("openCookieSettings", handleOpenSettings);

    return () => {
      window.removeEventListener(
        "openCookieSettings",
        handleOpenSettings
      );
    };
  }, []);


  const saveConsent = (choice) => {
    localStorage.setItem("campusplug_cookie_consent", choice);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAccept = () => {
    saveConsent("accepted");
  };

  const handleDecline = () => {
    saveConsent("declined");
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">

        <div className="cookie-icon">
          🍪
        </div>

        <div className="cookie-text">
          <h3>We use cookies</h3>

          <p>
            CampusPlug uses cookies and similar technologies to keep the
            website working, remember your preferences, and support
            advertising. You can choose how optional cookies are used.
          </p>

          <p className="cookie-policy-link">
            Learn more in our{" "}
            <a href="/cookie-policy">Cookie Policy</a>.
          </p>
        </div>

        <div className="cookie-actions">
          <button
            className="cookie-settings"
            onClick={handleSettings}
          >
            Settings
          </button>

          <button
            className="cookie-decline"
            onClick={handleDecline}
          >
            Decline
          </button>

          <button
            className="cookie-accept"
            onClick={handleAccept}
          >
            Accept
          </button>
        </div>

      </div>

      {showSettings && (
        <div className="cookie-settings-panel">

          <div className="cookie-settings-header">
            <div>
              <h3>Cookie Settings</h3>
              <p>
                Choose which optional cookie categories you'd like to allow.
              </p>
            </div>

            <button
              className="cookie-close"
              onClick={() => setShowSettings(false)}
              aria-label="Close cookie settings"
            >
              ×
            </button>
          </div>

          <div className="cookie-category">
            <div>
              <h4>Necessary Cookies</h4>
              <p>
                These cookies and similar technologies help CampusPlug
                function properly, including authentication and essential
                features.
              </p>
            </div>

            <span className="cookie-always-on">
              Always on
            </span>
          </div>

          <div className="cookie-category">
            <div>
              <h4>Advertising</h4>
              <p>
                These technologies may be used by advertising providers
                such as Google AdSense to deliver advertising. Depending
                on your choices and location, advertising may be
                personalized or non-personalized.
              </p>
            </div>

            <span className="cookie-optional">
              Optional
            </span>
          </div>

          <div className="cookie-settings-actions">
            <button
              className="cookie-decline"
              onClick={handleDecline}
            >
              Decline Optional
            </button>

            <button
              className="cookie-accept"
              onClick={handleAccept}
            >
              Accept All
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CookieBanner;
