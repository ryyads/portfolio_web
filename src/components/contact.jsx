import React, { useState } from 'react';
import Section from './section';
import { useDb, nextId } from '../data/store';
export default function Contact({ subject }) {
  const { db, add } = useDb();
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    add('contact_messages', { message_id: nextId(db.contact_messages, 'message_id'), profile_id: 1, sender_name: f.get('name'), sender_email: f.get('email'), subject: f.get('subject'), message: f.get('message'), status: 'unread', created_at: new Date().toISOString() });
    e.target.reset();
    setSent(true);
  };
  return (
    <Section id="contact" title="Contact" alt>
      <form className="contact-form" onSubmit={submit} onChange={() => setSent(false)}>
        <input name="name" type="text" placeholder="Enter your name*" required />
        <input name="email" type="email" placeholder="Enter your email*" required />
        <input name="subject" key={subject} defaultValue={subject} type="text" placeholder="Subject" />
        <textarea name="message" placeholder="Your message*" required />
        <button type="submit">Send message</button>
        {sent && <p role="status" className="ok">Message sent. Thank you!</p>}
      </form>
    </Section>
  );
}
