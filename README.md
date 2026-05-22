# INNERStudios Locales 🌍

Welcome to the official translation repository for the **INNERStudios** ecosystem. This repository centralizes all the text and translations used across our various platforms and services. It is fully open-source, community-driven, and designed for extreme performance.

## 🏗 Repository Structure (Namespaces)

To ensure maximum efficiency and avoid loading unnecessary text, our translations are strictly separated by **Namespaces** (platforms). Each folder corresponds to a specific platform in the INNERStudios ecosystem:

- 📂 **`/portal`** - Translations for the main Customer Portal & Dashboard.
- 📂 **`/auth`** - Translations for the Authentication and MFA pages.
- 📂 **`/api`** - Translations for HTTP API errors, server logs, and Email templates.
- 📂 **`/ic_core`** - Translations for the in-game core framework and mechanics.

Inside each folder, you will find JSON files representing the supported languages (e.g., `en.json`, `pt-PT.json`, `pt-BR.json`).

## 🤝 How to Contribute

We actively encourage our community to help translate INNERStudios into new languages or improve existing ones!

1. **Fork this repository** to your own GitHub account.
2. **Navigate to the namespace** you want to translate.
3. **Edit an existing file** (e.g., fixing a typo in `pt-PT.json`) OR **create a new file** based on the English baseline (e.g., copying `en.json` to `es.json` for Spanish).
4. **Commit your changes** and open a **Pull Request (PR)** against our `main` branch.

### ⚠️ Contribution Rules
- **Never remove keys:** If you are modifying an existing file, do not delete existing translation keys.
- **Maintain variables:** If the English text has a variable like `{name}`, your translation must also include `{name}` exactly as it is.
- **Keep it nested:** We use nested JSON objects (e.g., `licenses.create.title`). Maintain the exact same nesting structure.

## 🚀 How it Works (Under the Hood)

This repository operates with **zero latency** and **100% cloud-independence**:

1. Once a Pull Request is approved and merged into `main`, our **GitHub Actions** automatically run.
2. The Action parses and validates the JSON files.
3. The translations are securely injected into our **Global Redis Cluster** under specific keys (e.g., `locale:portal:pt-BR`).
4. Redis sends a real-time `Pub/Sub` signal to all INNERStudios production servers.
5. Our servers immediately update their local RAM cache with the new translations.

Changes take effect in production **instantly** without the need for server restarts!

---
*Built with ❤️ by the INNERStudios Team.*
