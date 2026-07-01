import { useState } from 'react';
import { Home as HomeIcon, MessageSquare, Bell, User, Search, Plus } from 'lucide-react';
import Feed from './Feed';
import { ChatList, ChatDetail } from './Chat';
import { CONTENT_PRESETS, MOCK_CHATS } from './mockData';

/* ── Stories Strip ────────────────────────────────────────── */
const STORY_USERS = [
  { name: 'You',    avatar: null, isOwn: true },
  { name: 'Sarah',  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face' },
  { name: 'Marcus', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face' },
  { name: 'Elena',  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face' },
  { name: 'James',  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face' },
];

const StoriesStrip = () => (
  <div style={{ display: 'flex', gap: 10, padding: '10px 14px', overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '1px solid var(--m3-outline-variant)' }}>
    {STORY_USERS.map((s, i) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%', padding: 2,
          background: s.isOwn ? 'var(--m3-surface-variant)' : 'linear-gradient(135deg, var(--m3-primary) 0%, var(--m3-secondary) 100%)',
        }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--m3-bg)', background: 'var(--m3-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {s.avatar
              ? <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <Plus size={14} style={{ color: 'var(--m3-primary)' }} />
            }
          </div>
        </div>
        <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--m3-on-surface-variant)', maxWidth: 48, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {s.name}
        </span>
      </div>
    ))}
  </div>
);

/* ── Bottom Nav ───────────────────────────────────────────── */
const BottomNav = ({ activeTab, onTabChange, features }) => {
  const tabs = [
    { id: 'feed',          icon: HomeIcon,      label: 'Home',    always: true },
    { id: 'chat',          icon: MessageSquare, label: 'Chat',    key: 'chat' },
    { id: 'notifications', icon: Bell,          label: 'Alerts',  key: 'notifications' },
    { id: 'profile',       icon: User,          label: 'Profile', key: 'profile' },
  ].filter(t => t.always || features[t.key]);

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, background: 'var(--m3-surface-variant)', borderTop: '1px solid var(--m3-outline-variant)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 10 }}>
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: activeTab === id ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)', paddingBottom: 8 }}
        >
          <Icon size={19} fill={activeTab === id ? 'currentColor' : 'none'} />
          <span style={{ fontSize: '0.6rem', fontWeight: 600 }}>{label}</span>
        </button>
      ))}
    </div>
  );
};

/* ── Nav Rail (foldable) ──────────────────────────────────── */
const NavRail = ({ activeTab, onTabChange, features }) => {
  const tabs = [
    { id: 'feed',          icon: HomeIcon,      label: 'Home',    always: true },
    { id: 'chat',          icon: MessageSquare, label: 'Chat',    key: 'chat' },
    { id: 'notifications', icon: Bell,          label: 'Alerts',  key: 'notifications' },
    { id: 'profile',       icon: User,          label: 'Profile', key: 'profile' },
  ].filter(t => t.always || features[t.key]);

  return (
    <div style={{ width: 70, background: 'var(--m3-surface-variant)', borderRight: '1px solid var(--m3-outline-variant)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, gap: 20, zIndex: 10 }}>
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: activeTab === id ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 99, background: activeTab === id ? 'var(--m3-primary-container)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s ease' }}>
            <Icon size={18} fill={activeTab === id ? 'currentColor' : 'none'} />
          </div>
          <span style={{ fontSize: '0.58rem', fontWeight: 600 }}>{label}</span>
        </button>
      ))}
    </div>
  );
};

/* ── Profile Screen ───────────────────────────────────────── */
const ProfileScreen = () => (
  <div className="app-body" style={{ padding: '64px 20px 20px', alignItems: 'center' }}>
    <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--m3-primary-container)', border: '3px solid var(--m3-surface-variant)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--m3-on-bg)', marginBottom: 2 }}>Alex Johnson</span>
    <span style={{ fontSize: '0.82rem', opacity: 0.6, color: 'var(--m3-on-bg)', marginBottom: 20 }}>@alexj_designer</span>
    <div style={{ width: '100%', display: 'flex', gap: 8, marginBottom: 20 }}>
      {[['245', 'Posts'], ['1.2k', 'Followers'], ['850', 'Following']].map(([n, l]) => (
        <div key={l} style={{ flex: 1, textAlign: 'center', padding: '10px 0', background: 'var(--m3-surface-variant)', borderRadius: 12 }}>
          <span style={{ display: 'block', fontWeight: 800, fontSize: '1rem', color: 'var(--m3-on-surface)' }}>{n}</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--m3-on-surface-variant)' }}>{l}</span>
        </div>
      ))}
    </div>
    <button style={{ width: '100%', background: 'var(--m3-primary)', color: 'var(--m3-on-primary)', border: 'none', borderRadius: 12, padding: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}>
      Edit Profile
    </button>
  </div>
);

