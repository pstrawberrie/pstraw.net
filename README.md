# pstraw.net

pstraw.net website

## How to clone

My code is pretty rough - oops - as it is, this codebase is not really suited for cold cloning, but you can make it work if you want it to ;]

You can make your own pstraw-style site by adding your TMDB credentials to the .env file (`cp .env.example .env`). You can get your credentials from the TMDB website. The `slurpi` directory contains the code which sucks down TMDB data. The TMDB data is based on favorites only, so if you have something that you've rated but not favorited, it won't show up at all @\_@

If you are fresh cloning, you'll need to first run `npm run slurpi-sync`. That will set up the sqlite db so that you don't get errors running the local site.

Good luck!! <3
