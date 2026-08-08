import React, { useState } from 'react';
import type { UserProfile } from '../types/user';
import { X } from 'lucide-react';

interface CaRegisterFormModalProps {
  isOpen: boolean;
  initialEmail?: string;
  initialName?: string;
  onClose: () => void;
  onSubmitProfile: (profile: UserProfile) => void;
}

export const CaRegisterFormModal: React.FC<CaRegisterFormModalProps> = ({
  isOpen,
  initialEmail = '',
  initialName = '',
  onClose,
  onSubmitProfile
}) => {
  const [formData, setFormData] = useState({
    name: initialName || 'RIDHAM SOLANKI',
    email: initialEmail || 'ridham2405@gmail.com',
    mobile: '',
    whatsapp: '',
    postalAddress: '',
    gender: '',
    collegeName: '',
    collegeCity: '',
    yearOfStudy: '',
    facebookProfile: '',
    instagramProfile: '',
    xProfile: '',
    referrerCaId: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Required fields validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email Id is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
    if (!formData.postalAddress.trim()) newErrors.postalAddress = 'Postal address is required';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
    if (!formData.collegeCity.trim()) newErrors.collegeCity = 'College city is required';
    if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Please select year of study';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const randomCaNum = Math.floor(1000 + Math.random() * 9000);
    const createdProfile: UserProfile = {
      ...formData,
      caId: `CA-2027-${randomCaNum}`,
      isRegistered: true
    };

    // Save to shared users registry for Admin Panel
    const existingUsers = JSON.parse(localStorage.getItem('techkriti_ca_users') || '[]');
    const userEntry = { ...createdProfile, points: 0, rank: 0, tasksCount: 0 };
    // Don't add duplicates
    const alreadyExists = existingUsers.some((u: any) => u.email === createdProfile.email);
    if (!alreadyExists) {
      existingUsers.push(userEntry);
      localStorage.setItem('techkriti_ca_users', JSON.stringify(existingUsers));
    }

    onSubmitProfile(createdProfile);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        overflowY: 'auto'
      }}
    >
      {/* Broad Container (maxWidth: 58rem) matching user request */}
      <div 
        style={{
          width: '100%',
          maxWidth: '58rem',
          backgroundColor: '#000000',
          borderRadius: '1.75rem',
          padding: '2.5rem 2.25rem',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 50px rgba(56, 189, 248, 0.25)',
          color: '#ffffff',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            cursor: 'pointer',
            padding: '0.45rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Close registration"
        >
          <X size={22} color="#ffffff" />
        </button>

        {/* Title Header matching Image 1 */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
            Register
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0, fontFamily: 'Inter, sans-serif' }}>
            Please enter your details to complete your CA Portal registration
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Broad 2-Column Responsive Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Column 1: Personal & Contact Information */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: errors.name ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
                {errors.name && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.name}</span>}
              </div>

              {/* Email Id */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  Email Id*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: errors.email ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.email}</span>}
              </div>

              {/* Mobile */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  Mobile*
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your 10 digit mobile number"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: errors.mobile ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
                {errors.mobile && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.mobile}</span>}
              </div>

              {/* WhatsApp Number */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  WhatsApp Number*
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Enter your 10 digit WhatsApp number"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: errors.whatsapp ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
                {errors.whatsapp && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.whatsapp}</span>}
              </div>

              {/* Postal Address */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  Postal Address*
                </label>
                <input
                  type="text"
                  name="postalAddress"
                  value={formData.postalAddress}
                  onChange={handleChange}
                  placeholder="Enter your postal address"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: errors.postalAddress ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
                {errors.postalAddress && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.postalAddress}</span>}
              </div>

              {/* Gender */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  Gender*
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: errors.gender ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: formData.gender ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.gender}</span>}
              </div>
            </div>

            {/* Column 2: Academic & Social Profiles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* College Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  College Name*
                </label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  placeholder="Enter your college name"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: errors.collegeName ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
                {errors.collegeName && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.collegeName}</span>}
              </div>

              {/* College City */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  College City*
                </label>
                <input
                  type="text"
                  name="collegeCity"
                  value={formData.collegeCity}
                  onChange={handleChange}
                  placeholder="Enter your college city"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: errors.collegeCity ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
                {errors.collegeCity && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.collegeCity}</span>}
              </div>

              {/* Year of Study */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  Year of Study*
                </label>
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: errors.yearOfStudy ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: formData.yearOfStudy ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                >
                  <option value="" disabled>Select Year of Study</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year / Postgrad">5th Year / Postgrad</option>
                </select>
                {errors.yearOfStudy && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.yearOfStudy}</span>}
              </div>

              {/* Facebook Profile */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  Facebook Profile
                </label>
                <input
                  type="text"
                  name="facebookProfile"
                  value={formData.facebookProfile}
                  onChange={handleChange}
                  placeholder="Link to your Facebook Profile"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Instagram Profile */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  Instagram Profile
                </label>
                <input
                  type="text"
                  name="instagramProfile"
                  value={formData.instagramProfile}
                  onChange={handleChange}
                  placeholder="Link to your Instagram Profile"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* X Profile */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  X Profile
                </label>
                <input
                  type="text"
                  name="xProfile"
                  value={formData.xProfile}
                  onChange={handleChange}
                  placeholder="Link to your X Profile"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Referrer CA Id */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.4rem' }}>
                  Referrer CA Id
                </label>
                <input
                  type="text"
                  name="referrerCaId"
                  value={formData.referrerCaId}
                  onChange={handleChange}
                  placeholder="Enter CA Id of the referrer CA"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#0d0d0d',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Large Red Register Action Button matching Image 1 */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <button
              type="submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.95rem 3.5rem',
                borderRadius: '9999px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.05rem',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                boxShadow: '0 4px 25px rgba(220, 38, 38, 0.5)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b91c1c')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
            >
              REGISTER →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
