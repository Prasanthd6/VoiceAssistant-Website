from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from difflib import get_close_matches
import json
import re

app = FastAPI()

origins = [
    "http://localhost:5173"
]
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Command(BaseModel):
    text: str

with open("commands_dataset.json") as f:
    dataset = json.load(f)

@app.post("/command")
def interpret(cmd: Command):
    text = cmd.text.lower()

     # Flatten all phrases with their intent
    all_phrases = []
    phrase_to_intent = {}
    # Match intents using fuzzy or keyword logic
    for intent, phrases in dataset.items():
        for phrase in phrases:
            all_phrases.append(phrase)
            phrase_to_intent[phrase] = intent

    match = get_close_matches(text, all_phrases, n=1, cutoff=0.6)
    if match:
        matched_phrase = match[0]
        intent = phrase_to_intent[matched_phrase]
        return map_to_action(intent, text)
    
    return {"action": "unknown"}

def map_to_action(intent, text):
    if "navigate" in intent:
        path_map = {
            "navigate_home": "/",
            "navigate_login": "/login",
            "navigate_register": "/register",
            "navigate_profile": "/profile",
            "navigate_messages": "/messages",
            "navigate_chat": "/chatpopup",
            "navigate_cart": "/cart"
        }
        return {"action": "navigate", "path": path_map.get(intent, "/")}

    elif intent == "logout":
        return {"action": "logout"}

    elif intent == "search" or intent == "search_general":
        query = re.sub(r"(search for|look up|find me|show|get|search)", "", text).strip()
        return {"action": "search", "query": query}

    elif "fill_form_email" in intent:
        email = re.findall(r"\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b", text)
        return {"action": "fill", "field": "email", "value": email[0] if email else ""}

    elif "fill_form_name" in intent:
        name = text.split("is")[-1].strip() if "is" in text else text.split("as")[-1].strip()
        return {"action": "fill", "field": "name", "value": name}
    
    elif "fill_form_username" in intent:
        match = re.search(r"(?:username (?:is|to|as)?\s*)([\w\d_@.-]+)", text)
        username = match.group(1) if match else ""
        return {"action": "fill", "field": "username", "value": username}

    elif "fill_form_password" in intent:
        password = re.findall(r"password (is|to)? ([\w\d@#\$\%&]+)", text)
        return {"action": "fill", "field": "password", "value": password[0][1] if password else ""}
    
    elif intent == "submit_login":
        return {"action": "click", "element": "login"}

    # elif intent == "open_gig_number":
    #     # Extract the first number found in the command text
    #     match = re.search(r"\b(\d+)\b", text)
    #     index = int(match.group(1)) if match else 1  # default to 1 if no number found
    #     return {"action": "open_gig_number", "index": index}
    elif intent == "open_gig_number":
        match = re.search(r"\b(\d+)\b", text)
        index = int(match.group(1)) if match else 1
        return {"action": "open_gig_number", "index": index}
    
    elif intent == "message":
        # import re
        # Match patterns like "send hi to surya", "tell surya hello"
        to_match = re.search(r"(?:to|tell|message)\s+(\w+)", text)
        msg_match = re.search(r"(?:say|send|tell|message)\s+(.*?)\s+(?:to|tell|message)", text)

        target = to_match.group(1) if to_match else "unknown"
        msg = msg_match.group(1) if msg_match else "hi"
        return {"action": "message", "target": target, "msg": msg}

    elif intent == "go_back":
        return {"action": "go_back"}
    
    elif intent == "contact_seller":
        return {"action": "contact_seller"}
    
    elif intent == "send_to_seller":
        # Extract message like "say hi to seller"
        msg_match = re.search(r"(?:say|send|message)\s+(.*?)\s+(?:to\s+seller)", text)
        msg = msg_match.group(1) if msg_match else "hi"
        return {"action": "send_to_seller", "msg": msg}


    return {"action": "unknown"}



# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import json
# import re

# app = FastAPI()

# origins = [
#     "http://localhost:5173"
# ]
# # Enable CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class Command(BaseModel):
#     text: str

# with open("commands_dataset.json") as f:
#     dataset = json.load(f)

# @app.post("/command")
# def interpret(cmd: Command):
#     text = cmd.text.lower()

#     # Match intents using fuzzy or keyword logic
#     for intent, phrases in dataset.items():
#         for phrase in phrases:
#             if phrase in text:
#                 return map_to_action(intent, text)

#     return {"action": "unknown"}

# def map_to_action(intent, text):
#     if "navigate" in intent:
#         path_map = {
#             "navigate_home": "/",
#             "navigate_login": "/login",
#             "navigate_register": "/register",
#             "navigate_profile": "/profile",
#             "navigate_cart": "/cart"
#         }
#         return {"action": "navigate", "path": path_map.get(intent, "/")}

#     elif intent == "logout":
#         return {"action": "logout"}

#     elif intent == "search" or intent == "search_general":
#         query = re.sub(r"(search for|look up|find me|show|get|search)", "", text).strip()
#         return {"action": "search", "query": query}

#     elif "fill_form_email" in intent:
#         email = re.findall(r"\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b", text)
#         return {"action": "fill", "field": "email", "value": email[0] if email else ""}

#     elif "fill_form_name" in intent:
#         name = text.split("is")[-1].strip() if "is" in text else text.split("as")[-1].strip()
#         return {"action": "fill", "field": "name", "value": name}

#     elif "fill_form_password" in intent:
#         password = re.findall(r"password (is|to)? ([\w\d@#\$\%&]+)", text)
#         return {"action": "fill", "field": "password", "value": password[0][1] if password else ""}

#     elif intent == "message":
#         match = re.search(r"to (\w+)", text)
#         target = match.group(1) if match else "unknown"
#         msg = re.findall(r"say (.*?) to", text)
#         return {"action": "message", "target": target, "msg": msg[0] if msg else "hi"}

#     elif intent == "go_back":
#         return {"action": "go_back"}

#     return {"action": "unknown"}
