# Researcify Academic Studio

Next.js application for **Researcify Academic Studio — Where Ideas Become Impact.**

## Live links

- **Frontend:** https://researcify-academic-studio.vercel.app
- **Backend base:** https://researcify-academic-studio.vercel.app/api
- **Inquiry API:** https://researcify-academic-studio.vercel.app/api/inquiries
- **GitHub:** https://github.com/sifat-oss/researcify-academic-studio

## Backend included

- Supabase server and admin clients with cookie-based session refresh.
- Validated inquiry persistence through `POST /api/inquiries`.
- Supabase Auth signup, login and logout endpoints.
- Client inquiry, quotation and message APIs.
- Staff-only inquiry listing/status updates and quotation creation.
- Activity logging for administrative changes.
- PostgreSQL schema for profiles, roles, inquiries, projects, private files, quotations, messaging, notifications, blog CMS, FAQs and website settings.
- Row Level Security policies for client isolation and staff permissions.
- Private Supabase Storage bucket and ownership/staff access policies.

## Configuration

```bash
npm install
copy .env.example .env.local
```

Set these values in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose it to the browser)

Optional integrations:

- `RESEND_API_KEY`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in the SQL editor.
3. Configure Auth email templates and redirect URLs for the deployed domain.
4. Confirm the `private-project-files` bucket is private.
5. Create the first account through `/api/auth/signup`, then promote its `user_roles.role` to `admin` in Supabase for dashboard/API access.

The schema includes user-creation triggers, indexes, client isolation policies, staff policies and private storage policies. Apply it in a development project first and review any existing custom policies before production migration.

## API summary

- `POST /api/inquiries` — public inquiry creation with server validation.
- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout` — authentication.
- `GET /api/me/inquiries` — authenticated client inquiries.
- `GET|POST /api/me/messages` — authenticated messaging.
- `GET|PATCH /api/me/quotations` — authenticated quotation review.
- `GET|PATCH /api/admin/inquiries` — staff inquiry management.
- `POST /api/admin/quotations` — staff quotation creation.

## Validation

```bash
npm run lint
npm run build
```

The application returns explicit `503` configuration errors until Supabase credentials are provided; it does not pretend data was saved.
