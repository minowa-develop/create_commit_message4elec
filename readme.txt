# make develop environment

## install node

### install fnm

curl -fsSL https://fnm.vercel.app/install | bash

### activate fnm

source ~/.bashrc

### download and install Node.js

fnm use --install-if-missing 22

## initialize npm

npm init -y

## install electron

npm install -D electron
npm install -D typescript
npm install -D tsc

## 実行

npx electron ./src

## build

npm install -D electron-packager
npx electron-packager src FirstApp --platform=win32 --arch=x64 --overwrite

## 参考

<https://ics.media/entry/7298/>
