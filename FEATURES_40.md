# The Family — 40 Feature Delivery Tracker

The desktop app currently loads the **upstream hosted map** at meshmap.net. Editing `website/` changes the fork's self-hosted site, **not** the upstream hosted site. Do not mark web/backend features shipped in the desktop app until an independently hosted deployment or native data integration is ready.

Status key: **Implemented (unverified)** means code is committed but CI and Intel Mac user testing have not passed; **Planned** means not implemented.

| # | Feature | Status | Notes |
|---|---|---|---|
| 1 | Favorite nodes | Implemented (unverified) | Mac menu bookmarks current node URL |
| 2 | Advanced node search | Planned | Requires map/data integration |
| 3 | Node history | Planned | Persistent backend |
| 4 | Node status | Planned | Define freshness semantics |
| 5 | Network dashboard | Planned | Live data integration |
| 6 | Node alerts | Planned | Distinct from generic app notifications |
| 7 | Map layers | Planned | Map provider licenses |
| 8 | Signal information | Planned | Only when reported |
| 9 | Node information panel | Existing upstream capability | Not newly implemented |
| 10 | Auto refresh | Existing upstream capability | Not newly implemented |
| 11 | Network topology | Existing upstream capability | Observed links only |
| 12 | Activity timeline | Planned | History required |
| 13 | Health dashboard | Planned | Observational limitations |
| 14 | Regional statistics | Planned | Region definitions |
| 15 | Coverage visualization | Planned | Estimate, not RF proof |
| 16 | Node filtering | Planned | Browser data source |
| 17 | Network growth | Planned | Historical snapshots |
| 18 | Offline map cache | Planned | Provider permissions |
| 19 | Data export | Planned | Privacy review |
| 20 | Multiple saved map views | Implemented (unverified) | Saved locally on Mac |
| 21 | Native notifications | Implemented (unverified) | Opt-in application events |
| 22 | Menu bar widget | Planned | Separate tray integration |
| 23 | Launch at login | Implemented (unverified) | Mac preference |
| 24 | Automatic updates | Planned | Signed distribution strategy |
| 25 | Keyboard shortcuts | Implemented (unverified) | Cmd+D, Cmd+N, Cmd+R, Cmd+Shift+S |
| 26 | Multiple windows | Implemented (unverified) | Separate hosted map windows |
| 27 | Saved preferences | Implemented (unverified) | Local JSON |
| 28 | System theme detection | Implemented (unverified) | Native shell only; hosted website controls its own theme |
| 29 | Connection indicator | Implemented (unverified) | Window title reflects page load status |
| 30 | Crash recovery | Implemented (unverified) | Renderer reload and last URL |
| 31 | The Family | Implemented (unverified) | Favorites menu |
| 32 | Who's This Guy? | Planned | Branded detail pane |
| 33 | The Parkway | Implemented (unverified) | Navigation menu; topology is upstream |
| 34 | Tony's Office | Implemented (unverified) | Basic settings dialog |
| 35 | The Neighborhood | Implemented (unverified) | Saved map view menu, not proximity calculation |
| 36 | Fuggedaboutit Alerts | Implemented (unverified) | Opt-in app events, not node alerts |
| 37 | The Family Business | Planned | Statistics dashboard |
| 38 | What Exit?! | Planned | Geographic search |
| 39 | Gabagool Gauge | Planned | Activity metrics |
| 40 | The Shore Report | Planned | Regional report |

## Acceptance requirements
- Run GitHub Actions Intel macOS build; verify DMG and ZIP artifacts.
- Open the packaged app on an Intel Mac running Tahoe and test favorites, saved views, keyboard shortcuts, login setting, notifications, multiple windows, and recovery.
- Confirm that app preferences persist across relaunch.
- Test external navigation restrictions and user privacy.
- Do not advertise unimplemented map/backend capabilities as shipped.
