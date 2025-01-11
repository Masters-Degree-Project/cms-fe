import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useCallback } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type MessageOptions = {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
};

type MessageContextType = {
  showMessage: (text: string, options?: MessageOptions) => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }


return context;
};

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(3000);

  const showMessage = useCallback(
    (text: string, options: MessageOptions = {}) => {
      setMessage(text);

      if (options.type){
        setType(options.type);
      }

      if (options.duration) {
        setDuration(options.duration);
      }

      setOpen(true);
    },
    []
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: '100%', maxWidth: '500px' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </MessageContext.Provider>
  );
};
