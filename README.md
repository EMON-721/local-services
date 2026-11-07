# Local Services

## Local Services platform

This repository contains a multi-application service-booking platform with separate customer (`apps/web`), technician (`apps/technician`) and administrator (`apps/admin`) interfaces. Backend services cover authentication, service catalogue data, orders, notifications and payments. The codebase uses a pnpm/Turborepo workspace.

### Administration

The administrator app is separated from the customer and technician interfaces. It is intended for operational work such as service catalogue maintenance, account oversight and booking management. Authorization and production integration depend on the corresponding backend services and configured database.

### Development

Use the scripts in `package.json`: `pnpm install`, `pnpm dev`, `pnpm build` and `pnpm test`. The existing Figma design reference is preserved below.

[Check out the design ](https://www.figma.com/design/tFJeCVyeFfxXSbOERS5Keu/ServiceLagbe-1?node-id=0-1&t=tFDfUwvJpZmwS38t-1)

## Website & repository links

- **Source repository:** https://github.com/emonhossain24/local-services

