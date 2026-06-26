import os
from groq import Groq
from dotenv import load_dotenv
load_dotenv()
import streamlit  as st 

os.environ['GROQ_API_KEY']= os.getenv('groq_key')

client=Groq()

def Chat(UserInput,client):
     if UserInput.lower() in ['over','bye', 'thank you','okay','quit','quit()']:
          print("Thank you!, Have a Great Day")
     else:
          systemprompt="hey Bot Make sure to give in simple and understandale format , Not extending 150 to 250words , use lists if only required "
          chat_completion = client.chat.completions.create(
               messages=[
                    {
                    "role": "user",
                    "content": UserInput
                    },
                    {
                    "role": "system",
                    "content": systemprompt
                    }
               ],
               model="llama-3.3-70b-versatile",
               )
     return chat_completion.choices[0].message.content
st.title("Q/A Sample System")
UserInput=st.text_input("Enter Your Question : ")
ASk=st.button("ASK")
Reset=st.button("Reset")

if ASk:
     Out=Chat(UserInput,client)
     st.write(Out)
elif Reset:
     st.session_state.clear()
     st.rerun()

    
