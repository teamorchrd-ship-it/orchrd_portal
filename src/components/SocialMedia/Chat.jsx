import React from 'react';
import { Send, ChevronLeft, MoreVertical } from 'lucide-react';

export const ChatList = ({ chats, onChatSelect, activeChatId }) => (
  <div style={{ flex: 1, overflowY: 'auto' }}>
    <div style={{ padding: '20px 16px 8px 16px' }}>
      <span style={{ fontWeight: '900', fontSize: '1.25rem', color: 'var(--m3-on-bg)', letterSpacing: '-0.5px' }}>Messages</span>
    </div>
    <div style={{ padding: '8px 0' }}>
      {chats.map(chat => (
        <div 
          key={chat.id} 
          onClick={() => onChatSelect(chat)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 16px', 
            cursor: 'pointer',
            backgroundColor: activeChatId === chat.id ? 'var(--m3-surface-variant)' : 'transparent',
            transition: 'background-color 0.2s'
          }}
        >
          <div style={{ position: 'relative' }}>
            <img 
              src={chat.user.avatar} 
              alt={chat.user.name} 
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            {chat.user.status === 'online' && (
              <div style={{ 
                position: 'absolute', 
                bottom: '2px', 
                right: '2px', 
                width: '12px', 
                height: '12px', 
                backgroundColor: '#4CAF50', 
                border: '2px solid var(--m3-surface)', 
                borderRadius: '50%' 
              }} />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--m3-on-surface)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {chat.user.name}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--m3-on-surface-variant)' }}>{chat.timestamp}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ 
                fontSize: '0.8rem', 
                color: chat.unread > 0 ? 'var(--m3-on-surface)' : 'var(--m3-on-surface-variant)', 
                fontWeight: chat.unread > 0 ? '700' : '400',
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                margin: 0
              }}>
                {chat.lastMessage}
              </p>
              {chat.unread > 0 && (
                <div style={{ 
                  backgroundColor: 'var(--m3-primary)', 
                  color: 'var(--m3-on-primary)', 
                  fontSize: '0.65rem', 
                  fontWeight: '700', 
                  padding: '2px 6px', 
                  borderRadius: '10px',
                  minWidth: '18px',
                  textAlign: 'center'
                }}>
                  {chat.unread}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ChatDetail = ({ chat, onBack, isFoldableSidePane }) => {
  const [message, setMessage] = React.useState('');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--m3-surface)' }}>
      {/* Chat Header */}
      <div style={{ 
        padding: '12px 16px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        borderBottom: '1px solid var(--m3-outline-variant)',
        backgroundColor: 'var(--m3-surface)'
      }}>
        {!isFoldableSidePane && (
          <button onClick={onBack} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px', color: 'var(--m3-on-surface)' }}>
            <ChevronLeft size={24} />
          </button>
        )}
        <img 
          src={chat.user.avatar} 
          alt={chat.user.name} 
          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
        />
        <div style={{ flex: 1 }}>
          <span style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: 'var(--m3-on-surface)' }}>{chat.user.name}</span>
          <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--m3-on-surface-variant)' }}>
            {chat.user.status === 'online' ? 'Online' : 'Offline'}
          </span>
        </div>
        <MoreVertical size={20} style={{ color: 'var(--m3-on-surface-variant)' }} />
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {chat.messages.map(msg => (
          <div 
            key={msg.id} 
            style={{ 
              alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: '10px 14px',
              borderRadius: msg.sender === 'me' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
              backgroundColor: msg.sender === 'me' ? 'var(--m3-primary)' : 'var(--m3-secondary-container)',
              color: msg.sender === 'me' ? 'var(--m3-on-primary)' : 'var(--m3-on-secondary-container)',
              fontSize: '0.85rem',
              lineHeight: '1.4',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            {msg.text}
            <div style={{ 
              fontSize: '0.65rem', 
              marginTop: '4px', 
              textAlign: 'right', 
              opacity: 0.7 
            }}>
              {msg.time}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--m3-outline-variant)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ 
            flex: 1, 
            padding: '10px 16px', 
            borderRadius: '24px', 
            border: 'none', 
            backgroundColor: 'var(--m3-surface-variant)',
            color: 'var(--m3-on-surface)',
            fontSize: '0.9rem',
            outline: 'none'
          }} 
        />
        <button style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          backgroundColor: 'var(--m3-primary)', 
          color: 'var(--m3-on-primary)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: message.trim() ? 1 : 0.5
        }}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
