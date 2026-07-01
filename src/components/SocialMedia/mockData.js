const AVATARS = {
  sarah:  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  marcus: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  elena:  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
  james:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  aisha:  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
};

export const CONTENT_PRESETS = {
  professional: [
    {
      id: 1,
      user: { name: 'Sarah Chen', avatar: AVATARS.sarah, handle: '@sarahc' },
      content: 'Just launched my new portfolio! 🚀 Months of iteration finally shipped. The compound effect of small daily improvements is real.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop',
      likes: 124, comments: 18, timestamp: '2h ago',
    },
    {
      id: 2,
      user: { name: 'Marcus Miller', avatar: AVATARS.marcus, handle: '@marcusm' },
      content: 'Q3 results are in. The team crushed it. Revenue up 38%, NPS at an all-time high. Proud doesn\'t begin to cover it.',
      likes: 212, comments: 34, timestamp: '5h ago',
    },
    {
      id: 3,
      user: { name: 'Elena Rodriguez', avatar: AVATARS.elena, handle: '@elenar' },
      content: 'Speaking at ProductConf tomorrow. If you\'re attending, come say hi — I\'ll be at booth 14 after the keynote.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=340&fit=crop',
      likes: 87, comments: 11, timestamp: '8h ago',
    },
  ],
  startup: [
    {
      id: 1,
      user: { name: 'James Wilson', avatar: AVATARS.james, handle: '@jwilson' },
      content: 'We went from idea to $10k MRR in 90 days. No VC. No co-working spaces. Just a MacBook and obsession. Thread 🧵',
      likes: 841, comments: 97, timestamp: '1h ago',
    },
    {
      id: 2,
      user: { name: 'Aisha Patel', avatar: AVATARS.aisha, handle: '@aishap' },
      content: 'Cold emailed 200 people last week. 4 replied. 2 became customers. Rejection is just redirection. Keep shipping. 🔥',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=340&fit=crop',
      likes: 556, comments: 44, timestamp: '3h ago',
    },
    {
      id: 3,
      user: { name: 'Marcus Miller', avatar: AVATARS.marcus, handle: '@marcusm' },
      content: 'Raised our seed round 🎉 $1.2M from angels who actually build things. Back to work immediately. No big announcement parties.',
      likes: 1204, comments: 88, timestamp: '6h ago',
    },
  ],
  fashion: [
    {
      id: 1,
      user: { name: 'Elena Rodriguez', avatar: AVATARS.elena, handle: '@elenar' },
      content: 'Minimalism isn\'t about having less. It\'s about making room for what matters. This season\'s edit is everything. ✨',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=340&fit=crop',
      likes: 3240, comments: 142, timestamp: '1h ago',
    },
    {
      id: 2,
      user: { name: 'Aisha Patel', avatar: AVATARS.aisha, handle: '@aishap' },
      content: 'Paris Fashion Week recap: the silhouettes, the texture, the audacity. Some looks I\'ll be recreating immediately. 🇫🇷',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=340&fit=crop',
      likes: 1890, comments: 67, timestamp: '4h ago',
    },
    {
      id: 3,
      user: { name: 'Sarah Chen', avatar: AVATARS.sarah, handle: '@sarahc' },
      content: 'Vintage finds from this weekend\'s haul. Thrifting > fast fashion every single time. The planet agrees.',
      likes: 920, comments: 38, timestamp: '7h ago',
    },
  ],
  technology: [
    {
      id: 1,
      user: { name: 'Marcus Miller', avatar: AVATARS.marcus, handle: '@marcusm' },
      content: 'Ran 100k tokens through Claude 4 last night. The context retention across multi-step reasoning is genuinely different. Notes below 👇',
      likes: 445, comments: 62, timestamp: '2h ago',
    },
    {
      id: 2,
      user: { name: 'James Wilson', avatar: AVATARS.james, handle: '@jwilson' },
      content: 'Hot take: the browser is becoming the operating system. Fifteen years in and we\'re finally seeing Chromebooks do everything I thought they would in 2010.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=340&fit=crop',
      likes: 768, comments: 91, timestamp: '5h ago',
    },
    {
      id: 3,
      user: { name: 'Sarah Chen', avatar: AVATARS.sarah, handle: '@sarahc' },
      content: 'Open sourced our design system today. Built on Radix + Tailwind with full a11y baked in. Zero config. Star it if you find it useful 🌟',
      likes: 312, comments: 28, timestamp: '9h ago',
    },
  ],
  travel: [
    {
      id: 1,
      user: { name: 'Elena Rodriguez', avatar: AVATARS.elena, handle: '@elenar' },
      content: 'Golden hour in Lisbon hits different. Six weeks in and I\'m not sure I\'m going back. The pastéis de nata alone are reason enough to stay. 🇵🇹',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=340&fit=crop',
      likes: 2140, comments: 89, timestamp: '3h ago',
    },
    {
      id: 2,
      user: { name: 'James Wilson', avatar: AVATARS.james, handle: '@jwilson' },
      content: 'Tokyo street food tour day 3. My wallet and my stomach are having very different experiences right now. 🇯🇵',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=340&fit=crop',
      likes: 1760, comments: 55, timestamp: '6h ago',
    },
    {
      id: 3,
      user: { name: 'Aisha Patel', avatar: AVATARS.aisha, handle: '@aishap' },
      content: 'Remote work from Bali tip: the sunrise yoga at 6am is not optional, it\'s survival. Highly recommend.',
      likes: 934, comments: 41, timestamp: '10h ago',
    },
  ],
  food: [
    {
      id: 1,
      user: { name: 'Sarah Chen', avatar: AVATARS.sarah, handle: '@sarahc' },
      content: 'Finally nailed the sourdough after 4 months of failed attempts. The crust, the crumb — it\'s everything. Recipe in the comments. 🍞',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&h=340&fit=crop',
      likes: 1830, comments: 124, timestamp: '1h ago',
    },
    {
      id: 2,
      user: { name: 'Marcus Miller', avatar: AVATARS.marcus, handle: '@marcusm' },
      content: 'Date night: homemade ramen from scratch including the tare and chashu. 6 hours of cooking. Worth every minute. 🍜',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=340&fit=crop',
      likes: 987, comments: 73, timestamp: '4h ago',
    },
    {
      id: 3,
      user: { name: 'Elena Rodriguez', avatar: AVATARS.elena, handle: '@elenar' },
      content: 'Sunday market haul. Heirloom tomatoes, basil, burrata. Sometimes the simplest ingredients make the most memorable meals.',
      likes: 756, comments: 29, timestamp: '8h ago',
    },
  ],
  sports: [
    {
      id: 1,
      user: { name: 'James Wilson', avatar: AVATARS.james, handle: '@jwilson' },
      content: 'Hit a new PR today: 5km in 19:42. Six months of consistent training finally paying off. The only competition is who you were yesterday. 🏃',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=340&fit=crop',
      likes: 654, comments: 48, timestamp: '2h ago',
    },
    {
      id: 2,
      user: { name: 'Aisha Patel', avatar: AVATARS.aisha, handle: '@aishap' },
      content: 'Game recap: down by 12 at halftime, came back to win by 3. This team has a heart I\'ve never seen in 10 years of coaching. 🏀',
      likes: 1120, comments: 67, timestamp: '5h ago',
    },
    {
      id: 3,
      user: { name: 'Sarah Chen', avatar: AVATARS.sarah, handle: '@sarahc' },
      content: 'Rest days are part of training. Your muscles don\'t grow in the gym, they grow when you recover. Reminder to take care of the machine. 💪',
      likes: 892, comments: 34, timestamp: '9h ago',
    },
  ],
};

