from urllib.parse import urlparse, parse_qs
url = 'https://digitan.com.au/'
parsed_url = urlparse(url)
params = parse_qs(parsed_url.query)

# print all parameters
print(params)
