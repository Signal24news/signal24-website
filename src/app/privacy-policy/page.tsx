import type { Metadata } from 'next';
import { PolicyPage } from '@/components/PolicyPage';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What information Signal 24 collects, how we use it, and the choices you have.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy explains what information we collect when you use signal24.info, why we collect it and what choices you have. We try to collect as little as possible."
      updated="29 September 2026"
      current="/privacy-policy"
    >
      <h2>Who we are</h2>
      <p>
        Signal 24 (&quot;we&quot;, &quot;us&quot;) is an independent digital news platform
        available at signal24.info. If you have any questions about this policy or your data,
        email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>Information we collect</h2>
      <h3>When you read the site</h3>
      <p>
        Like almost every website, our hosting provider automatically records basic technical
        information when you visit, such as your IP address, browser type, the pages you view and
        the time of your visit. We use this to keep the site running, secure and fast.
      </p>

      <h3>When you subscribe to our newsletter</h3>
      <p>
        If you sign up for our newsletter, we collect your email address. Our newsletter is sent
        through Beehiiv, which stores your email address on our behalf and may record whether you
        open our emails or click links in them. You can unsubscribe at any time using the link at
        the bottom of every email.
      </p>

      <h3>When you contact us</h3>
      <p>
        If you email us, we keep your message and email address so we can reply and follow up. We
        do not add you to any mailing list unless you ask us to.
      </p>

      <h3>Stored on your device</h3>
      <p>
        We store a few small settings in your browser, such as your light or dark theme choice and
        whether you have already seen our newsletter pop-up. This information stays on your device
        and is not sent to us.
      </p>

      <h2 id="advertising">Advertising and cookies</h2>
      <p>
        We use or may use Google AdSense to show advertising on Signal 24. Google and its partners
        use cookies to show ads based on your previous visits to this and other websites.
      </p>
      <ul>
        <li>
          Google&apos;s use of advertising cookies allows it and its partners to serve ads to you
          based on your visits to our site and other sites on the internet.
        </li>
        <li>
          You can opt out of personalised advertising by visiting{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          , or opt out of some third-party vendors&apos; use of cookies at{' '}
          <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">
            aboutads.info
          </a>
          .
        </li>
        <li>
          You can learn more about how Google uses data at{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Google uses information from sites that use its services
          </a>
          .
        </li>
      </ul>
      <p>
        Visitors from the European Economic Area, the United Kingdom and Switzerland will be asked
        for consent before advertising cookies are used, and can change their choice at any time.
      </p>
      <p>
        We may also use analytics tools to understand which stories people read, so we can improve
        our coverage. These tools look at overall trends, not at you as an individual.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To run, secure and improve the website.</li>
        <li>To send the newsletter if you signed up for it.</li>
        <li>To reply to your messages, tips and correction requests.</li>
        <li>To show advertising that helps pay for our journalism.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Sharing your information</h2>
      <p>
        We only share information with the services we use to run Signal 24, such as our hosting
        provider, our newsletter provider and advertising partners like Google, and only as needed
        for them to provide their service. We may also share information if the law requires it.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep newsletter subscriptions until you unsubscribe, and emails for as long as we need
        them to deal with your request. Technical logs are kept for a limited time by our hosting
        provider.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to see the personal information we hold
        about you, to correct it, to ask us to delete it, or to object to how we use it. To make a
        request, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>Children</h2>
      <p>
        Signal 24 is a general news website and is not aimed at children under 13. We do not
        knowingly collect personal information from children.
      </p>

      <h2>Links to other websites</h2>
      <p>
        Our stories often link to other websites. We are not responsible for how those websites
        handle your information, so please read their privacy policies.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we will update the date at the top of this page. For important
        changes, we will make it clear on the site.
      </p>
    </PolicyPage>
  );
}
