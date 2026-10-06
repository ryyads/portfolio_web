import React, { useState } from 'react';
import { postJSON } from '../api';
import { usePortfolio } from '../context';
import Reveal from './Reveal';

function Contact() {
  const { profile } = usePortfolio();
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const f = new FormData(form);
    setStatus('sending');
    try {
      await postJSON('/api/contact', {
        profile_id: profile.profile_id,
        sender_name: f.get('name'),
        sender_email: f.get('email'),
        subject: f.get('subject'),
        message: f.get('message'),
      });
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact" id="contact">
      <Reveal><h2 className="section-title">Contact</h2></Reveal>
      <Reveal delay={100}>
        <form className="contact-form" onSubmit={onSubmit}>
          <input name="name" type="text" placeholder="Your name*" required />
          <input name="email" type="email" placeholder="Your email*" required />
          <input name="subject" type="text" placeholder="Subject" />
          <textarea name="message" placeholder="Your message*" rows="5" required />
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p className={`form-status ${status}`} role="status">
            {status === 'sent' && 'Message sent. Thank you!'}
            {status === 'error' && "Couldn't send your message. Please try again or email me directly."}
          </p>
        </form>
      </Reveal>
    </section>
  );
}

export default Contact;
