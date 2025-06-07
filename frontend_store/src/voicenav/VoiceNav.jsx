import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceAssist = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const speech = event.results[event.resultIndex][0].transcript.toLowerCase();
      console.log("Heard:", speech);

      if (speech.includes('go to home')) navigate('/');
      else if (speech.includes('go to sign in')) navigate('/login');
      else if (speech.includes('go to join')) navigate('/register');
      else if (speech.includes('search for')) {
        const term = speech.split('search for')[1];
        alert(`Searching for: ${term}`);
      } else if (speech.includes('send message')) {
        const message = speech.split('send message')[1];
        alert(`Message sent: ${message}`);
      }
    };

    recognition.start();

    return () => recognition.stop();
  }, []);

  return <p>🎤 Voice control is ON</p>;
};

export default VoiceAssist;
