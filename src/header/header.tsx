import { useState, useRef } from 'react';
import './header.css';
import appblurImg from '../images/appblur.png';
import AppPopup from './AppPopup';

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const menuButtonRef = useRef<HTMLImageElement>(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <header className="appHeaderBar">
      <div className="header-content">
        {/* Add your header content on the left if needed */}
        <div className="header-left">
          {/* Add any left-aligned content here */}
        </div>
        
        <div className="header-right">
          <img 
            ref={menuButtonRef}
            src={appblurImg} 
            alt="Apps Menu" 
            className="appHeaderRightImg" 
            onClick={togglePopup}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      <AppPopup 
        isOpen={isPopupOpen} 
        onClose={closePopup} 
        triggerRef={menuButtonRef} 
      />
    </header>
  );
}