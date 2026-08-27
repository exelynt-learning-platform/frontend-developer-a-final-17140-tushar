import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;
export const MIN_MOBILE_LENGTH = 7;
export const MAX_MOBILE_LENGTH = 15;

export const validateEmployeeForm = (formData) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = new RegExp(`^[0-9+\\s-]{${MIN_MOBILE_LENGTH},${MAX_MOBILE_LENGTH}}$`);

  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Full Name is required.';
  } else if (formData.name.trim().length < MIN_NAME_LENGTH) {
    errors.name = `Name must be at least ${MIN_NAME_LENGTH} characters.`;
  } else if (formData.name.trim().length > MAX_NAME_LENGTH) {
    errors.name = `Name cannot exceed ${MAX_NAME_LENGTH} characters.`;
  }

  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formData.mobile || !formData.mobile.trim()) {
    errors.mobile = 'Mobile number is required.';
  } else if (!mobileRegex.test(formData.mobile.trim())) {
    errors.mobile = `Enter a valid mobile number (${MIN_MOBILE_LENGTH}-${MAX_MOBILE_LENGTH} digits).`;
  }

  if (!formData.country || !formData.country.trim()) {
    errors.country = 'Country is required.';
  }

  if (!formData.state || !formData.state.trim()) {
    errors.state = 'State is required.';
  }

  if (!formData.district || !formData.district.trim()) {
    errors.district = 'District is required.';
  }

  return errors;
};

export const EmployeeForm = ({ initialData, countries, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    country: '',
    state: '',
    district: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const availableCountries = countries && countries.length > 0 ? countries : [
      { id: '1', name: 'United States' },
      { id: '2', name: 'India' },
      { id: '3', name: 'Canada' },
      { id: '4', name: 'United Kingdom' },
      { id: '5', name: 'Australia' },
      { id: '6', name: 'Germany' }
    ];

    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        mobile: initialData.mobile || '',
        country: initialData.country || '',
        state: initialData.state || '',
        district: initialData.district || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        mobile: '',
        country: '',
        state: '',
        district: ''
      });
    }
  }, [initialData, countries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const validationErrors = validateEmployeeForm({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validateEmployeeForm(formData);
    setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateEmployeeForm(formData);
    setErrors(validationErrors);
    setTouched({
      name: true,
      email: true,
      mobile: true,
      country: true,
      state: true,
      district: true
    });

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form" noValidate>
      <div className="form-grid">
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="emp-name" className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <input
            id="emp-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Jane Doe"
            className={`form-input ${touched.name && errors.name ? 'input-error' : ''}`}
          />
          {touched.name && errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="emp-email" className="form-label">
            Email Address <span className="required">*</span>
          </label>
          <input
            id="emp-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. jane.doe@example.com"
            className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
          />
          {touched.email && errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        {/* Mobile */}
        <div className="form-group">
          <label htmlFor="emp-mobile" className="form-label">
            Mobile Number <span className="required">*</span>
          </label>
          <input
            id="emp-mobile"
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. 9876543210"
            className={`form-input ${touched.mobile && errors.mobile ? 'input-error' : ''}`}
          />
          {touched.mobile && errors.mobile && <span className="error-msg">{errors.mobile}</span>}
        </div>

        {/* Country */}
        <div className="form-group">
          <label htmlFor="emp-country" className="form-label">
            Country <span className="required">*</span>
          </label>
          <select
            id="emp-country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-select ${touched.country && errors.country ? 'input-error' : ''}`}
          >
            <option value="">Select Country</option>
            {(countries && countries.length > 0
              ? countries
              : [
                  { id: '1', name: 'United States' },
                  { id: '2', name: 'India' },
                  { id: '3', name: 'Canada' },
                  { id: '4', name: 'United Kingdom' },
                  { id: '5', name: 'Australia' },
                  { id: '6', name: 'Germany' }
                ]
            ).map((c) => (
              <option key={c.id || c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          {touched.country && errors.country && <span className="error-msg">{errors.country}</span>}
        </div>

        {/* State */}
        <div className="form-group">
          <label htmlFor="emp-state" className="form-label">
            State <span className="required">*</span>
          </label>
          <input
            id="emp-state"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. California / Ontario"
            className={`form-input ${touched.state && errors.state ? 'input-error' : ''}`}
          />
          {touched.state && errors.state && <span className="error-msg">{errors.state}</span>}
        </div>

        {/* District */}
        <div className="form-group">
          <label htmlFor="emp-district" className="form-label">
            District <span className="required">*</span>
          </label>
          <input
            id="emp-district"
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Los Angeles / Toronto"
            className={`form-input ${touched.district && errors.district ? 'input-error' : ''}`}
          />
          {touched.district && errors.district && <span className="error-msg">{errors.district}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary" disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Employee' : 'Create Employee'}
        </button>
      </div>
    </form>
  );
};
