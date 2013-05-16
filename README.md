  <h3>Welcome!</h3>
  <p>Seo Server is a command line tool that runs a server that allows GoogleBot(and any other crawlers) to crawl your heavily Javascript built websites. The tool works with very little changes to your server or client side code.</p>
  <p><i>This entire site is driven by Javascript(view the source or see the <a href="https://github.com/apiengine/seoserver-site">code</a>). Click the `What does Google see?` button at the bottom of each page to see Seo Server in action.</i></p>

  <h3>How it works</h3>
  <img src="http://yuml.me/5b1b60bb" /><br /><br />
  <p>Seo Server runs <a href="http://phantomjs.org/">PhantomJs</a>(headless webkit browser) which renders the page fully and returns the fully executed code to GoogleBot.</p>
  
  <h3>Getting started</h3>
  <p>1) you must install PhantomJs(<a href="http://phantomjs.org/">http://phantomjs.org/</a>) and link into your bin so that Seo Server can call it.</p>
  <p>2) Seo Server is an NPM module so install via</p>
  <code>sudo npm install -g seoserver</code>
  <p>3) Now we have access to the Seo Server command line tool</p>
  <code>seoserver start</code>
  <p>Which starts an Express server on port 3000 or</p>
  <code> seoserver -p 4000 start</code> 
  <p>Start it as a background process and log the output</p>
  <code> seoserver -p 4000 start > seoserver.log &</code> 

  <h3>Telling GoogleBot to fetch from Seo Server</h3>
  <p>To tell GoogleBot that we are using ajaxed content we simply add to our sites index.html file the Google specific <a href="https://developers.google.com/webmasters/ajax-crawling/docs/specification">meta tag</a>. If you view the source of this page you can see we have included the tag below. </p>
  <code>&lt;meta name="fragment" content="!"&gt;</code>
  <p>Now whenever GoogleBot visits any of our pages it will try to load <code>?_escaped_fragment_=pathname</code></p>
  <p>So if we were using Apache with mod rewrite and mod proxy, we can include in our .htaccess</p>
  <code>
    RewriteCond %{QUERY_STRING} ^_escaped_fragment_=(.*)$<br />
    RewriteRule (.*) http://address-of-seoserver:3000/%1? [P]
  </code>
  <p>Now all request from GoogleBot will be returned fully rendered. How GoogleBot sees the page can be tested with Google <a href="http://www.google.com/webmasters/">WebMasters</a>(they allow you to simulate Google crawls and see the result instantly).</p>

  <h3>For other crawlers</h3>
  <p>
    Using mod rewrite, we can send other crawlers to Seo Server also
  </p>
  <code>
    RewriteCond %{HTTP_USER_AGENT} ^DuckDuckBot/1.0;<br />
    RewriteRule (.*) http://address-of-seoserver:3000/%1? [P]

  </code>

  <h3>Using with Heroku</h3>
  <p>   Get the <a href="https://github.com/lbesson/heroku-buildpack-phantomjs-nodejs">Phantom-Node.js Buildpack</a>. </p>
  After following those instructions.  Run
  <code> heroku apps:create seoserver </code>
  <code> git remote add heroku git@heroku.com:seoserver.git </code>
  <code>heroku config:set BUILDPACK_URL=http://github.com/fouasnon/heroku-buildpack-phantomjs-nodejs.git --app seoserver</code>
  <code>heroku config:set CLIENT_HOST=example.com --app seoserver</code>
  <code>heroku config:set LD_LIBRARY_PATH=/usr/local/lib:/usr/lib:/lib:/app/vendor/phantomjs/lib --app seoserver</code>
  <code>heroku config:set NODE_ENV=production --app seoserver</code>
  <code>heroku config:set PATH=bin:node_modules/.bin:/usr/local/bin:/usr/bin:/bin:/app/vendor/phantomjs/bin --app seoserver</code>
  <code> git push heroku master:master </code>

  <h3>FAQ</h3>
  <p>Nothing here yet, but check out the examples on the left to see different types of ajaxed content. Also ask questions and give feedback on GitHub <a href="https://github.com/apiengine/seoserver/issues">issues</a>.