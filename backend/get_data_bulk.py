import requests
import json

DATA_FILE = "data.json"
BACKEND_URL = "http://localhost:8000"


def main():
    response = requests.get(BACKEND_URL + "/api/admin/data_dump")
    if response.status_code == 200:
        print(f"Server is running")
        json_data = json.loads(response.text)
        with open(DATA_FILE, "w") as f:
            f.write(json.dumps(json_data, indent=4))
    else:
        print(f"Server is not running")


if __name__ == "__main__":
    main()
