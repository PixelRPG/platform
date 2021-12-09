# PixelRPG Platform Backend

## Licence

This project is licensed under the AGPL license.

## Deno

Tested with Deno v1.16.4, you can use [DVM](https://opensourcelibs.com/lib/dvm)
to switch between different Deno versions:

```bash
dvm install v1.16.4
dvm use v1.16.4
dvm alias default v1.16.4 # Always use v1.16.4 as the default deno version
```

### Start

```bash
cd backend
dvm run v1.16.4 run --allow-run scripts.ts start
```

### Watch

```bash
cd backend
dvm run v1.16.4 run --allow-run scripts.ts watch
```

### Generate OpenAPI file

```bash
dvm run v1.16.4 run --allow-run scripts.ts openapi
```
