// frontend/components/ChatWidget.js
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();
  const inputRef = useRef();

  // auto‐scroll on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // focus on input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const send = async () => {
    if (!input.trim()) return;
    const query = input;
    setMessages((m) => [...m, { from: 'user', text: input }]);
    setInput('');
    setMessages((m) => [...m, { from: 'bot', text: 'Typing…' }]);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const { answer } = await res.json();
      setMessages((m) =>
        m.map((msg, i) =>
          msg.text === 'Typing…' && msg.from === 'bot'
            ? { from: 'bot', text: answer }
            : msg
        )
      );
    } catch (err) {
      setMessages((m) =>
        m.map((msg, i) =>
          msg.text === 'Typing…' && msg.from === 'bot'
            ? { from: 'bot', text: 'Sorry, something went wrong.' }
            : msg
        )
      );
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
      {open && (
        <div className="w-80 h-96 bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center px-4 py-2 bg-gradient-to-r from-secondary to-primary text-white">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            <span className="ml-2 font-semibold">AI Assistant</span>
            <button
              className="ml-auto text-xl hover:opacity-80"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 px-4 py-2 overflow-y-auto space-y-3">
  {messages.map((m, i) => (
    <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className="flex items-start gap-2">
        {m.from === 'bot' && <div className="text-lg mt-1">🤖</div>}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`max-w-[70%] px-3 py-2 rounded-lg ${
            m.from === 'user'
              ? 'bg-primary text-white rounded-tr-none'
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}
        >
          <div className="text-sm whitespace-pre-wrap">{m.text}</div>
          <div className="text-[10px] text-right opacity-60 mt-1">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </motion.div>

        {m.from === 'user' && <div className="text-lg mt-1">🧑</div>}
      </div>
    </div>
  ))}
  <div ref={scrollRef} />
</div>


          {/* Input Area */}
          <div className="px-4 py-2 border-t bg-white/50 flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <button
              onClick={send}
              className="bg-primary text-white p-2 rounded-full hover:bg-opacity-90 transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Open Chat Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-gradient-to-br from-secondary to-accent text-white p-4 rounded-full shadow-lg hover:scale-110 transform transition"
      >
        💬
      </button>
    </div>
  );
}
