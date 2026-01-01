// Cookie Consent Manager for Google Analytics
(function() {
    'use strict';

    const CONSENT_KEY = 'cookie-consent';
    const GA_ID = 'G-1LJB1LYD72';

    // Check if consent has already been given
    function hasConsent() {
        return localStorage.getItem(CONSENT_KEY) === 'accepted';
    }

    // Check if consent has been rejected
    function hasRejected() {
        return localStorage.getItem(CONSENT_KEY) === 'rejected';
    }

    // Load Google Analytics
    function loadGoogleAnalytics() {
        // Load gtag.js script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_ID, { 'anonymize_ip': true });
    }

    // Create and show consent banner
    function showConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #1a1a1a; color: white; padding: 20px; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <p style="margin: 0; font-size: 14px; line-height: 1.5;">
                            Vi bruker informasjonskapsler (cookies) for å forbedre brukeropplevelsen og analysere trafikk.
                            <a href="personvern.html" style="color: #4a9eff; text-decoration: underline;">Les mer om personvern</a>
                        </p>
                    </div>
                    <div style="display: flex; gap: 10px; flex-shrink: 0;">
                        <button id="cookie-reject" style="padding: 10px 20px; background: transparent; color: white; border: 1px solid #666; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s;">
                            Avvis
                        </button>
                        <button id="cookie-accept" style="padding: 10px 20px; background: #4a9eff; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s;">
                            Aksepter
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        // Add hover effects
        const acceptBtn = document.getElementById('cookie-accept');
        const rejectBtn = document.getElementById('cookie-reject');

        acceptBtn.addEventListener('mouseenter', () => {
            acceptBtn.style.background = '#3a8eef';
        });
        acceptBtn.addEventListener('mouseleave', () => {
            acceptBtn.style.background = '#4a9eff';
        });

        rejectBtn.addEventListener('mouseenter', () => {
            rejectBtn.style.borderColor = '#999';
            rejectBtn.style.background = '#333';
        });
        rejectBtn.addEventListener('mouseleave', () => {
            rejectBtn.style.borderColor = '#666';
            rejectBtn.style.background = 'transparent';
        });

        // Handle accept
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            banner.remove();
            loadGoogleAnalytics();
        });

        // Handle reject
        rejectBtn.addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'rejected');
            banner.remove();
        });
    }

    // Initialize on page load
    if (hasConsent()) {
        // User has already accepted, load analytics
        loadGoogleAnalytics();
    } else if (!hasRejected()) {
        // User hasn't made a choice yet, show banner
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showConsentBanner);
        } else {
            showConsentBanner();
        }
    }
})();
