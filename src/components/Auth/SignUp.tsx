import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { Eye, EyeOff, X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import './auth.css';

interface SignUpProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

export function SignUp({ isOpen, onClose, onSwitchToSignIn }: SignUpProps) {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    setError(null);

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: unknown) {
      const errorMessage = (err as { errors?: Array<{ message: string }> })?.errors?.[0]?.message || 'An error occurred during sign up';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    setError(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        onClose();
        // Reset form
        setEmailAddress('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setCode('');
        setPendingVerification(false);
      } else {
        console.error('Verification incomplete:', completeSignUp);
        setError('Verification incomplete. Please try again.');
      }
    } catch (err: unknown) {
      const errorMessage = (err as { errors?: Array<{ message: string }> })?.errors?.[0]?.message || 'Invalid verification code';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (strategy: 'oauth_google' | 'oauth_apple' | 'oauth_microsoft') => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/',
        redirectUrlComplete: '/',
      });
    } catch (err: unknown) {
      const errorMessage = (err as { errors?: Array<{ message: string }> })?.errors?.[0]?.message || 'Social sign up failed';
      setError(errorMessage);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setError(null);
    } catch (err: unknown) {
      const errorMessage = (err as { errors?: Array<{ message: string }> })?.errors?.[0]?.message || 'Failed to resend code';
      setError(errorMessage);
    }
  };

  // Verification Code Form
  if (pendingVerification) {
    return (
      <div className="auth-modal auth-fade-in">
        <div className="auth-modal-backdrop" onClick={onClose}></div>
        
        <div className="auth-modal-content auth-slide-up">
          <button
            onClick={onClose}
            className="auth-close"
            aria-label="Close verification modal"
          >
            <X className="auth-close-icon" />
          </button>

          <div className="auth-header">
            <h2 className="auth-title">Verify Your Email</h2>
            <p className="auth-subtitle">
              We've sent a verification code to <strong>{emailAddress}</strong>
            </p>
          </div>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="auth-form">
            <div className="auth-field-group">
              <label htmlFor="verification-code" className="auth-label">
                Verification Code
              </label>
              <input
                id="verification-code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="auth-input auth-code-input"
                placeholder="123456"
                required
                autoComplete="one-time-code"
                disabled={isLoading}
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              className={`auth-button ${isLoading ? 'auth-button-loading' : ''}`}
              disabled={isLoading || !isLoaded || code.length !== 6}
            >
              {isLoading ? (
                <>
                  <div className="auth-spinner"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <ArrowRight className="auth-social-icon" />
                  Verify Email
                </>
              )}
            </button>
          </form>

          <div className="auth-link-container">
            <p className="auth-link-text">
              Didn't receive the code?{' '}
              <button
                onClick={handleResendCode}
                className="auth-link"
                disabled={isLoading}
              >
                Resend code
              </button>
            </p>
            <p className="auth-link-text">
              Wrong email?{' '}
              <button
                onClick={() => setPendingVerification(false)}
                className="auth-link"
                disabled={isLoading}
              >
                Go back
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Sign Up Form
  return (
    <div className="auth-modal auth-fade-in">
      <div className="auth-modal-backdrop" onClick={onClose}></div>
      
      <div className="auth-modal-content auth-slide-up">
        <button
          onClick={onClose}
          className="auth-close"
          aria-label="Close sign up modal"
        >
          <X className="auth-close-icon" />
        </button>

        <div className="auth-header">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">
            Join ClassX and start your learning journey today
          </p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field-group">
            <div className="auth-field-row">
              <div className="auth-field-group" style={{ flex: 1 }}>
                <label htmlFor="signup-firstname" className="auth-label">
                  First Name
                </label>
                <div className="auth-password-container">
                  <input
                    id="signup-firstname"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="auth-input"
                    placeholder="John"
                    required
                    autoComplete="given-name"
                    disabled={isLoading}
                  />
                  <User className="auth-password-toggle" />
                </div>
              </div>
              <div className="auth-field-group" style={{ flex: 1 }}>
                <label htmlFor="signup-lastname" className="auth-label">
                  Last Name
                </label>
                <div className="auth-password-container">
                  <input
                    id="signup-lastname"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="auth-input"
                    placeholder="Doe"
                    required
                    autoComplete="family-name"
                    disabled={isLoading}
                  />
                  <User className="auth-password-toggle" />
                </div>
              </div>
            </div>
          </div>

          <div className="auth-field-group">
            <label htmlFor="signup-email" className="auth-label">
              Email Address
            </label>
            <div className="auth-password-container">
              <input
                id="signup-email"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="auth-input"
                placeholder="john.doe@example.com"
                required
                autoComplete="email"
                disabled={isLoading}
              />
              <Mail className="auth-password-toggle" />
            </div>
          </div>

          <div className="auth-field-group">
            <label htmlFor="signup-password" className="auth-label">
              Password
            </label>
            <div className="auth-password-container">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                placeholder="Create a strong password"
                required
                autoComplete="new-password"
                disabled={isLoading}
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-password-toggle"
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="auth-social-icon" /> : <Eye className="auth-social-icon" />}
              </button>
            </div>
          </div>

          <div className="auth-field-group">
            <p className="auth-terms">
              By creating an account, you agree to our{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </p>
          </div>

          <button
            type="submit"
            className={`auth-button ${isLoading ? 'auth-button-loading' : ''}`}
            disabled={isLoading || !isLoaded}
          >
            {isLoading ? (
              <>
                <div className="auth-spinner"></div>
                Creating account...
              </>
            ) : (
              <>
                <Lock className="auth-social-icon" />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="auth-social-container">
          <div className="auth-divider">
            <div className="auth-divider-line"></div>
            <span className="auth-divider-text">or continue with</span>
            <div className="auth-divider-line"></div>
          </div>

          <button
            type="button"
            onClick={() => handleSocialSignUp('oauth_google')}
            className="auth-social-button"
            disabled={isLoading || !isLoaded}
          >
            <svg className="auth-social-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignUp('oauth_apple')}
            className="auth-social-button"
            disabled={isLoading || !isLoaded}
          >
            <svg className="auth-social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Apple
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignUp('oauth_microsoft')}
            className="auth-social-button"
            disabled={isLoading || !isLoaded}
          >
            <svg className="auth-social-icon" viewBox="0 0 24 24">
              <path fill="#F25022" d="M1 1h10v10H1z"/>
              <path fill="#00A4EF" d="M13 1h10v10H13z"/>
              <path fill="#7FBA00" d="M1 13h10v10H1z"/>
              <path fill="#FFB900" d="M13 13h10v10H13z"/>
            </svg>
            Microsoft
          </button>
        </div>

        <div className="auth-link-container">
          <p className="auth-link-text">
            Already have an account?{' '}
            <button
              onClick={onSwitchToSignIn}
              className="auth-link"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
