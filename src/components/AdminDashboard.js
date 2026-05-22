import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  createMasjid,
  deleteMasjid,
  getCustomMasjids,
  updateMasjid,
} from '../services/masjidStore';
import './AdminDashboard.css';

const EMPTY_FORM = {
  name: 'New Masjid',
  area: 'Vijayapura',
  address: 'Full address, Vijayapura',
  distance: '1.0',
  photo: 'https://images.unsplash.com/photo-1564769610726-59cead6a6f8f?w=600&q=80',
  fajr: '05:10',
  zuhr: '12:45',
  asr: '16:15',
  maghrib: '18:52',
  isha: '20:10',
  eidTime: '07:00',
  capacity: '1000',
  amenities: 'Parking, Wudu Area',
  imam: 'Maulana',
  established: '2024',
};

const FIELD_GROUPS = [
  {
    title: 'Masjid Details',
    fields: [
      { name: 'name', label: 'Masjid Name', type: 'text' },
      { name: 'area', label: 'Area', type: 'text' },
      { name: 'imam', label: 'Imam Name', type: 'text' },
      { name: 'capacity', label: 'Capacity', type: 'number' },
      { name: 'distance', label: 'Distance km', type: 'number', step: '0.1' },
      { name: 'established', label: 'Established Year', type: 'number' },
      { name: 'address', label: 'Address', type: 'text', wide: true },
    ],
  },
  {
    title: 'Photo and Facilities',
    fields: [
      { name: 'photo', label: 'Upload Masjid Photo', type: 'file', photo: true, wide: true },
      { name: 'amenities', label: 'Amenities', type: 'text', wide: true },
    ],
  },
  {
    title: 'Prayer Timings',
    fields: [
      { name: 'fajr', label: 'Fajr Jamaath', type: 'time' },
      { name: 'zuhr', label: 'Zuhr Jamaath', type: 'time' },
      { name: 'asr', label: 'Asr Jamaath', type: 'time' },
      { name: 'maghrib', label: 'Maghrib Jamaath', type: 'time' },
      { name: 'isha', label: 'Isha Jamaath', type: 'time' },
      { name: 'eidTime', label: 'Eid Namaz', type: 'time' },
    ],
  },
];

const AdminDashboard = memo(function AdminDashboard({ allMasjids = [], onDataChanged }) {
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState('Changes are saved in this browser.');
  const [adminMasjids, setAdminMasjids] = useState(getCustomMasjids);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const adminId = session?.admin?.id;
  const adminMasjidIds = new Set(adminMasjids.map(masjid => Number(masjid.id)));
  const viewOnlyMasjids = allMasjids.filter(masjid => !adminMasjidIds.has(Number(masjid.id)));

  useEffect(() => {
    setSession({ admin: { id: 'local-admin' } });
  }, []);

  const loadAdminMasjids = useCallback(() => {
    setAdminMasjids(getCustomMasjids());
  }, []);

  useEffect(() => {
    loadAdminMasjids();
  }, [loadAdminMasjids]);

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePhotoUpload = useCallback(e => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm(prev => ({ ...prev, photo: String(reader.result || '') }));
    };
    reader.readAsDataURL(file);
  }, []);

  const resetForm = useCallback(() => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }, []);

  const handleEdit = useCallback(masjid => {
    setEditingId(masjid.id);
    setForm({
      ...masjid,
      amenities: masjid.amenities.join(', '),
    });
  }, []);

  const handleSave = useCallback(async e => {
    e.preventDefault();
    setMessage('');
    try {
      if (editingId) {
        updateMasjid(editingId, form);
        setMessage('Masjid details updated.');
      } else {
        createMasjid(form);
        setMessage('Masjid details added.');
      }
      resetForm();
      loadAdminMasjids();
      onDataChanged();
    } catch (err) {
      setMessage(err.message);
    }
  }, [editingId, form, loadAdminMasjids, onDataChanged, resetForm]);

  const handleDelete = useCallback(async id => {
    setMessage('');
    try {
      deleteMasjid(id);
      setMessage('Masjid deleted.');
      loadAdminMasjids();
      onDataChanged();
    } catch (err) {
      setMessage(err.message);
    }
  }, [loadAdminMasjids, onDataChanged]);

  return (
    <section className="admin-panel" aria-labelledby="dashboard-title">
      <div className="admin-panel__head">
        <div>
          <h2 id="dashboard-title">Admin Dashboard</h2>
          <p>
            {session
              ? 'Add and manage masjid details on this device. Other masjids are view-only.'
              : 'Dashboard is loading.'}
          </p>
        </div>
      </div>

      <form className="admin-form" onSubmit={handleSave}>
        {FIELD_GROUPS.map(group => (
          <fieldset className="admin-form__section" key={group.title}>
            <legend>{group.title}</legend>
            <div className="admin-form__grid">
              {group.fields.map(field => (
                <label className={field.wide ? 'admin-form__field admin-form__field--wide' : 'admin-form__field'} key={field.name}>
                  <span>{field.label}</span>
                  {field.photo ? (
                    <div className="admin-photo-upload">
                      <input
                        name={field.name}
                        onChange={handlePhotoUpload}
                        type="file"
                        accept="image/*"
                        aria-label="Upload masjid photo"
                      />
                      {form.photo && (
                        <img className="admin-photo-upload__preview" src={form.photo} alt="Selected masjid preview" />
                      )}
                    </div>
                  ) : (
                    <input
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.name === 'amenities' ? 'Parking, Wudu Area, Ladies Section' : field.label}
                      type={field.type}
                      step={field.step}
                      required
                    />
                  )}
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <div className="admin-form__actions">
          <button type="submit">{editingId ? 'Save Changes' : 'Add Masjid'}</button>
          {editingId && <button type="button" onClick={resetForm}>Cancel Edit</button>}
        </div>
      </form>

      {message && <p className="admin-panel__message">{message}</p>}

      <div className="admin-list">
        <div className="admin-list__head">
          <h3>Your Masjids</h3>
          <p>Edit and delete records saved in this browser.</p>
        </div>

        {adminMasjids.length === 0 ? (
          <p className="admin-list__empty">No masjids added by you yet.</p>
        ) : (
          adminMasjids.map(masjid => (
            <article className="admin-list__item" key={masjid.id}>
              <div>
                <h3>{masjid.name}</h3>
                <p>{masjid.area} | Eid {masjid.eidTime}</p>
              </div>
              <div className="admin-list__actions">
                <button type="button" onClick={() => handleEdit(masjid)}>Edit</button>
                <button type="button" onClick={() => handleDelete(masjid.id)}>Delete</button>
              </div>
            </article>
          ))
        )}
      </div>

      <div className="admin-list admin-list--readonly">
        <div className="admin-list__head">
          <h3>Other Masjids</h3>
          <p>You can view these masjid details, but you cannot edit or delete them.</p>
        </div>

        {viewOnlyMasjids.length === 0 ? (
          <p className="admin-list__empty">No other masjids to show.</p>
        ) : (
          viewOnlyMasjids.map(masjid => (
            <article className="admin-list__item" key={masjid.id}>
              <div>
                <h3>{masjid.name}</h3>
                <p>{masjid.area} | Eid {masjid.eidTime} | Imam {masjid.imam}</p>
              </div>
              <span className="admin-list__readonly-badge">
                {masjid.ownerId === adminId ? 'Owned' : 'View Only'}
              </span>
            </article>
          ))
        )}
      </div>
    </section>
  );
});

export default AdminDashboard;
