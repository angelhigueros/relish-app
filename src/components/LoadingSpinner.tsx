import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="has-text-centered p-6">
      <div className="loader-wrapper">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="mt-4 has-text-grey">{message}</p>
      </div>
      
      <style>{`
        .loader-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .lds-ring {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        
        .lds-ring div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: 64px;
          height: 64px;
          margin: 8px;
          border: 8px solid #3273dc;
          border-radius: 50%;
          animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: #3273dc transparent transparent transparent;
        }
        
        .lds-ring div:nth-child(1) {
          animation-delay: -0.45s;
        }
        
        .lds-ring div:nth-child(2) {
          animation-delay: -0.3s;
        }
        
        .lds-ring div:nth-child(3) {
          animation-delay: -0.15s;
        }
        
        @keyframes lds-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;