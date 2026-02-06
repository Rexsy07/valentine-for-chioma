
import React, { useEffect, useState } from 'react';
import { Camera, Heart, PartyPopper } from 'lucide-react';

const FULL_MESSAGE = `Chioma… I’m really happy you said yes 🥹❤️ You’re officially my Valentine now. No refunds. No returns. Just me and you today tommorrow and forever😘💘`;

const CelebrationPage: React.FC = () => {
  const [typedMessage, setTypedMessage] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedMessage(FULL_MESSAGE.slice(0, i));
      i++;
      if (i > FULL_MESSAGE.length) {
        clearInterval(interval);
        setShowButton(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleScreenshot = () => {
    alert("Smile for the screen, Chioma! 📸 Go ahead and take that screenshot!");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center z-10 relative">
      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-[3rem] shadow-2xl max-w-2xl border-b-8 border-rose-200">
        <div className="flex justify-center mb-6 gap-2">
            <PartyPopper className="text-yellow-500 animate-bounce" size={40} />
            <Heart className="text-rose-500 animate-pulse fill-rose-500" size={48} />
            <PartyPopper className="text-yellow-500 animate-bounce delay-100" size={40} />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-rose-600 mb-6 font-cursive leading-tight">
          YAY!!! CHIOMA SAID YES 🎉💖
        </h1>

        <div className="min-h-[120px] mb-8">
          <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed italic">
            {typedMessage}
            <span className="inline-block w-1 h-6 bg-rose-500 animate-ping ml-1"></span>
          </p>
        </div>

        {showButton && (
          <button
            onClick={handleScreenshot}
            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transform transition-all hover:scale-105 active:scale-95 mx-auto"
          >
            <Camera size={24} />
            📸 Screenshot this and send it to me
          </button>
        )}
      </div>

      <div className="mt-10 text-rose-400 font-semibold animate-pulse">
        See you on the 14th, beautiful! ✨
      </div>
    </div>
  );
};

export default CelebrationPage;
