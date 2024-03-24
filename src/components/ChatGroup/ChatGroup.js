import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import './ChatGroup.css';
import { Card } from 'react-bootstrap';

const ChatScreen = () => {
    const storedMessages = localStorage.getItem('chatMessages');
    const [messages, setMessages] = useState(storedMessages ? JSON.parse(storedMessages) : []);
    let [newMessage, setNewMessage] = useState('');
    const [inputText, setInputText] = useState('');

    // Save chat data to local storage
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const handleSendMessage = () => {
        if (inputText.trim() === '') return;
        newMessage = {
            text: inputText,
            sender: JSON.parse(localStorage.getItem('loggedUser')).email,
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages([...messages, newMessage]);
        setInputText('');
        setNewMessage('')
    };

    return (
        <>
            <Home></Home>
            <div className="chat-container">
                <Card>
                    <Card.Header>Group Chat</Card.Header>
                    <Card.Body>
                        <div className="message-list">
                            {messages.map((message, index) => (
                                <div key={index} className="message-user">
                                    <div className="message-text">{message.text}</div>
                                    <span className="message-timestamp">{message.sender} {message.timestamp}</span>
                                </div>
                            ))}
                        </div>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default ChatScreen;
