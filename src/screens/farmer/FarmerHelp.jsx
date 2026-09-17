import React, { useState } from 'react';
import { useAgrizen } from '../../context/AgrizenContext';
import { MOCK_FAQS } from '../../data/mockData';
import {
  HelpCircle,
  PhoneCall,
  MessageSquare,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2
} from 'lucide-react';

export function FarmerHelp() {
  const { setFarmerScreen, addToast, playChime } = useAgrizen();
  const [openFaq, setOpenFaq] = useState(0);

  const [grievanceText, setGrievanceText] = useState("");
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);

  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    if (!grievanceText.trim()) return;
    playChime();
    setGrievanceSubmitted(true);
    addToast("Grievance ticket #AGZ-GRV-8821 registered with District Collectorate", "success");
    setGrievanceText("");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="gov-btn-ghost gov-btn-sm"
          onClick={() => setFarmerScreen('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </button>
        <span className="gov-badge gov-badge-green">24x7 Kisan Desk</span>
      </div>

      {/* Kisan Call Centre Hero */}
      <div className="gov-card" style={{
        background: 'linear-gradient(135deg, var(--gov-green-900) 0%, var(--gov-green-800) 100%)',
        color: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <PhoneCall size={24} color="#86efac" />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#a7f3d0', textTransform: 'uppercase' }}>
              National Kisan Call Centre (Toll-Free)
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '0.04em' }}>
              1800-180-1551
            </div>
            <div style={{ fontSize: '0.74rem', color: '#e2e8f0' }}>
              Free service in Tamil & English • All days 06:00 AM - 10:00 PM
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="gov-card">
        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>
          Frequently Asked Questions (FAQ)
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {MOCK_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--gov-border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: isOpen ? 'var(--gov-slate-50)' : '#ffffff',
                    border: 'none',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.86rem',
                    color: 'var(--gov-slate-900)'
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isOpen && (
                  <div style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--gov-slate-600)', borderTop: '1px solid var(--gov-border)', lineHeight: 1.45 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grievance Ticket Submission */}
      <div className="gov-card">
        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>
          Lodge Queue / Moisture Grievance
        </h4>
        <p style={{ fontSize: '0.82rem', marginBottom: '1rem' }}>
          Direct escalation to District Civil Supplies Officer (DCSO) Thanjavur.
        </p>

        {grievanceSubmitted ? (
          <div style={{
            backgroundColor: 'var(--gov-green-50)',
            border: '1px solid rgba(21, 128, 61, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <CheckCircle2 size={28} color="var(--gov-green-700)" style={{ margin: '0 auto 6px auto' }} />
            <div style={{ fontWeight: 700, color: 'var(--gov-green-900)' }}>
              Grievance Registered: #AGZ-GRV-8821
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--gov-slate-600)', marginTop: '2px' }}>
              The District Inspection Officer will contact you on +91 98421 77312 within 4 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleGrievanceSubmit}>
            <div className="gov-form-group">
              <label className="gov-label" htmlFor="grievance-textarea">Issue Description</label>
              <textarea
                id="grievance-textarea"
                rows={3}
                className="gov-textarea"
                placeholder="Explain any counter delay, moisture meter dispute, or gate staging issue..."
                value={grievanceText}
                onChange={(e) => setGrievanceText(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="gov-btn gov-btn-primary" style={{ width: '100%' }}>
              <Send size={15} />
              <span>Submit Grievance to Collectorate</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
