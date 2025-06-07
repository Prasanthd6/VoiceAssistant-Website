# # def parse_command(command):
# #     command = command.lower()

# #     if "go to" in command or "open" in command:
# #         if "home" in command:
# #             return {"action": "navigate", "data": {"page": "/"}}
# #         elif "register" in command:
# #             return {"action": "navigate", "data": {"page": "register"}}
# #         elif "login" in command:
# #             return {"action": "navigate", "data": {"page": "login"}}

# #     if "my email is" in command:
# #         email = command.split("my email is")[-1].strip()
# #         return {"action": "fill_form", "data": {"field": "email", "value": email}}

# #     if "my password is" in command:
# #         password = command.split("my password is")[-1].strip()
# #         return {"action": "fill_form", "data": {"field": "password", "value": password}}

# #     if "search for" in command:
# #         query = command.split("search for")[-1].strip()
# #         return {"action": "search", "data": {"query": query}}

# #     if "apply for job" in command or "i want to apply" in command:
# #         return {"action": "apply_job", "data": {}}

    
# #     if "send message to" in command:
# #         name_part = command.split("send message to")[-1]
# #         if ":" in name_part:
# #             name, msg = name_part.split(":", 1)
# #             return {"action": "send_message", "data": {"to": name.strip(), "message": msg.strip()}}

# #     if "help" in command:
# #         return {"action": "help", "data": {}}

# #     return {"action": "unknown", "data": {}}
# def parse_command(command):
#     command = command.lower()

#     if "go to" in command or "open" in command:
#         if "home" in command:
#             return {"action": "navigate", "data": {"page": "/"}}
#         elif "register" in command or "join" in command:
#             return {"action": "navigate", "data": {"page": "/register"}}
#         elif "login" in command or "sign in" in command:
#             return {"action": "navigate", "data": {"page": "/login"}}

#     if "my email is" in command:
#         email = command.split("my email is")[-1].strip()
#         return {"action": "fill_form", "data": {"field": "email", "value": email}}

#     if "my password is" in command:
#         password = command.split("my password is")[-1].strip()
#         return {"action": "fill_form", "data": {"field": "password", "value": password}}

#     if "search for" in command:
#         query = command.split("search for")[-1].strip()
#         return {"action": "search", "data": {"query": query}}

#     if "apply for job" in command or "i want to apply" in command:
#         return {"action": "apply_job", "data": {}}

#     if "send message to" in command:
#         name_part = command.split("send message to")[-1]
#         if ":" in name_part:
#             name, msg = name_part.split(":", 1)
#             return {"action": "send_message", "data": {"to": name.strip(), "message": msg.strip()}}

#     if "help" in command:
#         return {"action": "help", "data": {}}

#     return {"action": "unknown", "data": {}}
