import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

const ChatPage = () => {
  const socket = useSocket();
  const userEmail = localStorage.getItem('userEmail');

  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/all')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(user => user.email !== userEmail);
        setUsers(filtered);
      });
  }, [userEmail]);

  useEffect(() => {
    if (!socket) return;
    const handleOnline = ({ email }) => setOnlineUsers(prev => new Set(prev).add(email));
    const handleOffline = ({ email }) => {
      const updated = new Set(onlineUsers);
      updated.delete(email);
      setOnlineUsers(updated);
    };
    socket.on('user-online', handleOnline);
    socket.on('user-offline', handleOffline);
    return () => {
      socket.off('user-online', handleOnline);
      socket.off('user-offline', handleOffline);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on('receive-message', msg => setMessages(prev => [...prev, msg]));
    return () => socket.off('receive-message');
  }, [socket]);

  const handleSend = () => {
    if (!input || !selectedUser) return;

    const timestamp = new Date().toISOString();

    socket.emit('send-message', {
      toEmail: selectedUser.email,
      fromEmail: userEmail,
      message: input,
      timestamp
    });

    setMessages(prev => [...prev, { fromEmail: userEmail, message: input, timestamp }]);
    setInput('');
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]); // Clear chat history for now
  };

  const filteredUsers = users.filter(user =>
  (user.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-blue-300">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r flex flex-col">
        {/* Logo */}
        <div className="flex items-center mb-4">
          <img src="/logo.png" alt="logo" className="w-6 h-6 mr-2" />
          <span className="text-lg font-medium text-gray-800">chat</span>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* User List */}
        <div className="overflow-y-auto">
          {filteredUsers.map(user => (
            <div
              key={user.email}
              onClick={() => handleSelectUser(user)}
              className={`p-2 rounded-lg mb-2 cursor-pointer flex items-center transition ${
                selectedUser?.email === user.email ? 'bg-gray-100' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 font-semibold text-white">
                {user.name?.[0].toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm">{user.name}</span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      onlineUsers.has(user.email) ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="p-4 border-b bg-white font-medium">
          {selectedUser ? selectedUser.name : 'Select a user'}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((m, i) => {
            const time = m.timestamp
              ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : '';

            return (
              <div
                key={i}
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  m.fromEmail === userEmail
                    ? 'ml-auto bg-blue-200 text-right'
                    : 'bg-white border'
                }`}
              >
                {m.message}
                <div className="text-[10px] text-gray-500 mt-1">{time}</div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message"
            className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
          >
            ➤
          </button>
        </div>
      </div>

      {/* Profile Panel */}
      <div className="w-1/4 bg-white border-l p-4">
        {selectedUser ? (
          <div className="text-center">
            <img
              src="/avatar-placeholder.jpg"
              alt="avatar"
              className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
            />
            <h3 className="text-md font-semibold">{selectedUser.name}</h3>
            <p className="text-sm text-gray-600">{selectedUser.mobile}</p>
            <p className="text-sm text-gray-500">{selectedUser.email}</p>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No user selected</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
