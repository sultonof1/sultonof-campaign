import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext } from '../App';
import translations from '../translations';
import { employeeAPI } from '../services/api';
import Modal from '../components/Modal';
import '../styles/AdminPanel.css';

const EmployeeManagement = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: { uz: '', ru: '', en: '' },
    position: { uz: '', ru: '', en: '' },
    image: null,
    imagePreview: null,
    statistics: { projects: 0, experience: 0, satisfaction: 0 }
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e, field, lang = null) => {
    const { value } = e.target;
    if (lang) {
      setFormData({
        ...formData,
        [field]: { ...formData[field], [lang]: value }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  const handleStatChange = (field, value) => {
    setFormData({
      ...formData,
      statistics: { ...formData.statistics, [field]: parseInt(value) }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    formDataObj.append('name', JSON.stringify(formData.name));
    formDataObj.append('position', JSON.stringify(formData.position));
    formDataObj.append('statistics', JSON.stringify(formData.statistics));
    if (formData.image) {
      formDataObj.append('image', formData.image);
    }

    try {
      if (editingId) {
        await employeeAPI.update(editingId, formDataObj);
      } else {
        await employeeAPI.create(formDataObj);
      }
      loadEmployees();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      position: employee.position,
      image: null,
      imagePreview: employee.image ? `http://localhost:5000/${employee.image}` : null,
      statistics: employee.statistics || { projects: 0, experience: 0, satisfaction: 0 }
    });
    setEditingId(employee._id);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await employeeAPI.delete(deleteId);
      loadEmployees();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: { uz: '', ru: '', en: '' },
      position: { uz: '', ru: '', en: '' },
      image: null,
      imagePreview: null,
      statistics: { projects: 0, experience: 0, satisfaction: 0 }
    });
    setEditingId(null);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name[language]?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="management-section">
      <div className="section-header">
        <h2>👥 {t.employees}</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-add">
          + {t.add}
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder={`🔍 ${t.name}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Form */}
      {showForm && (
        <div className="form-card">
          <h3>{editingId ? t.edit : t.add}</h3>
          <form onSubmit={handleSubmit}>
            {/* Name (3 languages) */}
            <div className="form-row">
              <div className="form-group">
                <label>Ismi (UZ)</label>
                <input
                  type="text"
                  value={formData.name.uz}
                  onChange={(e) => handleInputChange(e, 'name', 'uz')}
                  required
                />
              </div>
              <div className="form-group">
                <label>Имя (RU)</label>
                <input
                  type="text"
                  value={formData.name.ru}
                  onChange={(e) => handleInputChange(e, 'name', 'ru')}
                  required
                />
              </div>
              <div className="form-group">
                <label>Name (EN)</label>
                <input
                  type="text"
                  value={formData.name.en}
                  onChange={(e) => handleInputChange(e, 'name', 'en')}
                  required
                />
              </div>
            </div>

            {/* Position (3 languages) */}
            <div className="form-row">
              <div className="form-group">
                <label>Lavozimi (UZ)</label>
                <input
                  type="text"
                  value={formData.position.uz}
                  onChange={(e) => handleInputChange(e, 'position', 'uz')}
                  required
                />
              </div>
              <div className="form-group">
                <label>Должность (RU)</label>
                <input
                  type="text"
                  value={formData.position.ru}
                  onChange={(e) => handleInputChange(e, 'position', 'ru')}
                  required
                />
              </div>
              <div className="form-group">
                <label>Position (EN)</label>
                <input
                  type="text"
                  value={formData.position.en}
                  onChange={(e) => handleInputChange(e, 'position', 'en')}
                  required
                />
              </div>
            </div>

            {/* Image */}
            <div className="form-group">
              <label>{t.upload} (Rasm)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {formData.imagePreview && (
                <div className="image-preview">
                  <img src={formData.imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="form-row">
              <div className="form-group">
                <label>{t.projects}</label>
                <input
                  type="number"
                  value={formData.statistics.projects}
                  onChange={(e) => handleStatChange('projects', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>{t.experience}</label>
                <input
                  type="number"
                  value={formData.statistics.experience}
                  onChange={(e) => handleStatChange('experience', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>{t.satisfaction}</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.statistics.satisfaction}
                  onChange={(e) => handleStatChange('satisfaction', e.target.value)}
                />
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-save">{t.save}</button>
              <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="btn-cancel">{t.cancel}</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>{t.name}</th>
              <th>{t.position}</th>
              <th>{t.projects}</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name[language]}</td>
                <td>{emp.position[language]}</td>
                <td>{emp.statistics?.projects || 0}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(emp)} className="btn-edit">{t.edit}</button>
                  <button onClick={() => { setDeleteId(emp._id); setShowDeleteModal(true); }} className="btn-delete">{t.delete}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title={t.confirmDelete}
        message={t.deleteConfirm}
      />
    </div>
  );
};

export default EmployeeManagement;
