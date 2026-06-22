import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  MessageSquare, 
  Bell, 
  User, 
  Search, 
  Clock, 
  Smartphone,
  ChevronRight
} from 'lucide-react';
import Feed from './Feed';
import { ChatList, ChatDetail } from './Chat';
import { MOCK_POSTS, MOCK_CHATS } from './mockData';

const SocialBottomNav = ({ activeTab, onTabChange }) => (
  <div className="bottom_nav" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '64px', backgroundColor: 'var(--m3-surface-variant)', borderTop: '1px solid var(--m3-outline-variant)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 10 }}>
    <button onClick={() => onTabChange('feed')} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: activeTab === 'feed' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <HomeIcon size={20} fill={activeTab === 'feed' ? 'currentColor' : 'none'} />
      <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Feed</span>
    </button>
    <button onClick={() => onTabChange('chat')} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: activeTab === 'chat' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <MessageSquare size={20} fill={activeTab === 'chat' ? 'currentColor' : 'none'} />
      <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Chat</span>
    </button>
    <button onClick={() => onTabChange('notifications')} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: activeTab === 'notifications' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <Bell size={20} fill={activeTab === 'notifications' ? 'currentColor' : 'none'} />
      <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Alerts</span>
    </button>
    <button onClick={() => onTabChange('profile')} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: activeTab === 'profile' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <User size={20} fill={activeTab === 'profile' ? 'currentColor' : 'none'} />
      <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Profile</span>
    </button>
  </div>
);

const SocialNavigationRail = ({ activeTab, onTabChange }) => (
  <div className="navigation_rail" style={{ width: '72px', height: '100%', backgroundColor: 'var(--m3-surface-variant)', borderRight: '1px solid var(--m3-outline-variant)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '24px', gap: '24px', zIndex: 10 }}>
    <button onClick={() => onTabChange('feed')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'feed' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <HomeIcon size={20} fill={activeTab === 'feed' ? 'currentColor' : 'none'} />
      <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Feed</span>
    </button>
    <button onClick={() => onTabChange('chat')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'chat' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <MessageSquare size={20} fill={activeTab === 'chat' ? 'currentColor' : 'none'} />
      <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Chat</span>
    </button>
    <button onClick={() => onTabChange('notifications')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'notifications' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <Bell size={20} fill={activeTab === 'notifications' ? 'currentColor' : 'none'} />
      <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Alerts</span>
    </button>
    <button onClick={() => onTabChange('profile')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'profile' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <User size={20} fill={activeTab === 'profile' ? 'currentColor' : 'none'} />
      <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>Profile</span>
    </button>
  </div>
);

const SocialMediaPreview = ({ isExpanded, appConfig }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedChat, setSelectedChat] = useState(null);

  const renderScreen = () => {
    if (activeTab === 'profile') {
      return (
        <div className="app-body" style={{ flex: 1, padding: '64px 24px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--m3-primary-container)', border: '4px solid var(--m3-surface-variant)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <User size={56} style={{ color: 'var(--m3-on-primary-container)' }} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--m3-on-bg)', marginBottom: '4px' }}>Alex Johnson</span>
          <span style={{ fontSize: '0.9rem', opacity: 0.7, color: 'var(--m3-on-bg)', marginBottom: '32px' }}>@alexj_designer</span>
          <div style={{ width: '100%', display: 'flex', gap: '12px', marginBottom: '32px' }}>
             <div style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ display: 'block', fontWeight: '800', fontSize: '1.1rem' }}>245</span>
                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Posts</span>
             </div>
             <div style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ display: 'block', fontWeight: '800', fontSize: '1.1rem' }}>1.2k</span>
                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Followers</span>
             </div>
             <div style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ display: 'block', fontWeight: '800', fontSize: '1.1rem' }}>850</span>
                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Following</span>
             </div>
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <button style={{ width: '100%', backgroundColor: 'var(--m3-primary)', color: 'var(--m3-on-primary)', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: '700' }}>Edit Profile</button>
             <button style={{ width: '100%', backgroundColor: 'transparent', color: 'var(--m3-primary)', border: '2px solid var(--m3-primary)', borderRadius: '12px', padding: '12px', fontWeight: '700' }}>Settings</button>
          </div>
        </div>
      );
    }

    if (activeTab === 'notifications') {
      return (
        <div className="app-body" style={{ flex: 1, padding: '64px 16px 24px 16px' }}>
          <span style={{ fontWeight: '900', fontSize: '1.25rem', color: 'var(--m3-on-bg)', letterSpacing: '-0.5px', marginBottom: '16px', display: 'block' }}>Notifications</span>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--m3-outline-variant)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--m3-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={20} style={{ color: 'var(--m3-on-primary-container)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--m3-on-surface)', margin: 0 }}>
                  <span style={{ fontWeight: '700' }}>Someone</span> liked your post.
                </p>
                <span style={{ fontSize: '0.7rem', color: 'var(--m3-on-surface-variant)' }}>{i * 2}h ago</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'chat') {
      if (isExpanded) {
        return (
          <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', overflow: 'hidden' }}>
            <div style={{ flex: 1.1, borderRight: '1px solid var(--m3-outline-variant)', display: 'flex', flexDirection: 'column', paddingTop: '52px', minWidth: 0 }}>
              <ChatList 
                chats={MOCK_CHATS} 
                onChatSelect={setSelectedChat} 
                activeChatId={selectedChat?.id} 
              />
            </div>
            <div style={{ flex: 1.9, backgroundColor: 'var(--m3-surface)', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              {selectedChat ? (
                <ChatDetail 
                  chat={selectedChat} 
                  onBack={() => setSelectedChat(null)} 
                  isFoldableSidePane={true} 
                />
              ) : (
                <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--m3-on-surface-variant)', fontSize: '0.9rem' }}>
                  Select a message to view the conversation
                </div>
              )}
            </div>
          </div>
        );
      }

      if (selectedChat) {
        return (
          <ChatDetail 
            chat={selectedChat} 
            onBack={() => setSelectedChat(null)} 
          />
        );
      }

      return (
        <div className="app-body" style={{ flex: 1 }}>
          <ChatList chats={MOCK_CHATS} onChatSelect={setSelectedChat} />
        </div>
      );
    }

    // Default: Feed
    return (
      <div className="app-body" style={{ flex: 1 }}>
        <div style={{ padding: '20px 16px 8px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--m3-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src={appConfig.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontWeight: '900', fontSize: '1.25rem', color: 'var(--m3-on-bg)', letterSpacing: '-0.5px' }}>{appConfig.appName}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--m3-surface-variant)', padding: '10px 16px', borderRadius: '24px', margin: '12px 16px 8px 16px', gap: '8px' }}>
          <Search size={18} style={{ color: 'var(--m3-on-surface-variant)' }} />
          <span style={{ color: 'var(--m3-on-surface-variant)', fontSize: '0.85rem' }}>Search feed...</span>
        </div>
        <Feed posts={MOCK_POSTS} />
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      {isExpanded && <SocialNavigationRail activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setSelectedChat(null); }} />}
      
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className="phone-status-bar"><span>9:30</span><div style={{ display: 'flex', gap: '4px' }}><Clock size={10} /><Smartphone size={10} /></div></div>
        
        {renderScreen()}

        {!isExpanded && !selectedChat && (
          <SocialBottomNav activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setSelectedChat(null); }} />
        )}
        <div className="phone-home-indicator" style={{ left: '50%', transform: 'translateX(-50%)' }} />
      </div>
    </div>
  );
};

export default SocialMediaPreview;
