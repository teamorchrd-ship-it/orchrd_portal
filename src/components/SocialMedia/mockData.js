export const MOCK_POSTS = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      handle: "@sarahc"
    },
    content: "Just launched my new portfolio! 🚀 It's been a long journey but I'm so happy with the results. Check it out at the link in my bio.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    likes: 124,
    comments: 18,
    timestamp: "2h ago"
  },
  {
    id: 2,
    user: {
      name: "Marcus Miller",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      handle: "@marcusm"
    },
    content: "Coffee and code - the perfect morning combo. ☕️💻 Working on some exciting new features for the portal today.",
    likes: 56,
    comments: 4,
    timestamp: "5h ago"
  },
  {
    id: 3,
    user: {
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
      handle: "@elenar"
    },
    content: "Golden hour in the city is just magical. ✨🏙️",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
    likes: 210,
    comments: 32,
    timestamp: "8h ago"
  }
];

export const MOCK_CHATS = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      status: "online"
    },
    lastMessage: "The new design looks amazing!",
    timestamp: "10:30 AM",
    unread: 2,
    messages: [
      { id: 1, text: "Hey! How's the project going?", sender: "them", time: "10:25 AM" },
      { id: 2, text: "The new design looks amazing!", sender: "them", time: "10:30 AM" }
    ]
  },
  {
    id: 2,
    user: {
      name: "Marcus Miller",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      status: "offline"
    },
    lastMessage: "I'll send the report over soon.",
    timestamp: "Yesterday",
    unread: 0,
    messages: [
      { id: 1, text: "Did you finish the review?", sender: "me", time: "3:45 PM" },
      { id: 2, text: "I'll send the report over soon.", sender: "them", time: "4:02 PM" }
    ]
  },
  {
    id: 3,
    user: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      status: "online"
    },
    lastMessage: "Great meeting today!",
    timestamp: "Monday",
    unread: 0,
    messages: [
      { id: 1, text: "Great meeting today!", sender: "them", time: "11:15 AM" }
    ]
  }
];
