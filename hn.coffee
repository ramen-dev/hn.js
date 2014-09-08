class Util
  @create_el: (name, attr) ->
    el = document.createElement(name)
    attr ||= {}

    for key, val of attr
      continue unless val?

      if key == 'class'
        el.className = val
        continue

      if key == 'style'
        @style(el, val)

      el[key] = val

    el

  @counter: 0
  
  @jsonp: (url) ->
    el = document.getElementsByTagName("script")[0]
    script = @create_el("script", {async: 'async', type: "text/javascript", src: url})
    el.parentNode.insertBefore(script, el)

  @request: (url, params, opts) ->
    opts ||= {}
    callback = opts.callback || ->
    params.format = 'jsonp'
    callback_name = @uniq_id('callback')
    params.callback = callback_name
    window[callback_name] = ->
      callback(arguments...)

    ps = @to_q(params)
    if url.indexOf('?') > -1
      url = url + "&" + ps
    else
      url = url + "?" + ps

    @jsonp(url)

  @style: (el, css) ->
    for key, val of css
      el.style[key] = val

  @to_q: (p) ->
    p ||= {}
    str = ""

    for k, v of p
      continue unless v?
      str += encodeURIComponent(k) + '=' + encodeURIComponent(v) + '&'

    str

  @uniq_id: (prefix) ->
    prefix ||= "hnjs_"
    prefix + new Date().getTime() + @counter++


class HNjs
  constructor: ->
    setTimeout(@check_api, 1000)
    @parser = document.createElement('a')
    @current = document.createElement('a')
    @current.href = window.location.href
    @current_string = @current.hostname + @current.pathname + @current.search

  attach_ribbon: ->
    @ribbon = document.createElement('a')
    @ribbon.href = "https://news.ycombinator.com/item?id=" + @item.id
    @ribbon.target = "_blank"
    Util.style(@ribbon, {top: 0, right: 0, position: 'fixed', display: 'block', width: '150px', height: '150px'})
    @ribbon.innerHTML = '<img src="ribbon.gif">'
    document.body.appendChild(@ribbon)

  check_api: =>
    Util.request("http://api.ihackernews.com/page", {}, callback: @parse_api_response)

  parse_api_response: (data) =>
    for item in data.items
      @parser.href = item.url
      str = @parser.hostname + @parser.pathname + @parser.search
      
      if str == @current_string
        @item = item
        @attach_ribbon()
      else
        console.log("nopies: " + item.url)

this.HNjs = HNjs
