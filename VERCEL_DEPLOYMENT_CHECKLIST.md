# Vercel Deployment Checklist for intern3.chat

## Prerequisites ✅
- [x] Vercel account
- [x] GitHub repository with your code  
- [x] Convex account (for backend services)
- [x] PostgreSQL database (Neon) - `DATABASE_URL` configured
- [x] Cloudflare R2 storage - configured

## Step 1: Convex Backend Setup

### 1.1 Authenticate with Convex
```bash
bunx convex login
```

### 1.2 Deploy to Production
```bash
bunx convex deploy --prod
```
This will give you a production Convex URL to use in your environment variables.

## Step 2: Environment Variables Configuration

### Required for Vercel (add these to your Vercel project settings):

#### Core Application
```bash
# Authentication
BETTER_AUTH_SECRET="<generate with: bunx uuid>"
ENCRYPTION_KEY="7bcdb4607341041661e7902afd91aba898312fa78982477cafb825daa5f9eee6"

# Database  
DATABASE_URL="postgres://neondb_owner:npg_hyr2SJcRV0bf@ep-dark-wave-adp9arxb-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Convex (use production URLs)
VITE_CONVEX_URL="https://your-production-convex.convex.cloud"
VITE_CONVEX_API_URL="https://your-production-convex.convex.cloud/http"
CONVEX_DEPLOYMENT="your-production-deployment-name"

# Better Auth URL (your production domain)
VITE_BETTER_AUTH_URL="https://your-app.vercel.app"
```

#### File Storage (Cloudflare R2)
```bash
R2_BUCKET="pete"
R2_ACCESS_KEY_ID="ba8fd0dc7ebe3798cf56d019e428f8e3"
R2_SECRET_ACCESS_KEY="3c1bfa72740193082a0b248bd34ca67e6fcbc5789d4a9be10fd0976a107ca843"
R2_ENDPOINT="https://716af63dea680a0f662d1eda818eece7.r2.cloudflarestorage.com"
R2_FORCE_PATH_STYLE="true"
```

#### Email Service
```bash
EMAIL_PROVIDER="resend"
EMAIL_FROM="noreply@yourdomain.com"
RESEND_API_KEY="re_U6aVaGLT_6Ma7Toi8SFcZRyB31vSqPwVN"
```

#### AI Models
```bash
OPENROUTER_API_KEY="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"
```

#### Analytics (Optional)
```bash
VITE_POSTHOG_HOST="https://app.posthog.com"
VITE_POSTHOG_KEY="ph-dev-placeholder"  # Replace with your actual key
```

### OAuth Providers (Optional - add the ones you want):

#### Google OAuth
```bash
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

#### GitHub OAuth  
```bash
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
```

#### Twitch OAuth
```bash
TWITCH_CLIENT_ID="your_twitch_client_id"
TWITCH_CLIENT_SECRET="your_twitch_client_secret"
```

## Step 3: Convex Environment Variables

Add these to your Convex dashboard (NOT Vercel):

```bash
# AI Models
OPENAI_API_KEY="sk-meow-****"
GOOGLE_GENERATIVE_AI_API_KEY="AI***"

# File Storage
R2_FORCE_PATH_STYLE="true"
R2_BUCKET="pete"
R2_ENDPOINT="https://716af63dea680a0f662d1eda818eece7.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="ba8fd0dc7ebe3798cf56d019e428f8e3"
R2_SECRET_ACCESS_KEY="3c1bfa72740193082a0b248bd34ca67e6fcbc5789d4a9be10fd0976a107ca843"

# Authentication
VITE_BETTER_AUTH_URL="https://your-app.vercel.app"
UPSTASH_REDIS_REST_URL="<upstash instance>"
UPSTASH_REDIS_REST_TOKEN="<upstash key>"
ENCRYPTION_KEY="7bcdb4607341041661e7902afd91aba898312fa78982477cafb825daa5f9eee6"
```

## Step 4: Deploy to Vercel

### 4.1 Connect Repository
1. Go to Vercel dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Select "intern3-chat" project

### 4.2 Configure Build Settings
- **Framework Preset**: Vite
- **Build Command**: `bun run build`
- **Output Directory**: `dist`
- **Install Command**: `bun install`

### 4.3 Add Environment Variables
Go to your Vercel project settings → Environment Variables and add all the variables listed above.

### 4.4 Deploy
Click "Deploy" - Vercel will build and deploy your application.

## Step 5: Post-Deployment Setup

### 5.1 Update Convex Environment Variables
Once deployed, update these in your Convex dashboard:
```bash
VITE_BETTER_AUTH_URL="https://your-actual-vercel-url.vercel.app"
```

### 5.2 Run Database Migrations
If migrations fail locally, you can run them directly on your production database:
```bash
# Set your production DATABASE_URL
export DATABASE_URL="your_production_database_url"
bun auth:migrate
```

### 5.3 Configure OAuth Redirect URIs
For each OAuth provider, add your production URL to their allowed redirect URIs:
- Google: `https://your-app.vercel.app/api/auth/callback/google`
- GitHub: `https://your-app.vercel.app/api/auth/callback/github`

## Step 6: Test Your Deployment

1. Visit your deployed URL
2. Test authentication with your configured OAuth providers
3. Test file uploads (should use your R2 storage)
4. Test AI chat functionality
5. Verify email sending works

## Troubleshooting

### Common Issues:

1. **Convex Connection Issues**: Ensure your production Convex URL is correct
2. **Authentication Issues**: Check that `VITE_BETTER_AUTH_URL` matches your actual domain
3. **File Upload Issues**: Verify R2 credentials and bucket configuration
4. **Database Issues**: Ensure DATABASE_URL is correct and accessible from Vercel
5. **Migration Issues**: May need to reset database or manually run migrations

### Useful Commands:
```bash
# Generate new UUID for secrets
bunx uuid

# Check Convex deployment status
bunx convex status

# Test database connection
bun drizzle-kit introspect
```

## Security Notes

- Never commit `.env` files to version control
- Use Vercel's environment variable encryption
- Rotate API keys regularly
- Use different keys for development and production
- Enable 2FA on all service accounts (Vercel, Convex, etc.) 