import requests
from pprint import pprint


# Structure payload.
payload = {
    'source': 'amazon',
    'url': 'https://www.amazon.com/Pandora-Silver-Charm-Bracelet-Sterling/dp/B00S18EWHU/ref=sr_1_5?crid=5MJ7COHQE5Y7&keywords=pandora%2Bbracelet&qid=1693253044&sprefix=pandora%2Bbracle%2Caps%2C172&sr=8-5%22&th=1',
    'parse': True
}

# Get response.
response = requests.request(
    'POST',
    'https://realtime.oxylabs.io/v1/queries',
    auth=('akankshd', 'Dreams!23'), #Your credentials go here
    json=payload,
)

# Instead of response with job status and results url, this will return the
# JSON response with results.
pprint(response.json())