// Generated by CoffeeScript 1.8.0
(function() {
  var HNjs, Util,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Util = (function() {
    function Util() {}

    Util.create_el = function(name, attr) {
      var el, key, val;
      el = document.createElement(name);
      attr || (attr = {});
      for (key in attr) {
        val = attr[key];
        if (val == null) {
          continue;
        }
        if (key === 'class') {
          el.className = val;
          continue;
        }
        if (key === 'style') {
          this.style(el, val);
        }
        el[key] = val;
      }
      return el;
    };

    Util.counter = 0;

    Util.jsonp = function(url) {
      var el, script;
      el = document.getElementsByTagName("script")[0];
      script = this.create_el("script", {
        async: 'async',
        type: "text/javascript",
        src: url
      });
      return el.parentNode.insertBefore(script, el);
    };

    Util.request = function(url, params, opts) {
      var callback, callback_name, ps;
      opts || (opts = {});
      callback = opts.callback || function() {};
      params.format = 'jsonp';
      callback_name = this.uniq_id('callback');
      params.callback = callback_name;
      window[callback_name] = function() {
        return callback.apply(null, arguments);
      };
      ps = this.to_q(params);
      if (url.indexOf('?') > -1) {
        url = url + "&" + ps;
      } else {
        url = url + "?" + ps;
      }
      return this.jsonp(url);
    };

    Util.to_q = function(p) {
      var k, str, v;
      p || (p = {});
      str = "";
      for (k in p) {
        v = p[k];
        if (v == null) {
          continue;
        }
        str += encodeURIComponent(k) + '=' + encodeURIComponent(v) + '&';
      }
      return str;
    };

    Util.uniq_id = function(prefix) {
      prefix || (prefix = "hnjs_");
      return prefix + new Date().getTime() + this.counter++;
    };

    return Util;

  })();

  HNjs = (function() {
    function HNjs() {
      this.parse_api_response = __bind(this.parse_api_response, this);
      this.check_api = __bind(this.check_api, this);
      setTimeout(this.check_api, 1000);
      this.parser = document.createElement('a');
      this.current = document.createElement('a');
      this.current.href = window.location.href;
      this.current_string = this.current.hostname + this.current.pathname + this.current.search;
    }

    HNjs.prototype.check_api = function() {
      return Util.request("http://api.ihackernews.com/page", {}, {
        callback: this.parse_api_response
      });
    };

    HNjs.prototype.parse_api_response = function(data) {
      var item, str, _i, _len, _ref, _results;
      _ref = data.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        this.parser.href = item.url;
        str = this.parser.hostname + this.parser.pathname + this.parser.search;
        if (str === this.current_string) {
          _results.push(alert('Rut oh!'));
        } else {
          _results.push(console.log("nopies: " + item.url));
        }
      }
      return _results;
    };

    return HNjs;

  })();

  this.HNjs = HNjs;

}).call(this);
