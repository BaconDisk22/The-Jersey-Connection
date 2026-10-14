# v1.1 — Own Map Integration (Stage 1)

The current Electron app loads https://meshmap.net/ by default. This change introduces an **opt-in local development mode** for a future self-hosted Jersey map.

## Try local mode

Start a compatible map server on `127.0.0.1:8765` that serves the map page and required APIs (including `/nodes.json`). Then launch Electron from the `macos` directory with:

```sh
JERSEY_MAP_MODE=local npm start
```

Without that environment variable the app continues to use the upstream hosted site. This change **does not** bundle or start a server, proxy the upstream map, or implement a self-hosted map backend. The next stage is to package the fork's `website/` assets and provide a documented data source for `/nodes.json` with privacy controls.

## Acceptance criteria

- Default mode opens upstream hosted map unchanged.
- Local mode only allows `http://127.0.0.1:8765/` and upstream `https://meshmap.net/` inside the Electron window.
- External links open in the system browser.
- A missing local server produces an offline window state, not a claim that a working local map exists.
- Verify CI and an actual Intel Mac installation before releasing.
