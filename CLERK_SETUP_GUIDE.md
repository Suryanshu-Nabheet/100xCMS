# 🔐 Clerk Authentication Setup Guide

## Step 1: Create a New Clerk Application

1. **Go to Clerk Dashboard:**
   - Visit: https://dashboard.clerk.com
   - Sign up or log in to your account

2. **Create New Application:**
   - Click "Add application"
   - Choose "React" as your framework
   - Name your application: "ClassX CMS"
   - Select "Development" environment

3. **Get Your Keys:**
   - After creating the app, go to "API Keys" section
   - Copy the **Publishable Key** (starts with `pk_test_`)

## Step 2: Update Environment Variables

1. **Update your `.env` file:**
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_NEW_KEY_HERE
```

2. **Restart your development server:**
```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Step 3: Configure Clerk Settings

1. **In Clerk Dashboard, go to "Settings":**
   - **Allowed redirect URLs:** Add `http://localhost:3000`
   - **Sign-in URL:** `/sign-in`
   - **Sign-up URL:** `/sign-up`
   - **After sign-in URL:** `/dashboard`
   - **After sign-up URL:** `/dashboard`

2. **Enable Authentication Methods:**
   - Email/Password: ✅ Enabled
   - Google OAuth: ✅ Enabled (optional)
   - Apple OAuth: ✅ Enabled (optional)
   - Microsoft OAuth: ✅ Enabled (optional)

## Step 4: Test Authentication

1. **Open your application:** http://localhost:3000
2. **Check browser console** for any errors
3. **Try signing up** with a new email
4. **Try signing in** with existing credentials

## Step 5: Production Setup

1. **Create Production Application:**
   - In Clerk Dashboard, create a new "Production" application
   - Copy the production publishable key (starts with `pk_live_`)

2. **Update `.env.production`:**
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_PRODUCTION_KEY_HERE
```

3. **Deploy with environment variables:**
   - Set `VITE_CLERK_PUBLISHABLE_KEY` in your hosting platform
   - Update redirect URLs to your production domain

## Troubleshooting

### Common Issues:

1. **"Missing Clerk Configuration"**
   - Check if `.env` file exists in project root
   - Verify `VITE_CLERK_PUBLISHABLE_KEY` is set
   - Restart development server

2. **"Authentication Error"**
   - Verify Clerk keys are valid and active
   - Check Clerk Dashboard for application status
   - Ensure redirect URLs are configured

3. **Sign-in/Sign-up not working**
   - Check browser console for errors
   - Verify email verification is enabled
   - Test with different email addresses

### Debug Steps:

1. **Check browser console** for error messages
2. **Verify environment variables** are loading
3. **Test with fresh Clerk application**
4. **Check network tab** for failed requests

## Quick Test Commands:

```bash
# Check if .env file exists
ls -la .env

# Check environment variable
echo $VITE_CLERK_PUBLISHABLE_KEY

# Restart development server
npm run dev
```

---

**Need Help?**
- Check Clerk Documentation: https://clerk.com/docs
- Contact Clerk Support: https://clerk.com/support
- Review error messages in browser console
