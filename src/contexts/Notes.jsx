import {createContext, useState} from 'react';

const NotesContext = createContext({notes: [], setNotes: () => {}});

const NotesProvider = ({children}) => {
  // states
  const [notes, setNotes] = useState([]);

  return (
    <NotesContext.Provider value={{notes, setNotes}}>
      {children}
    </NotesContext.Provider>
  );
};

export {NotesContext, NotesProvider};
