import requests
import json

url = "https://apihackaton.zacheta.art.pl/api/v1/artworks?limit=1&start=0"
ping_url = requests.get(url, verify=False, headers={
    'Authorization': "Bearer 961b1ccee4d2246878c4dae14870731bb5b1dd71e8e7c0c23651b03178a0a576e093bcdbd7bf13d35fcade0a060eb91c84b580119288ae600e94bfceb2776a6188ecb3fee689a611e76f0e75a5771026c35b80e3897b58e8e86a40b70ee4e79307ab272d4403922c30e5d2d1266b1e90db18dcdb0463d3cdc311f47b85365d27"})
response_404 = "<Response [404]>"
data = ping_url.json()

date = json.dumps(data["data"])
for i in date:
    print(i)
