# Image Processing API
TypeScript + Express API that resizes JPG images using Sharp and caches generated thumbnails to disk.
## Quick start


1. Install deps: `npm install`
2. Put some `.jpg` images in the `images/` folder (e.g. `encenadaport.jpg`).
3. Dev server: `npm run dev` (nodemon + ts-node)
4. Build: `npm run build`
5. Start production server: `npm run start`
6. Test: `npm test` (builds then runs Jasmine)

## Endpoint example

GET `/api/images?filename=encenadaport&width=500&height=400`

- `filename` (required) — name of the image file (without extension) that exists in `images/`.
- `width` or `height` (at least one required) — dimensions in pixels.

## Notes
- Cached thumbnails are saved in `thumbs/`.
- Do not commit your original images to the repo unless you intend to share them.
- For production, add rate-limiting, authentication, and input validation limits.