/* ── Notifications Screen ─────────────────────────────────── */
const NotificationsScreen = () => (
  <div className="app-body" style={{ padding: '64px 16px 16px' }}>
    <span style={{ fontWeight: 900, fontSize: '1.15rem', color: 'var(--m3-on-bg)', letterSpacing: '-0.4px', marginBottom: 14, display: 'block' }}>Notifications</span>
    {[
      { text: 'Sarah Chen liked your post.', time: '2m ago' },
      { text: 'Marcus Miller commented: "Great work!"', time: '14m ago' },
      { text: 'Elena Rodriguez started following you.', time: '1h ago' },
      { text: 'Your post reached 500 likes.', time: '3h ago' },
    ].map((n, i) => (
      <div key={i} style={{ display: 'flex', gap: 10, padding: '11px 0', borderBottom: '1px solid var(--m3-outline-variant)' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--m3-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Bell size={16} style={{ color: 'var(--m3-primary)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--m3-on-surface)', margin: 0, lineHeight: 1.4 }}>{n.text}</p>
          <span style={{ fontSize: '0.68rem', color: 'var(--m3-on-surface-variant)' }}>{n.time}</span>
        </div>
      </div>
    ))}
  </div>
);

/* ── Main Component ───────────────────────────────────────── */
const SocialMediaPreview = ({ isExpanded, appConfig }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedChat, setSelectedChat] = useState(null);

  const features = appConfig.features || {};
  const posts = CONTENT_PRESETS[appConfig.contentStyle] || CONTENT_PRESETS.professional;

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSelectedChat(null);
  };

  const showBottomNav = features.bottomNav !== false;

  const renderScreen = () => {
    if (activeTab === 'profile' && features.profile) return <ProfileScreen />;

    if (activeTab === 'notifications' && features.notifications) return <NotificationsScreen />;

    if (activeTab === 'chat' && features.chat) {
      if (isExpanded) {
        return (
          <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', overflow: 'hidden' }}>
            <div style={{ flex: 1.1, borderRight: '1px solid var(--m3-outline-variant)', display: 'flex', flexDirection: 'column', paddingTop: 52, minWidth: 0 }}>
              <ChatList chats={MOCK_CHATS} onChatSelect={setSelectedChat} activeChatId={selectedChat?.id} />
            </div>
            <div style={{ flex: 1.9, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--m3-surface)' }}>
              {selectedChat
                ? <ChatDetail chat={selectedChat} onBack={() => setSelectedChat(null)} isFoldableSidePane />
                : <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--m3-on-surface-variant)', fontSize: '0.85rem' }}>Select a conversation</div>
              }
            </div>
          </div>
        );
      }
      if (selectedChat) return <ChatDetail chat={selectedChat} onBack={() => setSelectedChat(null)} />;
      return <div className="app-body" style={{ flex: 1 }}><ChatList chats={MOCK_CHATS} onChatSelect={setSelectedChat} /></div>;
    }

    /* Feed — sticky header + independently scrolling feed */
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 52, paddingBottom: showBottomNav ? 64 : 0, background: 'var(--m3-bg)' }}>
        {/* Sticky app bar */}
        <div style={{ padding: '12px 14px 8px', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--m3-bg)', flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--m3-primary-container)', overflow: 'hidden', flexShrink: 0 }}>
            <img src={appConfig.logoUrl} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--m3-on-bg)', letterSpacing: '-0.4px', flex: 1 }}>
            {appConfig.appName}
          </span>
          {features.search && <Search size={17} style={{ color: 'var(--m3-on-surface-variant)' }} />}
          {features.notifications && (
            <div style={{ position: 'relative' }}>
              <Bell size={17} style={{ color: 'var(--m3-on-surface-variant)' }} />
              <div style={{ position: 'absolute', top: -2, right: -2, width: 6, height: 6, borderRadius: '50%', background: 'var(--m3-primary)', border: '1.5px solid var(--m3-bg)' }} />
            </div>
          )}
        </div>

        {/* Sticky stories strip */}
        {features.stories && <StoriesStrip />}

        {/* Scrollable feed only */}
        <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
          <Feed posts={posts} layoutStyle={appConfig.layoutStyle} />
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', overflow: 'hidden', position: 'relative', className: 'preview-enter' }}>
      {isExpanded && <NavRail activeTab={activeTab} onTabChange={changeTab} features={features} />}

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Status bar */}
        <div className="phone-status-bar">
          <span>9:30</span>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <span style={{ fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.05em' }}>●●●</span>
            <span style={{ fontSize: '0.52rem', fontWeight: 800 }}>100%</span>
          </div>
        </div>

        {renderScreen()}

        {!isExpanded && showBottomNav && !selectedChat && (
          <BottomNav activeTab={activeTab} onTabChange={changeTab} features={features} />
        )}

        {/* FAB */}
        {features.fab && activeTab === 'feed' && (
          <button style={{
            position: 'absolute', bottom: showBottomNav ? 80 : 16, right: 14,
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--m3-primary)', color: 'var(--m3-on-primary)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(103,80,164,0.4)',
            zIndex: 9,
          }}>
            <Plus size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialMediaPreview;
