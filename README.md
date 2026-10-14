# 🤌 THE JERSEY CONNECTION 🇺🇸
### *Fuggedaboutit. We know where your nodes are.*

**AYYY, HOW YA DOIN', PAISAN?** Welcome to **The Jersey Connection** — a New Jersey-flavored Meshtastic map project. Whether you're stuck on the Turnpike, debating pork roll versus Taylor Ham, or heading down the Shore, here's a way to see who's on the mesh. **What exit you from?**

> **The Family Territory:** The map is nationwide, not just New Jersey. The jokes are Jersey; the radio data is real.

## 📸 The Jersey Connection — Demo Screenshots

The images below are **automatically generated from fictional demonstration data** by GitHub Actions. They are not live Meshtastic nodes or actual GPS positions. The screenshot workflow commits updated PNGs to `screenshots/` on successful runs against `main`.

### Desktop demo

![The Jersey Connection desktop demo — simulated data](screenshots/jersey-demo-desktop.png)

### Mobile-sized preview

![The Jersey Connection mobile-sized demo — simulated data](screenshots/jersey-demo-mobile.png)

## 🍕 What's cookin'?
- **The Family Map:** Explore position-reporting Meshtastic nodes observed through the public MQTT network.
- **Who's This Guy?:** Find a node by name or ID.
- **Fresh Gabagool:** The upstream map updates node data approximately once a minute.
- **Fuggedaboutit:** Nodes without updated positions for eight hours are removed from the upstream map.
- **Who's Talkin' to Who?:** Inspect observed LoRa relationships and neighbor links. Lines do **not** necessarily indicate direct radio connections.
- **The Parkway:** Network connections, with no toll booths.

## 🎨 Garden State colors
The planned Jersey theme uses these colors:

| Jersey flavor | Color |
| --- | --- |
| Garden State green | `#24834B` |
| Turnpike asphalt | `#20252B` |
| Jersey blue | `#003B71` |
| Jersey gold | `#FFCA28` |
| Shore sand | `#F3E8CF` |
| Taylor Ham red | `#C83737` |

These are branding targets, not a claim that every screen has already been restyled.

## 🚗 Intel Mac? AYYY, WE GOTCHU.
**Target:** Intel (x86_64) Mac running macOS Tahoe 26.7.1, with a double-clickable **The Jersey Connection.app** and a downloadable DMG.

**Chosen approach:** A desktop window connecting to the existing online [MeshMap.net](https://meshmap.net/) service. No local map backend or offline node database is planned for this edition.

**Current status:** The Intel desktop application, DMG, and automated release workflow have **not yet been verified or published**. A working installer is not available from this README. Future builds should be validated before appearing in [Releases](https://github.com/BaconDisk22/The-Jersey-Connection/releases).

## 📡 How do I get my node in the family?
Your node must report position data to Meshtastic's public MQTT system, either directly or through another reporting node. Read the [official Meshtastic MQTT documentation](https://meshtastic.org/docs/software/integrations/mqtt/) and the public-server restrictions. Think carefully about location privacy before sharing position information.

## 🛠️ For the wiseguys running their own setup
This fork retains the upstream Go ingestion service and website architecture. The original source includes `cmd/meshobserv/`, `internal/`, `website/`, and `Dockerfile.meshobserv`. The map requires a functioning `/nodes.json` data endpoint when independently hosted. A new coat of Jersey paint doesn't magically deploy the backend, capisce?

## 📦 Releases & packages
The planned first release is **v1.0.0-beta.1**, prioritizing an Intel Mac DMG and zipped app. Release artifacts will be listed in [GitHub Releases](https://github.com/BaconDisk22/The-Jersey-Connection/releases) **only after successful builds**. Signing and notarization may be needed for a smooth macOS installation.

## 🤝 Respect the family
**The Jersey Connection** is an independent, unofficial themed fork of [MeshMap.net by Brian Shea](https://github.com/brianshea2/meshmap.net). Credit belongs to the original maintainers and Meshtastic contributors; original licensing and copyright notices must be preserved. This project is not an official Meshtastic application and is not affiliated with any television show or commercial brand.

Built with love, radio waves, and enough Jersey attitude to fill the Parkway. **Now pass the disco fries.** 🍟
