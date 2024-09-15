import requests

add = "0x7A59528aF9c81E6948AbA82eb18b4163A6485BfA"
url = "https://testnet.veblocks.net/"

def find_blocks(url):
    response = requests.get(f"{url}/blocks/best")
    return (response.json())

def find_account(url,address):
    response = requests.get(f"{url}/account/{address}")
    print(response)
    return response.json()

# print(find_account(url,add))
print(find_blocks(url))