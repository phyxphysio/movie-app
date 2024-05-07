from dotenv import load_dotenv
import os
import json

dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env.dev")

load_dotenv(dotenv_path=dotenv_path)

data = {}
with open("config/.env.template", "r") as file:
    for line in file:
        if "DB_CONFIG" in line:
            data[os.getenv("DB_CONFIG")] = {}
        else:
            var = line.split("=")[0]
            key = var.split("_")[1].lower()
            data[os.getenv("DB_CONFIG")][key] = os.getenv(var)
with open("config/config.json", "w") as json_file:
    json.dump(data, json_file)
