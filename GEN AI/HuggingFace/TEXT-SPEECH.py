import asyncio
import edge_tts
import streamlit as st

st.set_page_config(
    page_title="TTS Test",
    page_icon="🔊"
)

st.title("🔊 Text to Speech Test")

text = st.text_area(
    "Enter text",
    placeholder="Type something here..."
)

if st.button("🔊 Speak", type="primary"):

    if not text.strip():
        st.warning("Please enter some text.")
    else:

        async def generate_speech():
            communicate = edge_tts.Communicate(
                text,
                "en-US-AriaNeural"
            )

            await communicate.save("speech.mp3")

        with st.spinner("Generating speech..."):
            asyncio.run(generate_speech())

        st.success("Speech generated!")

        st.audio(
            "speech.mp3",
            format="audio/mp3",
            autoplay=True
        )