# UI for Urbit Taskk App

taskk is a trello-esque app for managing distributed todo boards on urbit.

<img src="http://i.imgur.com/lvsnIlT.png" width="100%"/>

## Dev setup
1. `npm install -g` to install the necessary npm modules
2. `npm start` to start the dev server
3. App will open on port 3000 and proxies urbit calls to 8443. If you want 
to change this, mess around with package.json
4. Make changes. Fix everything and make it work

## Install
1. `npm run build` to build all js and css
2. `cp -r build/{taskk,taskk.html} <PATH_TO_SHIP>/home/web`
3. taskk will serve at `localhost:8443/taskk.html#/<HOST>/<BOARD>`. By 
convention, HOST is whichever ship initiated the board and BOARD is an 
arbitrary name
4. Go nuts.

## Usage
1. Each column has its own "create new" button.
2. Issues are extremely simple, having a title, an assignee, a description
3. Double click tile to expand.
4. Drag a tile to change phase.
5. These boards are stored as a directory of markdown files on your ship, 
at `%/app/taskk/HOST/BOARD/PHASE/ISSUE`. If you'd like to sync boards or 
collaborate, see the instructions in the docs on syncing desks.

## TODO
- keyshortcuts
- rename clearway
- Notify assignee on change
- Better uuid

