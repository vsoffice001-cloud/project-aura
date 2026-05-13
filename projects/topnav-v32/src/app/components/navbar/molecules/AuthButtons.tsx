/**
 * AuthButtons — Desktop logged-out Sign in + Sign up pair
 *
 * WHY:   The secondary bar's right side shows two auth buttons when logged out.
 *        They share a visual relationship (text link + outlined button) and
 *        should always appear/disappear together.
 * WHAT:  Two buttons side by side:
 *        - Sign in: text link with login icon, 12px helper text
 *        - Sign up: outlined button with person+ icon, border inverts on hover
 * WHEN:  Visible only when `!isAuthenticated` on desktop secondary bar.
 * WHERE: SecondaryBar organism (right side, desktop only).
 * HOW:   <AuthButtons onSignIn={() => navigate('/auth?mode=signin')}
 *          onSignUp={() => navigate('/auth?mode=signup')} />
 *
 * Props:
 *   onSignIn — Navigate to sign-in page
 *   onSignUp — Navigate to sign-up page
 */

interface AuthButtonsProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export function AuthButtons({ onSignIn, onSignUp }: AuthButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Sign in — text link */}
      <button
        type="button"
        onClick={onSignIn}
        className="
          flex items-center gap-1
          font-nav font-normal
          text-[#656565] hover:text-[#b01f24]
          transition-colors bg-transparent border-none cursor-pointer
        "
        style={{
          fontSize: 'var(--nav-helper-text)',
          lineHeight: 'var(--nav-lh-helper)',
        }}
      >
        <svg className="size-[12px]" fill="none" viewBox="0 0 12 12" stroke="currentColor" aria-hidden="true">
          <path
            d="M6.5 1.5H2.5C2.22386 1.5 2 1.72386 2 2V10C2 10.2761 2.22386 10.5 2.5 10.5H6.5M8 8.5L10.5 6M10.5 6L8 3.5M10.5 6H5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Sign in
      </button>

      {/* Sign up — outlined button */}
      <button
        type="button"
        onClick={onSignUp}
        className="
          flex items-center gap-1.5
          border border-[#141016] px-3 py-1.5 rounded-[5px]
          font-nav font-medium
          text-[#141016]
          hover:bg-[#141016] hover:text-white
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-[rgba(20,16,22,0.5)] focus-visible:ring-offset-2
        "
        style={{
          fontSize: 'var(--nav-helper-text)',
          lineHeight: 'var(--nav-lh-helper)',
        }}
      >
        <svg className="size-[12px]" fill="none" viewBox="0 0 12 12" stroke="currentColor" aria-hidden="true">
          <path
            d="M6 5.5C6.82843 5.5 7.5 4.82843 7.5 4C7.5 3.17157 6.82843 2.5 6 2.5C5.17157 2.5 4.5 3.17157 4.5 4C4.5 4.82843 5.17157 5.5 6 5.5Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 9.5C3 8.17 4.34 7 6 7C7.66 7 9 8.17 9 9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Sign up
      </button>
    </div>
  );
}