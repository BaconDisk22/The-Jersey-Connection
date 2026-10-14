# 🤌 WHAT EXIT?! MESH
### *Fuggedaboutit. We know where your nodes are.*

**AYYY, HOW YA DOIN'?** Welcome to the Garden State's favorite way to keep tabs on Meshtastic nodes. Whether you're stuck on the Turnpike, grabbing a pork roll (or Taylor ham—don't start), or down the Shore, **WHAT EXIT?! MESH** puts the mesh on the map.

> **"What exit?"** The most important question in Jersey. Now it's also how you find your mesh.

## 🍕 What's cookin'?
- **The Family Map:** Browse position-reporting Meshtastic nodes seen through the public MQTT network.
- **Who's This Guy?** Search nodes by name or ID.
- **Fresh Gabagool:** Node data is updated approximately once a minute by the upstream service.
- **No Ghosts at the Diner:** Nodes without an updated position for eight hours are removed from the map.
- **Who's Talkin' to Who?** Explore observed LoRa relationships and neighbor links. These do not always indicate direct connections.
- **Jersey Threads:** Garden State green, gold and Turnpike-dark styling.

## 🚗 Intel Mac? AYYY, WE GOTCHU.
A macOS desktop wrapper and an Intel DMG build workflow live in `macos/` and `.github/workflows/macos-intel.yml`.

**Heads up, paisan:** The desktop wrapper currently loads the upstream hosted map until a WHAT EXIT?! MESH deployment URL is configured. It is **not yet a self-contained offline map**. The Mac DMG is a development build and is not yet confirmed tested or notarized.

To build on GitHub, run **Actions → Build WHAT EXIT?! MESH for Intel Mac → Run workflow** once this workflow is on the default branch. Download the resulting artifact if the build succeeds.

## 📡 How do I get my node in the family?
Your node needs to report position data through the Meshtastic public MQTT system (directly or via another MQTT-connected node). Follow the [official Meshtastic MQTT documentation](https://meshtastic.org/docs/software/integrations/mqtt/) and its public-server restrictions. Keep location privacy in mind—don't broadcast precise coordinates if you don't intend to.

## 🛠️ For the wiseguys running their own setup
This fork keeps the upstream Go ingestion service and website architecture. See `cmd/meshobserv/`, `internal/`, `website/`, and `Dockerfile.meshobserv` for the original components. The map expects a working `/nodes.json` endpoint. Branding alone does not deploy a live feed.

## 🤝 Respect the family
**WHAT EXIT?! MESH** is a Jersey-themed fork of [MeshMap.net by Brian Shea](https://github.com/brianshea2/meshmap.net). Full credit to the original project and Meshtastic contributors. This fork is independent and is **not an official Meshtastic application**. Original license and copyright notices remain in place.

Built with love, radio waves, and enough Jersey attitude to fill the Parkway. **Now pass the disco fries.** 🍟
