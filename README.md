[![Build Status](https://travis-ci.org/codefoxes/musicion.svg?branch=master)](https://travis-ci.org/codefoxes/musicion) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/7562ce365edd4a0a835e6a2dc750353d)](https://www.codacy.com/app/karthik.bhat/musicion?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=codefoxes/musicion&amp;utm_campaign=Badge_Grade) [![Test Coverage](https://api.codeclimate.com/v1/badges/7add68e921acfc2623b7/test_coverage)](https://codeclimate.com/github/codefoxes/musicion/test_coverage) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

# Musicion Player

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

## Installation

### From package
- Released package will be available after Beta release.
- Installation will be as easy as Download and Open.
- Current Status: alpha.

### Manual Installation / Development

```
git clone git@github.com:codefoxes/musicion.git
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
