import http.server
import socketserver

class CustomRequestHandler(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path):
        # Override the default MIME type guessing for the AASA file
        if path.endswith('/.well-known/apple-app-site-association'):
            return 'application/json'
        return super().guess_type(path)

PORT = 9999
Handler = CustomRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
