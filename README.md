This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Homepage editor

Open **`/admin`** to manage the homepage. Authentication is intentionally deferred;
this panel and its write APIs are currently accessible without signing in.

### Local setup

Use Node 22.12+ and pnpm:

```sh
pnpm install
pnpm db:setup
pnpm dev
```

Prisma uses SQLite at `data/site.db` by default. Uploads live at `data/uploads`.
Both are ignored by Git and persist across browser refreshes and server restarts.
The database is created by the checked-in migration; the first homepage request
creates the default settings. No manual seed is required.

- **Identity:** edit the main title, companion word and three subtitle words.
  The main title is required. Optional words have individual visibility switches,
  and “Show the main title only” hides all of them at once.
- **Carousel:** upload up to 20 JPG, PNG or WebP images (10 MB each), replace,
  remove, reorder, describe or adjust their horizontal/vertical crop position.
  An empty carousel displays `/home/images/project1.jpg` as its only slide.
- **Preview:** an isolated iframe renders the actual homepage with your in-memory
  edits at desktop or mobile dimensions. Links stay within preview; scrolling
  and carousel controls work. Draft messages are accepted only from its same-origin parent.
- **Save draft:** persists editing progress without changing the public site.
- **Publish changes:** atomically saves the draft and published settings in one
  Prisma transaction. New visits and refreshes of `/` read published data from
  the database. A revision check prevents an older editor tab overwriting a newer save.
- **Revert to published version:** loads the current published settings into the
  editor. Save the draft to retain that reset.

Uploaded files are decoded and re-encoded as WebP, with metadata stripped and a
maximum dimension of 4096px. SVG and animated images are not accepted. Removing
an image removes it from the carousel; original uploaded asset records/files are
retained so an unpublished edit cannot break an already published carousel.

### Code map

- `prisma/schema.prisma`: `HomeSettings` (draft/published JSON and revision) and
  `ImageAsset` (upload metadata); migrations are in `prisma/migrations`.
- `lib/home-store.ts`: Prisma reads and atomic draft/publish writes.
- `app/api/admin/home/route.ts`: GET settings, PUT draft, POST publish.
- `app/api/admin/uploads/route.ts`: validated image upload.
- `app/api/media/[id]/route.ts`: immutable, UUID-addressed image delivery.
- `app/admin`: editor, styles and real homepage preview.
- `app/page.tsx`: request-time published-data load; existing homepage behavior is
  in `app/home/Home.tsx`.

### Hosting and checks

`DATABASE_URL` and `UPLOAD_DIR` can override the local paths (see `.env.example`).
Back up the database and upload directory together. This setup requires a Node
server with persistent disk. Before using an ephemeral/serverless host, move
images to object storage and choose a hosted database/Prisma adapter; changing
`DATABASE_URL` alone does not switch the SQLite provider to PostgreSQL.
Add authentication and authorize all admin write routes before public launch.

```sh
pnpm test                 # Content validation and default/visibility behavior
pnpm exec tsc --noEmit
pnpm build
```

Prisma's SQLite adapter configuration follows the [Prisma SQLite documentation](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/sqlite).

### Development memory

`pnpm dev` uses Webpack. On this project's Next 16.2.6 setup, allocation sampling
found retained React development async-tracking objects coming from Turbopack's
server HMR subscription loop, growing even when no requests were being made.
The compiler switch avoids that observed path without changing the production
build, database, or live-preview behavior. Production builds still use Turbopack.
`next.config.ts` also keeps Prisma's SQLite adapter external so its native
database bindings load correctly under Webpack. Development compilation may
take longer with this compiler.

After changing the dev command, restart an existing dev server; changing the
package script cannot release memory already held by a running process.
See the [upstream report](https://github.com/vercel/next.js/issues/96140) for the
matching development-only async-tracking stack.