export const MOCK_POSTS = CONTENT_PRESETS.professional;

export const MOCK_CHATS = [
  {
    id: 1,
    user: { name: 'Sarah Chen', avatar: AVATARS.sarah, status: 'online' },
    lastMessage: 'The new design looks amazing!',
    timestamp: '10:30 AM',
    unread: 2,
    messages: [
      { id: 1, text: 'Hey! How\'s the project going?', sender: 'them', time: '10:25 AM' },
      { id: 2, text: 'The new design looks amazing!', sender: 'them', time: '10:30 AM' },
    ],
  },
  {
    id: 2,
    user: { name: 'Marcus Miller', avatar: AVATARS.marcus, status: 'offline' },
    lastMessage: 'I\'ll send the report over soon.',
    timestamp: 'Yesterday',
    unread: 0,
    messages: [
      { id: 1, text: 'Did you finish the review?', sender: 'me', time: '3:45 PM' },
      { id: 2, text: 'I\'ll send the report over soon.', sender: 'them', time: '4:02 PM' },
    ],
  },
  {
    id: 3,
    user: { name: 'James Wilson', avatar: AVATARS.james, status: 'online' },
    lastMessage: 'Great meeting today!',
    timestamp: 'Monday',
    unread: 0,
    messages: [
      { id: 1, text: 'Great meeting today!', sender: 'them', time: '11:15 AM' },
    ],
  },
];
