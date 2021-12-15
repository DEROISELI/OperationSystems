import React from 'react';
import './FoundSolutions.css';

function FoundSolutions({ words, headerText}){
  return (
    <div className="Found-solutions-list">
    
      {words.length > 0 &&
        <h4>{headerText}: {words.length}</h4>
      }
      <u1>
        {words.map((solution) => {return <li key={solution}>{solution}</li>
                                 })}
      </u1>
    </div>
  );
}
export default FoundSolutions;
    