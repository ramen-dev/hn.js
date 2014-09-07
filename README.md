#HN.js

HN.js is a small library that monitors to see if your site has hit the front
page of Hacker News, and pops up a little apology notice if so :)

## Features

* Auto-detects for current page and homepage
* Uses the [Hacker News API](http://api.ihackernews.com/)

## Usage

```html
<script src="//cdn.jsdelivr.net/hnjs/0.0.1/hn.js"></script>
<script>HNjs.initialize()</script>
```

## Configuration

Right now, there are no config settings. If the script detects that the current page
or the '/' path of the current domain has been shared on HN, it will popup a little fixed
position, dismissable DIV in the top right corner of the page.


## Contribute

Just fork and send a pull request!


## Inspiration

This inspiration for this library came from poor Juliabox:
![Juliabox](https://dl.dropboxusercontent.com/spa/c8k9520tqhih2dg/yuvo-cja.png)

## Where is it being tested?

* Chrome
* Firefox
* Safari
* Chrome iOS
* Safari iOS

## License

HN.js is licensed under MIT http://www.opensource.org/licenses/MIT

### Copyright

Copyright (c) 2014, Ramen, LLC  
<ryan@ramen.is>, [@ramenapp](http://twitter.com/ramenapp)
