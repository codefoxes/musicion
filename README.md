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

## Todo

- [ ] Electron builder for Windows, Updater
- [ ] Play button to start first album song if no song is played first
- [ ] Add songs to other (non default) playlists
- [ ] Add Multiple songs to playlist
- [ ] Song info panel
- [ ] Edit id3 tags
- [ ] Side panels toggler
- [ ] Separate Visualizer - Full Screen
- [ ] Add Songs from cloud (Drive, s3 etc)
- [ ] Theming

## Technologies used
- Electron
- React with Context API
- Web Audio API
- Webpack
- ES6 JSX with various loaders
- Node ID3
- ESLint - Airbnb - Standard JS
- SVG Animations
