# PayFlow Deployment Guide

This guide covers deploying PayFlow to production, primarily using Vercel, as well as best practices for maintaining a healthy production environment.

## 🚀 Vercel Deployment

### Overview

PayFlow is deployed on **Vercel**, a modern hosting platform optimized for Next.js and React applications. Vercel provides:

- Automatic deployments on push
- Preview deployments for PRs
- Global CDN
- Built-in analytics and monitoring
- Automatic HTTPS
- Serverless functions (if needed)

### Current Deployment Status

- **Live App:** https://pay-sparkle.vercel.app
- **Repository:** https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F
- **Automatic Deployments:** Enabled on main branch

---

## 📋 Prerequisites

Before deploying, ensure:

1. **GitHub Account** with repository access
2. **Vercel Account** (sign up at https://vercel.com)
3. **Project Owner or Admin Role** to configure deployment settings

---

## 🔧 First-Time Setup

### 1. Connect GitHub Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New... → Project"**
3. Select **"Import Git Repository"**
4. Search for `Dashboard-pay-sparkle-F`
5. Click **"Import"**

### 2. Configure Build Settings

When importing, Vercel will auto-detect:

| Setting | Value |
|---------|-------|
| **Framework** | Vite |
| **Root Directory** | `./` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm ci` |

These settings should be correct by default. If not, update them before deploying.

### 3. Set Environment Variables

If your app needs environment variables:

1. Go to **Project Settings → Environment Variables**
2. Add your variables:
   ```
   VITE_API_URL=https://api.example.com
   ```
3. Ensure variables are available in all environments (Production, Preview, Development)

### 4. Deploy

Once configured, click **"Deploy"** to start the first deployment.

---

## 🔄 Automatic Deployments

### Main Branch (Production)

Every push to `main` triggers:

1. ✅ **Build** – Runs `npm run build`
2. ✅ **Tests** – (Optional, if configured in CI/CD)
3. ✅ **Deploy** – Updates live app at pay-sparkle.vercel.app

**Deployment Flow:**
```
Git Push → GitHub → Webhook → Vercel Build → Production Deployment
```

### Pull Requests (Preview Deployments)

Every PR creates a **preview URL**:

- Preview link appears in PR comments
- Each push updates the preview
- Useful for testing before merging
- Preview is deleted when PR is closed

**Preview URL Format:**
```
https://dashboard-pay-sparkle-f-{pr-number}.vercel.app
```

---

## 📦 Build & Deployment Process

### Build Steps

1. **Install Dependencies**
   ```bash
   npm ci
   ```

2. **Run Linting** (if configured in CI)
   ```bash
   npm run lint
   ```

3. **Build Application**
   ```bash
   npm run build
   ```
   - Minifies code
   - Tree-shakes unused code
   - Optimizes bundle size
   - Output in `dist/` folder

4. **Upload to CDN**
   - Files uploaded to Vercel's global CDN
   - Available at `pay-sparkle.vercel.app`

### Build Cache

Vercel caches:
- `node_modules/` – Speeds up dependency installation
- Build artifacts – Reduces rebuild time
- Static assets – Cached on CDN

**Clear cache if experiencing issues:**
1. Go to **Project Settings → Advanced → Deployment Protection**
2. Click **"Redeploy"** or **"Rebuild Cache"**

---

## 🌍 Environment Variables

### Setting Variables

**Via Vercel Dashboard:**

1. Go to **Project Settings → Environment Variables**
2. Add variables with scope:
   - **Production** – Main branch deployments
   - **Preview** – PR preview deployments
   - **Development** – Local `vercel env pull` usage

**Example:**
```
VITE_API_URL=https://api.production.com
VITE_LOG_LEVEL=info
```

### Using Variables in Code

In Vite, access with `import.meta.env.*`:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
```

**Important:** Only variables prefixed with `VITE_` are exposed to client code.

### Local Development

Pull environment variables locally:

```bash
vercel env pull
```

This creates `.env.local` with production values (useful for testing).

---

## 📊 Monitoring & Analytics

### Vercel Dashboard

Monitor deployment health:

1. **Deployments Tab** – View deployment history and logs
2. **Analytics Tab** – Monitor performance, usage, errors
3. **Functions Tab** – API route performance (if using)
4. **Edge Network** – Request distribution and CDN cache hits

### Key Metrics

| Metric | What It Means |
|--------|---------------|
| **Response Time** | How fast pages load (should be <500ms) |
| **Error Rate** | % of failed requests (should be <1%) |
| **Web Vitals** | Core Web Vitals (LCP, FID, CLS) |
| **Bandwidth** | Total data transferred |

### Performance Optimization

**Tips:**
- Monitor bundle size in build logs
- Use code splitting to reduce initial load
- Enable image optimization
- Monitor Core Web Vitals

---

## 🔒 Security

### HTTPS

All Vercel deployments automatically include HTTPS with SSL certificates.

### Environment Secrets

**Never commit secrets to git:**

❌ **Bad:**
```typescript
const API_KEY = "sk-1234567890"; // In code
```

✅ **Good:**
```typescript
const API_KEY = import.meta.env.VITE_API_SECRET; // In env variables
```

### CORS & Headers

Configure custom headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

---

## 🚨 Troubleshooting

### Issue: Build Fails on Vercel

**Check:**
1. View build logs in Deployment tab
2. Ensure `npm run build` works locally: `npm run build`
3. Verify environment variables are set
4. Check Node.js version (should be 22.x)

**Solution:**
```bash
# Test build locally
npm ci
npm run build
npm run preview
```

### Issue: Site Shows Blank Page

**Check:**
1. Browser console for errors (F12)
2. Network tab for failed requests
3. Check if API endpoints are accessible

**Solution:**
1. Check environment variables (API URLs)
2. Verify CORS headers
3. Check browser console for errors

### Issue: Performance is Slow

**Check:**
1. Vercel Analytics for slow routes
2. Bundle size in build logs
3. Core Web Vitals in PageSpeed Insights

**Solutions:**
- Enable code splitting
- Optimize images
- Reduce bundle size
- Use CSS-in-JS efficiently

### Issue: Preview Deployment Fails

**Check:**
1. Same as main branch build failures
2. Verify PR branch is up-to-date with main
3. Check if CI checks are passing

**Solution:**
```bash
git pull origin main
git push origin feature-branch
```

---

## 📝 Deployment Checklist

Before deploying to production, verify:

- [ ] All tests pass locally: `npm run test`
- [ ] Linting passes: `npm run lint`
- [ ] Build works locally: `npm run build`
- [ ] Preview build looks correct: `npm run preview`
- [ ] Environment variables are set in Vercel
- [ ] No console errors in browser DevTools
- [ ] Core Web Vitals are acceptable
- [ ] All features work as expected
- [ ] Mobile responsiveness verified
- [ ] PR has been reviewed and approved
- [ ] Branch is up-to-date with main

---

## 🔄 Rollback

If a deployment causes issues:

**Immediate Rollback (via Vercel Dashboard):**

1. Go to **Deployments** tab
2. Find the last working deployment
3. Click **"..." → "Promote to Production"**

**Or via Git Revert:**

```bash
git revert HEAD
git push origin main
```

This creates a new commit that undoes the problematic changes.

---

## 📈 Scaling & Performance

### Caching Strategy

Vercel automatically caches:
- HTML files: 60 seconds (stale-while-revalidate)
- JavaScript/CSS: Versioned, cached indefinitely
- Images: Optimized and cached

**Control caching with headers:**

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache"
        }
      ]
    }
  ]
}
```

### Load Testing

For high-traffic events:
1. Notify Vercel support
2. Monitor real-time analytics
3. Check CDN performance
4. Verify error rates stay low

---

## 🤝 Team Collaboration

### Access Control

In **Project Settings → Members**:
- **Owner** – Full control
- **Admin** – Can deploy and manage settings
- **Developer** – Can view deployments
- **Viewer** – Read-only access

Invite team members with appropriate roles.

### Deployment Notifications

Enable notifications in **Project Settings → Git**:
- Successful deployments
- Failed deployments
- Errors and issues

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Vercel CLI Guide](https://vercel.com/docs/cli)
- [Environment Variables Best Practices](https://12factor.net/config)

---

## 🆘 Getting Help

**Issues with deployment?**

1. Check [Vercel Status Page](https://www.vercelstatus.com/)
2. Review [Vercel Documentation](https://vercel.com/docs)
3. Check build logs in Vercel dashboard
4. Open an issue on [GitHub](https://github.com/Mostafa-SAID7/Dashboard-pay-sparkle-F/issues)
5. Contact Vercel support (for Pro plans)

---

## 🎯 Next Steps

- Review [Development Guide](./development.md) to set up local environment
- Check [Architecture Guide](./architecture.md) to understand the app
- Read [Contributing Guide](./contributing.md) to contribute changes

---

**Happy deploying! 🚀**

Last Updated: September 2024
