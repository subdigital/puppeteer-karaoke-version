This is a utility script that automates a workflow for downloading individual tracks from Karaoke Version.

This workflow is specific to how I use this service. If you want to change it you'll have to make your
own modifications.

It will solo & download each individual track separately.

## Requirements

- Node 16+
- Karaoke Version account with purchased songs
- Chromium (will be downloaded automatically)

## Installation & Set Up

- Clone the project
- Run `npm i` to install dependencies
- Add a `.env` file in the root of the project and include:

```
KV_USERNAME=<yourusername>
KV_PASSWORD=<yourpassword>
```

## Usage

First, you have to purchase the track in your Karaoke Version account. Copy the URL
of the song you want.

Then run `npm run start <song url>`.


## Note

This may well be against their terms, so use at your own risk.

## License

This source code is released under the MIT license.
