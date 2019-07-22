[![Build Status](https://travis-ci.org/codefoxes/musician.svg?branch=master)](https://travis-ci.org/codefoxes/musician) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/0a78a7eaaf0b4dc19556346bb8fa86f3)](https://www.codacy.com/app/karthik.bhat/musician?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=codefoxes/musician&amp;utm_campaign=Badge_Grade) [![Test Coverage](https://api.codeclimate.com/v1/badges/fcfbaa2bb543e530f7fa/test_coverage)](https://codeclimate.com/github/codefoxes/musician/test_coverage) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](pulls)

# Musician Player

Multi-platform music player

## Features
- Minimal UI Approach
- Music Visualization
- Supported Music file formats
  - MP3
  - FLAC
  - PCM
  - AAC
  - Vorbis
  - Opus

## Download
You can download tested install packages for OS X from following links:
(Windows and Linux Coming soon)
[Windows](https://codefoxes.com/musician/#download) | [Mac](https://codefoxes.com/musician/download.php?os=mac) | [Linux](https://codefoxes.com/musician/#download)

Current Version: 0.1.0

### Manual Installation / Development

```
git clone git@github.com:codefoxes/musician.git
npm install
npm run electron
```

## Done
- [x] Player controls - Play, Pause, Seekbar, Volume
- [x] Add folders to library
- [x] Library albums grid
- [x] Album details
- [x] Add song to default playlist
- [x] Header SVG Visualization
- [x] Add, Remove Playlists
- [x] Configuration management
- [x] Side Panel with Library & Playlists
- [x] Playlist plays the songs in order
- [x] Working Next and Previous buttons
- [x] Electron builder for Mac and Linux
- [x] Add songs to other (non default) playlists
- [x] Add Multiple (Album) songs to playlist
- [x] Song info panel
- [x] Side panels toggler
- [x] Soft Updater

## Todo
- [ ] Electron builder for Windows
- [ ] Play button to start first album song if no song is played first
- [ ] Edit id3 tags
- [ ] Separate Visualizer - Full Screen
- [ ] Add Songs from cloud (Drive, s3 etc)
- [ ] Theming
- [ ] Accessibility Compatible
- [ ] On action visualization (Add to Playlist success)
- [ ] Auto cleanup default playlist

## Technologies used
- Electron
- React with Context API
- Web Audio API
- Webpack
- ES6 JSX with various loaders
- Node ID3
- ESLint - Airbnb - Standard JS
- SVG Animations

## Other
 - [Visit Website](https://codefoxes.com/musician/)
 - [Docs](https://codefoxes.com/docs/musician/)
 - [Changelog](https://codefoxes.com/musician/changelog/)
