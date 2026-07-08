import streamlit as st
m
st.write(st.session_state)
count=0
if 'count_var' not in st.session_state:
     st.session_state['count_var']=0
else:
     st.session_state['count_var']+=1

st.write(st.session_state)
