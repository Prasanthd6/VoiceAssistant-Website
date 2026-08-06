import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaCog } from 'react-icons/fa';
import './VoiceNav.css';

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const restartTimeoutRef = useRef(null);

  // Initialize speech recognition (only once)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        console.log('Voice recognition started');
      };
      
      recognition.onend = () => {
        setIsListening(false);
        // Only restart if voice is enabled and permission wasn't denied
        if (voiceEnabled && !permissionDenied) {
          restartTimeoutRef.current = setTimeout(() => {
            try {
              recognition.start();
            } catch (error) {
              console.log('Could not restart recognition:', error);
            }
          }, 100);
        }
      };
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(interimTranscript || finalTranscript);
        
        if (finalTranscript) {
          processCommand(finalTranscript.toLowerCase());
        }
      };
      
      recognition.onerror = (event) => {
        // Handle permission denial specifically
        if (event.error === 'not-allowed') {
          setPermissionDenied(true);
          setVoiceEnabled(false);
          setIsListening(false);
          console.log('Microphone permission denied. Please enable microphone access to use voice control.');
          // Clear any pending restart
          if (restartTimeoutRef.current) {
            clearTimeout(restartTimeoutRef.current);
          }
        } else if (event.error === 'no-speech') {
          // No speech detected - this is normal, don't spam logs
          console.log('No speech detected');
        } else {
          console.log('Speech recognition error:', event.error);
        }
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
    
    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          // Ignore errors during cleanup
        }
      }
    };
  }, []); // Empty dependency array - only run once

  // Process voice commands using NLP-like pattern matching
  const processCommand = (speech) => {
    setIsProcessing(true);
    setLastCommand(speech);
    
    // Navigation commands
    if (speech.includes('home') || speech.includes('dashboard') || speech.includes('main page')) {
      speak('Navigating to home');
      navigate('/');
    }
    else if (speech.includes('login') || speech.includes('sign in') || speech.includes('log in')) {
      speak('Navigating to login page');
      navigate('/login');
    }
    else if (speech.includes('register') || speech.includes('sign up') || speech.includes('join') || speech.includes('create account')) {
      speak('Navigating to registration page');
      navigate('/register');
    }
    else if (speech.includes('gigs') || speech.includes('services') || speech.includes('browse')) {
      speak('Showing all services and gigs');
      navigate('/gigs');
    }
    else if (speech.includes('orders') || speech.includes('my orders')) {
      speak('Showing your orders');
      navigate('/orders');
    }
    else if (speech.includes('messages') || speech.includes('chat') || speech.includes('inbox')) {
      speak('Opening your messages');
      navigate('/messages');
    }
    else if (speech.includes('add gig') || speech.includes('create gig') || speech.includes('post service') || speech.includes('new service')) {
      speak('Opening create gig page');
      navigate('/add');
    }
    else if (speech.includes('my gigs') || speech.includes('my services')) {
      speak('Showing your gigs');
      navigate('/mygigs');
    }
    else if (speech.includes('profile') || speech.includes('account') || speech.includes('settings') || speech.includes('seller')) {
      speak('Opening profile settings');
      navigate('/seller');
    }
    
    // Search commands
    else if (speech.includes('search for') || speech.includes('find') || speech.includes('look for')) {
      const searchTerm = speech.replace(/search for|find|look for/gi, '').trim();
      if (searchTerm) {
        speak(`Searching for ${searchTerm}`);
        navigate(`/gigs?search=${encodeURIComponent(searchTerm)}`);
        // Try to find and fill search input
        setTimeout(() => {
          const searchInput = document.querySelector('input[type="text"], input[placeholder*="search"], input[placeholder*="Search"]');
          if (searchInput) {
            searchInput.value = searchTerm;
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            searchInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }, 500);
      } else {
        speak('What would you like to search for?');
      }
    }
    
    // Filter commands
    else if (speech.includes('filter by') || speech.includes('show only')) {
      const filter = speech.replace(/filter by|show only/gi, '').trim();
      speak(`Filtering by ${filter}`);
      navigate(`/gigs?search=${encodeURIComponent(filter)}`);
    }
    
    // Open specific gig by number
    else if (speech.includes('open gig') || speech.includes('show gig') || speech.includes('view gig')) {
      const gigNumber = speech.match(/\d+/);
      if (gigNumber) {
        const gigId = gigNumber[0];
        speak(`Opening gig ${gigId}`);
        navigate(`/gig/${gigId}`);
      } else {
        speak('Which gig would you like to open? Please say the gig number');
      }
    }
    
    // Click button commands - comprehensive patterns
    else if (speech.includes('click') || speech.includes('press') || speech.includes('select') || 
             speech.includes('login me') || speech.includes('enter login') || speech.includes('hit') ||
             speech.includes('tap') || speech.includes('trigger')) {
      
      let buttonText = speech
        .replace(/click|press|select|login me|enter login|hit|tap|trigger/gi, '')
        .replace(/button/gi, '')
        .trim();
      
      // Handle common button text variations
      if (speech.includes('login me') || speech.includes('enter login')) {
        buttonText = 'login';
      } else if (speech.includes('register') || speech.includes('sign up') || speech.includes('join')) {
        buttonText = 'register';
      } else if (speech.includes('submit')) {
        buttonText = 'submit';
      } else if (speech.includes('send')) {
        buttonText = 'send';
      }
      
      if (buttonText) {
        speak(`Looking for button: ${buttonText}`);
        
        setTimeout(() => {
          // Try to find button by text content
          const buttons = document.querySelectorAll('button, a, .btn, input[type="submit"]');
          let found = false;
          
          buttons.forEach(btn => {
            const btnText = btn.textContent?.toLowerCase() || btn.value?.toLowerCase() || '';
            if (btnText.includes(buttonText.toLowerCase())) {
              btn.click();
              found = true;
              speak(`Clicked ${buttonText}`);
            }
          });
          
          // If not found by text, try by type
          if (!found) {
            if (buttonText === 'login' || buttonText === 'submit') {
              const submitBtn = document.querySelector('button[type="submit"], input[type="submit"]');
              if (submitBtn) {
                submitBtn.click();
                found = true;
                speak(`Clicked submit button`);
              }
            }
          }
          
          if (!found) {
            speak(`Could not find button: ${buttonText}`);
          }
        }, 500);
      }
    }
    
    // Form input commands - target specific fields by label/name
    else if (speech.includes('username') || speech.includes('user name')) {
      const match = speech.match(/username\s+(.+)/i) || speech.match(/user name\s+(.+)/i);
      if (match) {
        const username = match[1].trim();
        speak(`Entering username: ${username}`);
        setTimeout(() => {
          const inputs = document.querySelectorAll('input[name="username"], input[placeholder*="username"], input[placeholder*="Username"]');
          if (inputs.length > 0) {
            inputs[0].value = username;
            inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
            inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
            speak('Username entered');
          } else {
            speak('Username field not found');
          }
        }, 500);
      }
    }
    else if (speech.includes('password')) {
      const match = speech.match(/password\s+(.+)/i);
      if (match) {
        const password = match[1].trim();
        speak(`Entering password`);
        setTimeout(() => {
          const inputs = document.querySelectorAll('input[name="password"], input[type="password"]');
          if (inputs.length > 0) {
            inputs[0].value = password;
            inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
            inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
            speak('Password entered');
          } else {
            speak('Password field not found');
          }
        }, 500);
      }
    }
    else if (speech.includes('email')) {
      const match = speech.match(/email\s+(.+)/i);
      if (match) {
        const email = match[1].trim();
        speak(`Entering email: ${email}`);
        setTimeout(() => {
          const inputs = document.querySelectorAll('input[name="email"], input[type="email"], input[placeholder*="email"]');
          if (inputs.length > 0) {
            inputs[0].value = email;
            inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
            inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
            speak('Email entered');
          } else {
            speak('Email field not found');
          }
        }, 500);
      }
    }
    else if (speech.includes('phone') || speech.includes('mobile')) {
      const match = speech.match(/phone\s+(.+)/i) || speech.match(/mobile\s+(.+)/i);
      if (match) {
        const phone = match[1].trim();
        speak(`Entering phone: ${phone}`);
        setTimeout(() => {
          const inputs = document.querySelectorAll('input[name="phone"], input[placeholder*="phone"]');
          if (inputs.length > 0) {
            inputs[0].value = phone;
            inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
            inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
            speak('Phone entered');
          } else {
            speak('Phone field not found');
          }
        }, 500);
      }
    }
    else if (speech.includes('country')) {
      const match = speech.match(/country\s+(.+)/i);
      if (match) {
        const country = match[1].trim();
        speak(`Entering country: ${country}`);
        setTimeout(() => {
          const inputs = document.querySelectorAll('input[name="country"], input[placeholder*="country"]');
          if (inputs.length > 0) {
            inputs[0].value = country;
            inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
            inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
            speak('Country entered');
          } else {
            speak('Country field not found');
          }
        }, 500);
      }
    }
    else if (speech.includes('description') || speech.includes('desc')) {
      const match = speech.match(/description\s+(.+)/i) || speech.match(/desc\s+(.+)/i);
      if (match) {
        const desc = match[1].trim();
        speak(`Entering description`);
        setTimeout(() => {
          const textareas = document.querySelectorAll('textarea[name="desc"], textarea[name="description"]');
          if (textareas.length > 0) {
            textareas[0].value = desc;
            textareas[0].dispatchEvent(new Event('input', { bubbles: true }));
            textareas[0].dispatchEvent(new Event('change', { bubbles: true }));
            speak('Description entered');
          } else {
            speak('Description field not found');
          }
        }, 500);
      }
    }
    // Generic enter command for other fields
    else if (speech.includes('enter') || speech.includes('type') || speech.includes('fill')) {
      const parts = speech.split(/enter|type|fill/i);
      if (parts.length > 1) {
        const textToEnter = parts[1].trim();
        speak(`Entering text: ${textToEnter}`);
        
        setTimeout(() => {
          const activeElement = document.activeElement;
          if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            activeElement.value = textToEnter;
            activeElement.dispatchEvent(new Event('input', { bubbles: true }));
            activeElement.dispatchEvent(new Event('change', { bubbles: true }));
            speak('Text entered');
          } else {
            // Try to find first input
            const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
            if (inputs.length > 0) {
              inputs[0].value = textToEnter;
              inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
              inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
              speak('Text entered in first field');
            } else {
              speak('No input field found');
            }
          }
        }, 500);
      }
    }
    
    // Submit form
    else if (speech.includes('submit') || speech.includes('send') || speech.includes('confirm')) {
      speak('Submitting form');
      setTimeout(() => {
        const submitButton = document.querySelector('button[type="submit"], input[type="submit"]');
        if (submitButton) {
          submitButton.click();
        } else {
          const forms = document.querySelectorAll('form');
          if (forms.length > 0) {
            forms[0].dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
          }
        }
      }, 500);
    }
    
    // Action commands
    else if (speech.includes('scroll up') || speech.includes('go up')) {
      speak('Scrolling up');
      window.scrollBy({ top: -300, behavior: 'smooth' });
    }
    else if (speech.includes('scroll down') || speech.includes('go down')) {
      speak('Scrolling down');
      window.scrollBy({ top: 300, behavior: 'smooth' });
    }
    else if (speech.includes('top') || speech.includes('go to top')) {
      speak('Going to top of page');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else if (speech.includes('bottom') || speech.includes('go to bottom')) {
      speak('Going to bottom of page');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
    
    // Voice control commands
    else if (speech.includes('stop listening') || speech.includes('disable voice') || speech.includes('turn off voice')) {
      speak('Voice control disabled');
      setVoiceEnabled(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
 }
    }
    else if (speech.includes('start listening') || speech.includes('enable voice') || speech.includes('turn on voice')) {
      speak('Voice control enabled');
      setVoiceEnabled(true);
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    }
    else if (speech.includes('repeat') || speech.includes('say again')) {
      speak(lastCommand || 'No previous command');
    }
    
    // Help commands
    else if (speech.includes('help') || speech.includes('what can i say') || speech.includes('commands')) {
      speak('You can say: go to home, login, register, search for something, show gigs, show orders, show messages, scroll up or down, go to top or bottom, click button, enter text, submit form, open gig number, and more');
    }
    
    // Logout
    else if (speech.includes('logout') || speech.includes('log out') || speech.includes('sign out')) {
      speak('Logging out');
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
    
    else {
      speak(`I heard: ${speech}. I didn\'t understand that command. Say help for available commands.`);
    }
    
    setTimeout(() => setIsProcessing(false), 1000);
  };

  // Text-to-speech function
  const speak = (text) => {
    if (synthRef.current && voiceEnabled) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      synthRef.current.speak(utterance);
    }
  };

  const toggleListening = async () => {
    // If turning on voice control
    if (!voiceEnabled) {
      // Reset permission denied state
      setPermissionDenied(false);
      
      try {
        if (recognitionRef.current) {
          await recognitionRef.current.start();
          setVoiceEnabled(true);
          speak('Voice control enabled');
        }
      } catch (error) {
        console.log('Failed to start voice recognition:', error);
        if (error.name === 'NotAllowedError' || error.message?.includes('not-allowed')) {
          setPermissionDenied(true);
          speak('Microphone access denied. Please allow microphone access to use voice control.');
        }
      }
    } 
    // If turning off voice control
    else {
      setVoiceEnabled(false);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.log('Error stopping recognition:', error);
        }
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      speak('Voice control disabled');
    }
  };

  return (
    <div className="voice-assistant">
      <div className="voice-button-container">
        <button 
          className={`voice-button ${isListening ? 'listening' : ''} ${isProcessing ? 'processing' : ''} ${permissionDenied ? 'error' : ''}`}
          onClick={toggleListening}
          title={voiceEnabled ? 'Disable voice control' : 'Enable voice control'}
        >
          {permissionDenied ? <FaMicrophoneSlash /> : isListening ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        
        {showSettings && (
          <div className="voice-settings">
            <div className="settings-header">
              <h3>Voice Settings</h3>
              <button onClick={() => setShowSettings(false)}>×</button>
            </div>
            <div className="settings-content">
              {permissionDenied && (
                <div className="permission-warning">
                  ⚠️ Microphone access denied. Please allow microphone access in your browser settings.
                </div>
              )}
              <label>
                <input 
                  type="checkbox" 
                  checked={voiceEnabled} 
                  onChange={(e) => {
                    if (e.target.checked) {
                      toggleListening();
                    } else {
                      setVoiceEnabled(false);
                      if (recognitionRef.current) {
                        try {
                          recognitionRef.current.stop();
                        } catch (error) {
                          console.log('Error stopping recognition:', error);
                        }
                      }
                      if (restartTimeoutRef.current) {
                        clearTimeout(restartTimeoutRef.current);
                      }
                    }
                  }}
                  disabled={permissionDenied}
                />
                Enable Voice Control
              </label>
              <button onClick={() => speak('Voice control is active')}>Test Voice</button>
              <button onClick={() => speak('You can say: go to home, login, register, search for services, show gigs, show orders, show messages, scroll up or down, go to top or bottom, and more')}>
                Available Commands
              </button>
            </div>
          </div>
        )}
        
        <button 
          className="settings-button"
          onClick={() => setShowSettings(!showSettings)}
          title="Voice settings"
        >
          <FaCog />
        </button>
      </div>
      
      {(isListening || transcript || permissionDenied) && (
        <div className="voice-status">
          {permissionDenied && <div className="error-message">🚫 Microphone access denied</div>}
          {isListening && <div className="listening-indicator">🎤 Listening...</div>}
          {transcript && <div className="transcript">{transcript}</div>}
          {lastCommand && <div className="last-command">Last: {lastCommand}</div>}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
