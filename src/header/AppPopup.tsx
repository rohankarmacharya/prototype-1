import { useEffect, useRef } from 'react';
import './AppPopup.css';

// Import all the images
import restaurantIcon from '../images/restaurant.png';
import documentIcon from '../images/document.png';
import groupIcon from '../images/group.png';
import recycleIcon from '../images/recycle.png';
import loyalIcon from '../images/loyal.png';
import reportIcon from '../images/report.png';
import systemupdateIcon from '../images/systemupdate.png';
import ticketsIcon from '../images/tickets.png';

interface AppTile {
  id: string;
  name: string;
  icon: string;
  accentColor: string;
}

const appTiles: AppTile[] = [
  { id: 'fnb', name: 'FnB Console', icon: restaurantIcon, accentColor: '#FFD1DC' },
  { id: 'accounting', name: 'JUINO Accounting', icon: documentIcon, accentColor: '#C4E8FF' },
  { id: 'hr', name: 'JUINO HR', icon: groupIcon, accentColor: '#D8F3DC' },
  { id: 'inventory', name: 'JUINO Inventory', icon: recycleIcon, accentColor: '#FFE5B4' },
  { id: 'loyalty', name: 'JUINO Loyalty', icon: loyalIcon, accentColor: '#E0BBE4' },
  { id: 'management', name: 'Management Console', icon: reportIcon, accentColor: '#FFD3B6' },
  { id: 'maintenance', name: 'Operation & Maintenance', icon: systemupdateIcon, accentColor: '#B5EAD7' },
  { id: 'ticketing', name: 'Ticketing Portal', icon: ticketsIcon, accentColor: '#C7CEEA' },
];
const totalTiles = 16;
const extraTiles = totalTiles - appTiles.length; // number of invisible tiles


interface AppPopupProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLImageElement | null>;
}

export default function AppPopup({ isOpen, onClose, triggerRef }: AppPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div className="app-popup-overlay">
      <div className="app-popup" ref={popupRef}>
  <div className="app-grid-container">
    <div className="app-grid">
      {appTiles.map((app) => (
        <div key={app.id} className="app-tile">
          <div 
            className="app-icon-container"
            style={{ backgroundColor: app.accentColor }}
          >
            <img src={app.icon} alt={app.name} className="app-icon"/>
          </div>
          <div className="app-name">{app.name}</div>
        </div>
      ))}
      {/* Extra invisible tiles */}
  {Array.from({ length: extraTiles }).map((_, idx) => (
    <div key={`placeholder-${idx}`} className="app-tile invisible-tile"></div>
  ))}
    </div>
  </div>
  <div className="admin-contact">
    Need access to more apps? Contact your administrator
  </div>
</div>

    </div>
  );
}
