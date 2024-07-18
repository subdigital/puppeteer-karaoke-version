# puppeteer-karaoke-version

This is a utility script that automates a workflow for downloading individual
tracks from Karaoke Version.

This workflow is specific to how I use this service.
If you want to change it you'll have to make your own modifications.

It will solo & download each individual track separately using a scratch version
of Chrome that will be downloaded automatically upon first run.

## Requirements

- Node 16+
- Karaoke Version account with purchased songs
- Chrome (will be downloaded automatically)

## Installation & Set Up

- Clone the project
- Run `npm i` to install dependencies
- Add a `.env` file in the root of the project and include:

```toml
KV_USERNAME=<yourusername>
KV_PASSWORD=<yourpassword>
```

## Usage

First, you have to purchase the track in your Karaoke Version account. Copy the URL
of the song you want.

Then run `npm run start <song url>`.

## Options

- `-d <path>` Change the download location
- `-h` or `--headless` Use headless mode, which hides the UI.
- `-i` or `--intro` Include the intro precount
- `-p <pitch offset>` Change the pitch of the downloaded tracks:
  - `-1` to go down half step
  - `1` to go up half step, etc

Using headless mode may make it less clear what is going on behind the scenes,
so I suggest testing it out in the regular mode first.

To pass these flags, you'll have to separate the `npm run start ..` command
from the arguments with `--`.

For example:

```shell
npm run start <song url> -- -d my_song_dir
```

## Note

This may well be against their terms, so use at your own risk.
I would hate for anyone's account to get banned for abusing automation like this.

And Karaoke Version, if you're listening: We'd love if this was fully supported in the UI!

## Changelog

## master/unreleased

- Added `-i` option to set the intro field

## 0.2

- Fixed usage of karaoke-version.co.uk
- Added `-d` to change download path
- Added `-h` for headless mode
- Added `-p` for pitch changes

## 0.1

Initial release

## License

This source code is released under the MIT license.
