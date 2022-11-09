import json
import bottle
# host all static files at paths equal to their filenames
@bottle.route('/<js_file>.js')
def js_file_handler(js_file):
  return bottle.static_file(js_file+".js", root="front_end")

@bottle.route('/<html_file>.html')
def html_file_handler(html_file):
  return bottle.static_file(html_file+".html", root="front_end")

@bottle.route('/<css_file>.css')
def css_file_handler(css_file):
  return bottle.static_file(css_file+".css", root="front_end")

@bottle.route('/')
def index():
  return bottle.static_file("front_end/index.html", root=".")
bottle.run(host = "0.0.0.0", port=8080)