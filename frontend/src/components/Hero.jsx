import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PhoneKeypad from './PhoneKeypad';
import { portfolioData } from '../mock/mockData';

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const keypadRef = useRef(null);

  // Scroll to keypad if navigated back from another page
  useEffect(() => {
    if (location.state?.scrollToKeypad && keypadRef.current) {
      setTimeout(() => {
        keypadRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [location]);

  const messages = [
    "Welcome to the SHO-verse, where we 'SHO' up for the good of storytelling",
    "We don't put ideas on hold",
    "You've reached the department for creative thinking",
    "All our lines are busy. Thinking.",
    "We apologize for the wait. Good ideas take longer."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const handleKeyPress = (key) => {
    setIsConnecting(true);
    
    setTimeout(() => {
      setIsConnecting(false);
      
      switch (key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
          navigate(`/brand/${key}`);
          break;
        case '0':
          navigate('/', { state: { scrollToKeypad: true } });
          break;
        case '*':
          navigate('/about');
          break;
        case '#':
          navigate('/contact');
          break;
        default:
          break;
      }
    }, 800);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-transparent pt-20 px-6 relative">      
      <div className="w-full mx-auto max-w-7xl relative z-10">
        <div className="text-center">
          {/* Name Section */}
          <div className="mb-16">
            <p className="text-white/50 text-[0.7rem] tracking-[0.4em] uppercase font-light mb-10">Creative Helpline</p>
            
            <div className="flex flex-col items-center gap-6">
              <p 
                className="text-white/80 uppercase"
                style={{ 
                  fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                  fontWeight: '400',
                  letterSpacing: '0.55em',
                }}
              >
                Souhitya
              </p>
              <h1
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: 'clamp(5rem, 14vw, 12rem)',
                  fontWeight: '400',
                  letterSpacing: '0.12em',
                  color: 'transparent',
                  WebkitTextStroke: '2.5px rgba(255,255,255,0.75)',
                  lineHeight: '1',
                  filter: 'drop-shadow(0 0 80px rgba(160,220,210,0.12)) drop-shadow(0 0 30px rgba(180,230,220,0.08))',
                }}
              >
                SHO
              </h1>
              <p 
                className="text-white/80 uppercase"
                style={{ 
                  fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                  fontWeight: '400',
                  letterSpacing: '0.55em',
                }}
              >
                Sar
              </p>
            </div>

            <p className="text-white/50 text-[0.65rem] tracking-[0.3em] uppercase font-light mt-10 mb-6">
              Creative Lead / Content Strategist
            </p>

            <div className="inline-flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px rgba(74,222,128,0.5)' }}></div>
              <span className="text-white/55 text-[0.65rem] font-mono tracking-[0.15em]">
                {isConnecting ? 'connecting...' : 'connected'}
              </span>
            </div>
          </div>

          {/* Continuous Scrolling Ticker */}
          <div className="ticker-wrap mb-16">
            <div className="ticker">
              <span className="ticker-item">Welcome to the 'SHO'verse, where we 'SHO' up for good storytelling // You've reached the department of better thinking // We don't put ideas on hold // All our lines are busy. Thinking // We apologise for the wait. Good ideas take longer //</span>
            </div>
          </div>

          {/* Tagline */}
          <div className="mb-16">
            <p className="text-base md:text-lg text-white/70 font-light tracking-wide leading-relaxed">
              Hi, I'm Souhitya (I know, just call me SHO). And I have a (fairly) easy job.
            </p>
            <p className="text-base md:text-lg text-white/90 font-semibold tracking-wide leading-relaxed">
              I write copy. The rest the copy does for itself.
            </p>
          </div>

          {/* Phone Keypad */}
          <div className="mb-16" ref={keypadRef}>
            <p className="text-sm tracking-[0.15em] text-white/50 font-light mb-1">
              Thank you for calling. Let's connect you to some interesting work.
            </p>
            <p className="text-sm tracking-[0.25em] text-white/50 uppercase font-light mb-8">
              Dial away
            </p>
            <PhoneKeypad onKeyPress={handleKeyPress} disabled={isConnecting} />
          </div>

          {/* Footer */}
          <div className="text-white/30 text-sm font-light italic">
            <p>Providing creative support since 2022</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
