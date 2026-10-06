import React, { useState } from 'react';
import Section from './section';
export default function Contact({ onSend }) {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    onSend({ sender_name: f.get('name'), sender_email: f.get('email'), subject: f.get('subject'), message: f.get('message') });
    e.target.reset();
    setSent(true);
  };
  return (
    <Section id="contact" title="Contact" alt>
      <form className="contact-form" onSubmit={submit} onChange={() => setSent(false)}>
        <input name="name" type="text" placeholder="Enter your name*" required />
        <input name="email" type="email" placeholder="Enter your email*" required />
        <input name="subject" type="text" placeholder="Subject" />
        <textarea name="message" placeholder="Your message*" required />
        <button type="submit">Send message</button>
        {sent && <p role="status" className="ok">Message sent. It now appears in the contact_messages table below.</p>}
      </form>
    </Section>
  );
}
