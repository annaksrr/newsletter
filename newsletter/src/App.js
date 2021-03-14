import React, { useState } from 'react';
import Popup from './Popup.js';
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return <div>
    <input
    onSubmit={togglePopup}>
    </input>

    {isOpen && <Popup
        content={<>
          <b>YOUR SUBSCRIPTION WAS SUCCESSFUL!</b>
          <p>Thanks for your subscription, we are looking forward to send you the greatest news from us!</p>
          <button>Test button</button>
        </>}
        handleClose={togglePopup}
    />}
  </div>
}

export default App;