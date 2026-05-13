/**
 * NewsletterSignup — Section Organism
 * Ken Bold DS v4.2
 *
 * WHAT:    Dark card with email input for newsletter subscription
 * WHY:     Email capture — converts visitors into recurring subscribers
 * WHERE:   Report Store home mode — optional section (after UpcomingReports)
 * WHEN:    Renders when viewMode === "home"
 * HOW:     Composes Button + InlineLink + editorial serif heading on dark background
 *
 * Data coupling: none
 * Props: none (self-contained with internal state)
 */
import { Mail, Star } from "lucide-react";
import { useState } from "react";
import { iconColors } from "./iconColors";
import { Button } from "./Button";
import { InlineLink } from "./InlineLink";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <div>
      <div className="bg-black p-8 md:p-12 relative overflow-hidden" style={{ borderRadius: 'var(--rc-radius-card)' }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px]" style={{ background: 'rgba(128, 108, 224, 0.04)' }} />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mx-auto mb-5" style={{ borderRadius: 'var(--rc-radius-card)' }}>
            <Mail className="h-5 w-5" color={iconColors.content} />
          </div>
          <h2 className="text-white mb-2 leading-[1.15] tracking-tight" style={{ fontFamily: 'var(--font-serif)', fontWeight: 'var(--font-weight-light)' as any, fontSize: 'clamp(1.25rem, 3.5vw, var(--text-2xl))' }}>Stay Ahead of the Market</h2>
          <p className="text-white/50 max-w-md mx-auto mb-8 leading-[1.7]" style={{ fontSize: 'var(--text-sm)' }}>Get weekly market intelligence briefings, new report alerts, and exclusive analyst insights delivered to your inbox.</p>
          {subscribed ? (
            <div className="py-3 px-6 inline-flex items-center gap-2 text-white" style={{ fontSize: 'var(--text-nav)', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-element)' }}>
              <Star className="h-4 w-4" /> Successfully subscribed. Check your inbox.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your business email"
                aria-label="Business email address for newsletter subscription"
                className="flex-1 px-4 py-3 bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all"
                style={{ fontSize: 'var(--text-nav)', borderRadius: 'var(--radius-element)' }}
              />
              <Button
                variant="brand"
                size="md"
                background="dark"
                onClick={() => { if (email.includes("@")) setSubscribed(true); }}
              >
                Subscribe
              </Button>
            </div>
          )}
          <p className="text-white/20 mt-4" style={{ fontSize: 'var(--text-xs)' }}>No spam. <InlineLink onDark>Unsubscribe</InlineLink> anytime. Join 50,000+ subscribers.</p>
        </div>
      </div>
    </div>
  );
}
