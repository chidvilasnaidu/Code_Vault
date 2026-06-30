# code Entirely made by kumkapalla chidvilas

from google.colab import userdata
from groq import Groq
import os 
key=userdata.get('Gork_Key') # Acessing secret keys , from google colab 
os.environ['GROQ_API_KEY']=key # feeding into Environmental varibles
client=Groq()
#---------------------------------------------------------------------  --------
#----------------------------------------------------------------------  -------
def invoke_Gork(client, input):
    chat_completion = client.chat.completions.create(
      messages=[
          {
              "role": "user",
              "content": f"{input}",
          }
      ],
      model="llama-3.3-70b-versatile",)
    return chat_completion.choices[0].message.content

#-----------------------------------------------------------------------------
#-----------------------------------------------------------------------------
def invoke_Gork_with_prompt(client,input,prompt):

      chat_completion = client.chat.completions.create(
      messages=[
          {
              "role": "user",
              "content": f"{input}",
          },
          {
              "role": "system",
              "content": f"{prompt}",
          }
      ],
      model="llama-3.3-70b-versatile",)
      return chat_completion.choices[0].message.content

#-----------------------------------------------------------------------------
#-----------------------------------------------------------------------------

qsn=input(" Enter Question: ")
if qsn !="":
  prmpt=input(" Any Prompt Suggestions ...[Yes/No] : ")
  if prmpt.casefold()=='yes':
    prompt=input("Enter Suggestions...: ")
    print(" ")
    print(invoke_Gork_with_prompt(client, qsn,prompt))
  elif prmpt.casefold()=='no':
    print(" ")
    print(invoke_Gork(client, qsn))
  else:
    print(" Please Enter Correct input...! ")
else:
  print(" Please Enter Valid question : ")

