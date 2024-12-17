import requests
import json

DATA_FILE = "/home/juraj/Documents/temp_back_up/linkmory/data.json"
BACKEND_URL = "http://localhost:8000"


def main():
    with open(DATA_FILE, "r") as f:
        data = f.read()
    data = json.loads(data)
    response = requests.post(BACKEND_URL + "/api/admin/load_data", json=data)
    print(f"{response.status_code = }")
    print(f"{response.text = }")


if __name__ == "__main__":
    main()
