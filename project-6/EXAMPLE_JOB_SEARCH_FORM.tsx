// Complete Working Example - Job Search Form with Master Data

import { useState } from 'react';
import { useMasterData } from '@/hooks/useMasterData';
import { City } from '@/interface/location.interface';
import { Skill } from '@/interface/skill.interface';
import { JobCategory, Specialization } from '@/interface/specialization.interface';

interface JobSearchCriteria {
  cityId: string;
  fieldId: string;
  specializationSlug: string;
  skillIds: string[];
  salaryMin: number;
  salaryMax: number;
}

export function JobSearchForm() {
  const { cities, fields, specializations, skills, loading, error } = useMasterData();

  const [searchCriteria, setSearchCriteria] = useState<JobSearchCriteria>({
    cityId: '',
    fieldId: '',
    specializationSlug: '',
    skillIds: [],
    salaryMin: 0,
    salaryMax: 999999,
  });

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="error">Lỗi: {error}</div>;
  }

  // Handle city change
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCriteria({
      ...searchCriteria,
      cityId: e.target.value,
    });
  };

  // Handle field change
  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCriteria({
      ...searchCriteria,
      fieldId: e.target.value,
    });
  };

  // Handle specialization change
  const handleSpecializationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCriteria({
      ...searchCriteria,
      specializationSlug: e.target.value,
    });
  };

  // Handle skill selection (multi-select)
  const toggleSkill = (skillId: string) => {
    setSearchCriteria(prev => ({
      ...prev,
      skillIds: prev.skillIds.includes(skillId)
        ? prev.skillIds.filter(id => id !== skillId)
        : [...prev.skillIds, skillId],
    }));
  };

  // Handle salary range
  const handleSalaryChange = (field: 'min' | 'max', value: number) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field === 'min' ? 'salaryMin' : 'salaryMax']: value,
    }));
  };

  // Search handler
  const handleSearch = async () => {
    setSearching(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();

      if (searchCriteria.cityId) params.append('cityId', searchCriteria.cityId);
      if (searchCriteria.fieldId) params.append('fieldId', searchCriteria.fieldId);
      if (searchCriteria.specializationSlug) params.append('specialization', searchCriteria.specializationSlug);
      if (searchCriteria.skillIds.length > 0) params.append('skills', searchCriteria.skillIds.join(','));
      if (searchCriteria.salaryMin > 0) params.append('salaryMin', searchCriteria.salaryMin.toString());
      if (searchCriteria.salaryMax < 999999) params.append('salaryMax', searchCriteria.salaryMax.toString());

      // Call backend API
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const response = await fetch(`${baseUrl}/api/public/jobs/search?${params}`);

      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
      } else {
        alert('Lỗi khi tìm kiếm');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Không thể tìm kiếm. Vui lòng thử lại.');
    } finally {
      setSearching(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setSearchCriteria({
      cityId: '',
      fieldId: '',
      specializationSlug: '',
      skillIds: [],
      salaryMin: 0,
      salaryMax: 999999,
    });
    setSearchResults([]);
  };

  return (
    <div className="job-search-container">
      <div className="search-form">
        <h1>🔍 Tìm Kiếm Công Việc IT</h1>

        {/* City Selection */}
        <div className="form-group">
          <label htmlFor="city">Thành Phố</label>
          <select
            id="city"
            value={searchCriteria.cityId}
            onChange={handleCityChange}
            className="form-select"
          >
            <option value="">-- Tất cả thành phố --</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Job Field Selection */}
        <div className="form-group">
          <label htmlFor="field">Lĩnh Vực Công Việc</label>
          <select
            id="field"
            value={searchCriteria.fieldId}
            onChange={handleFieldChange}
            className="form-select"
          >
            <option value="">-- Tất cả lĩnh vực --</option>
            {fields.map(field => (
              <option key={field.id} value={field.id}>
                {field.name}
              </option>
            ))}
          </select>
        </div>

        {/* Specialization Selection */}
        <div className="form-group">
          <label htmlFor="specialization">Chuyên Môn</label>
          <select
            id="specialization"
            value={searchCriteria.specializationSlug}
            onChange={handleSpecializationChange}
            className="form-select"
          >
            <option value="">-- Tất cả chuyên môn --</option>
            {specializations.map(category => (
              <optgroup key={category.id} label={category.category}>
                {category.roles?.map(role => (
                  <option key={role.slug} value={role.slug}>
                    {role.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Skills Multi-Select */}
        <div className="form-group">
          <label>Kỹ Năng Yêu Cầu</label>
          <div className="skills-grid">
            {skills.slice(0, 20).map(skill => (
              <label key={skill.id} className="skill-checkbox">
                <input
                  type="checkbox"
                  checked={searchCriteria.skillIds.includes(skill.id || '')}
                  onChange={() => toggleSkill(skill.id || '')}
                />
                <span>{skill.name}</span>
              </label>
            ))}
          </div>
          {searchCriteria.skillIds.length > 0 && (
            <p className="selected-skills">
              ✓ Đã chọn: {searchCriteria.skillIds.length} kỹ năng
            </p>
          )}
        </div>

        {/* Salary Range */}
        <div className="form-group">
          <label>Mức Lương (VND)</label>
          <div className="salary-range">
            <input
              type="number"
              placeholder="Từ"
              value={searchCriteria.salaryMin}
              onChange={e => handleSalaryChange('min', parseInt(e.target.value) || 0)}
              className="salary-input"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Đến"
              value={searchCriteria.salaryMax}
              onChange={e => handleSalaryChange('max', parseInt(e.target.value) || 999999)}
              className="salary-input"
            />
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="search-summary">
          <p>Tiêu chí tìm kiếm:</p>
          <ul>
            {searchCriteria.cityId && (
              <li>Thành phố: {cities.find(c => c.id === searchCriteria.cityId)?.name}</li>
            )}
            {searchCriteria.fieldId && (
              <li>Lĩnh vực: {fields.find(f => f.id === searchCriteria.fieldId)?.name}</li>
            )}
            {searchCriteria.specializationSlug && (
              <li>Chuyên môn: {searchCriteria.specializationSlug}</li>
            )}
            {searchCriteria.skillIds.length > 0 && (
              <li>Kỹ năng: {searchCriteria.skillIds.length} được chọn</li>
            )}
          </ul>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button
            onClick={handleSearch}
            disabled={searching}
            className="btn btn-primary"
          >
            {searching ? '🔄 Đang tìm kiếm...' : '🔍 Tìm Kiếm'}
          </button>
          <button
            onClick={handleReset}
            className="btn btn-secondary"
          >
            🔄 Đặt Lại
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Kết Quả Tìm Kiếm ({searchResults.length})</h2>
          <div className="results-grid">
            {searchResults.map(job => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
                <p className="location">📍 {cities.find(c => c.id === job.cityId)?.name}</p>
                <p className="salary">💰 {job.salary}</p>
                <p className="skills">
                  Kỹ năng: {job.skills?.map(s => s.name).join(', ')}
                </p>
                <button className="btn-view">Xem Chi Tiết</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchResults.length === 0 && searching === false && (
        <div className="no-results">
          <p>Chưa có kết quả. Hãy chọn tiêu chí tìm kiếm và nhấn "Tìm Kiếm"</p>
        </div>
      )}
    </div>
  );
}

// CSS (Add to your stylesheet)
/*
.job-search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-form {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.form-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  margin: 12px 0;
}

.skill-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.skill-checkbox input {
  cursor: pointer;
}

.salary-range {
  display: flex;
  align-items: center;
  gap: 12px;
}

.salary-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.job-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.job-card h3 {
  margin: 0 0 8px;
  color: #007bff;
}

.job-card p {
  margin: 4px 0;
  font-size: 13px;
  color: #666;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #999;
}
*/

export default JobSearchForm;

