import http.server
import socketserver

class CustomRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Set the correct content-type for AASA file
        if self.path == '/.well-known/apple-app-site-association':
            self.send_header('Content-Type', 'application/json')
        super().end_headers()

# Change the directory to where your AASA file is located
PORT = 8080
Handler = CustomRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
