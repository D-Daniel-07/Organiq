import requests
import json

# Set up the API endpoint and your API key
api_endpoint = "https://api.anthropic.com/v1/complete"
api_key = "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"  # Replace with your actual API key

initial_prompt = "Hello! I'm an agriculture chatbot. How can I assist you today?"

# Function to send a message to the Claude AI API and get the response
def get_claude_response(prompt):
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": api_key,
        "anthropic-version": "2023-06-01"  # Specify the version of the Anthropic API
    }
    data = {
        "prompt": f"{prompt}\nAssistant:",
        "model": "claude-v1",
        "max_tokens_to_sample": 100,
        "stop_sequences": ["\nHuman:"]
    }
    try:
        response = requests.post(api_endpoint, headers=headers, data=json.dumps(data))
        response.raise_for_status()  # Raise HTTPError for bad response status
        if response.status_code == 200:
            completion = response.json().get("completion", "").strip()
            if completion:
                return completion
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        print(f"Request data: {data}")
        print(f"Response text: {response.text}")
    except json.JSONDecodeError as e:
        print(f"JSON decoding error: {e}")
    return "Sorry, I couldn't process your request at the moment."

# Main loop for the chatbot
def main():
    print(initial_prompt)
    while True:
        user_input = input("Human: ")
        if user_input.lower() in ["bye", "goodbye", "exit", "quit", "thank you"]:
            print("Assistant: Thank you for using the agriculture chatbot. Have a great day!")
            break
        
        prompt = f"Human: {user_input}\nAssistant:"
        response = get_claude_response(prompt)
        print(f"Assistant: {response}")

if __name__ == "__main__":
    main()