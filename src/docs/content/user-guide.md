# Your first library

Start with a running [Placard instance](/docs/install). Complete the first administrator
signup before exposing the instance to others.

## Add your first place

Open **Add**. Without a Google key, search OpenStreetMap by name and town, enter coordinates, or drop a pin. Check the position, name and type, then save.
With a configured key, search for a place or select a point of interest on the Google
map. Open the resulting card to add notes, tags, photos, or custom fields.

## Save a place from Chrome

Use a Placard instance that includes the **Save from Google Maps** review page.

1. Download the Chrome extension ZIP from the [latest release](https://github.com/placard-app/core/releases/latest). Extract the Save to Placard extension ZIP into a folder you can keep. To build the ZIP from this checkout, run `pnpm install`, then `pnpm --filter @placard/chrome-extension build`. The versioned ZIP is in `apps/chrome-extension/dist/`.
2. Open `chrome://extensions`, enable **Developer mode**, choose **Load unpacked**, and select the extracted folder containing `manifest.json`.
3. Open a place in Google Maps and choose **Save to Placard** from Chrome’s extensions menu. On first use, enter the URL you normally use to open Placard, including any deployment path. Save the setting, return to Maps, and choose **Save to Placard** again. You can change the URL later in the extension’s options.
4. In the Placard tab, sign in if prompted and check the name and pin. If the link contains only the map’s viewing position, find the place or enter its coordinates before saving.
5. Choose **Save without Google** to add the place without an API request. If your instance has a Google key, you can instead choose **Look up details with Google**, review the match, then choose **Save with Google details**. A failed or budget-blocked lookup leaves the keyless option available.

For a path-mounted instance, configure the extension with the same prefix as the web app. For example, a frontend built with Vite’s `--base /house/` and served by a proxy that strips `/house/` uses `https://places.example.com/house/`.

## Bring your Google saves

1. Export your saved places through Google Takeout. Keep the downloaded ZIP.
2. Open **Import**, choose the ZIP. Parsing runs in the background; you can keep using Placard and return through **Recent imports** when it is ready.
3. Review entries by source list, text, and keep/skip decision. Use bulk selection
   for groups you want to keep or leave out. You can return to unfinished triage.
4. Commit your selection. Importing continues in the background, with progress shown on the import page. Parsing and triage do not call Google Places; matching
   and enrichment can use paid API calls when a key is configured.
5. Open **Needs review** to link an entry to one of your saved places, drop a pin, accept an existing pin, or skip it. These actions also work when you reopen an earlier import through **Recent imports**.

The upload limit is 50 MB. See [Takeout formats](/docs/takeout-format) for supported
JSON and CSV layouts. Keep the original export until you have checked the result.
Undo removes places and lists created by the import. If you linked a row to a place you already owned, its imported notes and Maps links stay on that place.

## Find something worth revisiting

**Near me** uses your location. If location access is unavailable, switch to **All**
or choose a **City**. Use the grid for cards or the map for geographic context.
Search by name and combine filters for type, tags, lists, visit status, or opening time.
Open a place and choose **Add hours** or **Edit hours** to enter weekly hours in its local time zone. You can enter separate lunch and dinner shifts or hours that extend past midnight. The opening-time filters use this schedule.

## Make the collection yours

Use tags for qualities such as “quiet” or “date night”; lists group places for trips
or projects. Mark places **Want to go** or **Been there**. Notes and photos capture
what you want to remember. Use **Edit** to set the website, phone, cuisine, and price range. Custom fields hold additional structured details.

Select owned places in the library to apply bulk actions. Deleted places can be
restored from **Recently deleted** during the 30-day window.

## Share with your household

An administrator creates invitations in **Settings → People** and enables household
mode. Owners can then share individual places. **Everyone**, **Mine**, and **Shared**
change which library entries you see. Lists remain private, and sharing a place
never creates a public link.

## Enrich a place

Configure the instance key in **Settings → Integrations**. Refresh a place to fetch
Google details. Normal refresh preserves manual overrides; force refresh is an
explicit choice. Read confirmation prompts before refreshing a whole collection.

## Export, extend, and connect

- **Settings → General:** export your library, including media. This is a personal
  export; use the [backup procedure](/docs/install#backup) for full instance recovery.
- **Marketplace:** discover Pick, Board, Day Out, Menus, and Decide Together,
  included inactive by default. An administrator can activate them or install other
  trusted plugins. Choose which active modules appear in your navigation through
  **Settings → Marketplace**.
- **Settings → MCP:** create a token and follow the [client connection guide](/docs/mcp).
  Treat the token like a password and revoke it when no longer needed.

## Use Placard on your phone

Open your instance over HTTPS in your phone browser and use its home-screen install
or add-to-home-screen action. The app needs access to the server; it does not cache
your library for offline use. Choose your preferred maps app in settings to open
places for navigation.
