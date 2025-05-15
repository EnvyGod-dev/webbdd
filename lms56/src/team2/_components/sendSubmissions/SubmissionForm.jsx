import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import './SubmissionForm.css';

export default function SubmissionForm({ initialData = {}, onSubmit, showViewSubmissionsButton = false, onViewSubmissions }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, lessonId } = useParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const isEditPage = location.pathname.includes('/edit');
  const [files, setFiles] = useState([]);
  const [isTeamWork, setIsTeamWork] = useState(initialData.isTeamWork || false);
  const [delivered, setDelivered] = useState(!!initialData.files?.length);
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState(initialData.teamMembers || ['']);
  const [isSubmitted, setIsSubmitted] = useState(
    isEditPage ? false : initialData.isSubmitted || false
  );
  const [description, setDescription] = useState(initialData.description || "");
  const [previousSubmission, setPreviousSubmission] = useState(null);

  useEffect(() => {
    if(isEditPage){
      const lastSubmission = localStorage.getItem('lastSubmission');
      if(lastSubmission){
        setPreviousSubmission(JSON.parse(lastSubmission));
      }
    }
    if (initialData.files) {
      const preparedFiles = initialData.files.map((file) => {
        if (file instanceof File) return file;
        const byteString = atob(file.content.split(',')[1]);
        const mimeString = file.content.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new File([ab], file.name, { type: mimeString });
      });
      setFiles(preparedFiles);
    }
  }, [initialData, isEditPage]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileRemove = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Та файл сонгоно уу!");
      return;
    }

    setLoading(true);

    const readFiles = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            content: reader.result,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readFiles).then((encodedFiles) => {
      const data = {
        files: encodedFiles,
        isTeamWork,
        teamMembers,
        isSubmitted: true,
        description,
      };

      localStorage.setItem('lastSubmission', JSON.stringify(data));
      onSubmit(data);
      setDelivered(true);
      setIsSubmitted(true);
      setLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
/* 
      if (isEditPage) {
        navigate(`/team2/courses/${courseId}/lessons/${lessonId}`);
      }  */ 
    });
  };

  const handleMemberChange = (index, value) => {
    const updated = [...teamMembers];
    updated[index] = value;
    setTeamMembers(updated);
  };

  const addMember = () => setTeamMembers([...teamMembers, '']);
  const removeMember = (index) => {
    const updated = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updated);
  };

  return (
    <div className="submission-wrapper">
     {showSuccess && (
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold text-lg transition-all">
        Амжилттай илгээгдлээ!
      </div>
    )}
      <div className="submission-header">
        <div>
          <h1>Даалгавар илгээх</h1>
          <p>Веб систем ба технологи лаб 04</p>
        </div>
        <span className={`delivery-status ${delivered ? 'sent' : 'not-sent'}`}>
          {delivered ? 'Илгээгдсэн' : 'Илгээгдээгүй'}
        </span>
      </div>
  
      {/* Previous Submission Section */}
      {previousSubmission && (
        <div className="previous-submission-section">
          <h2 className="section-title">Өмнө илгээсэн даалгавар</h2>
          <div className="previous-submission-content">
            <div className="file-list">
              {previousSubmission.files.map((file, index) => (
                <div className="file-preview" key={index}>
                  <span>📎 {file.name}</span>
                  <span>{(file.size / 1024).toFixed(1)}kb</span>
                </div>
              ))}
            </div>
            {previousSubmission.isTeamWork && (
              <div className="team-members">
                <p>Багийн гишүүд:</p>
                {previousSubmission.teamMembers.map((member, idx) => (
                  <div key={idx} className="team-member-row">
                    <span>{member}</span>
                  </div>
                ))}
              </div>
            )}
            {previousSubmission.description && (
              <div className="description">
                <p className="font-medium">Тайлбар:</p>
                <p>{previousSubmission.description.replace(/<[^>]+>/g, '')}</p>
              </div>
            )}
          </div>
        </div>
      )}
  
      {/* New Submission Section */}
      <div className="new-submission-section">
        <h2 className="section-title">Шинэ даалгавар илгээх</h2>
        
        {/* File Upload Box */}
        <div className="file-box">
          <h2>Файл илгээх</h2>
          <label className="file-upload-area">
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              multiple
              disabled={isSubmitted && !isEditPage}
            />
            <div className="upload-placeholder">
              <span className="upload-icon">📄</span>
              <p><strong>Энд дарж</strong> илгээх файлааа сонгоно уу.</p>
              <small>Файлын форматууд : PDF, XLS, DOC</small><br />
              <small>Файлын дээд хэмжээ: 25MB</small>
            </div>
          </label>
  
          {files.map((file, index) => (
            <div className="file-preview" key={index}>
              <span>📎 {file.name}</span>
              <span>{(file.size / 1024).toFixed(1)}kb</span>
              {(!isSubmitted || isEditPage) && (
                <button
                  type="button"
                  className="remove-file-btn"
                  onClick={() => handleFileRemove(index)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
  
          {loading && <div className="loading-bar"></div>}
        </div>
  
        {/* Submission Box */}
        <form className="submission-box" onSubmit={handleSubmit}>
          <label className="team-checkbox">
            <input
              type="checkbox"
              checked={isTeamWork}
              onChange={() => setIsTeamWork(!isTeamWork)}
              disabled={isSubmitted && !isEditPage}
            />
            Багийн даалгавар эсэх
          </label>
  
          {isTeamWork && (
            <div className="team-members">
              <p>Багийн гишүүд:</p>
              {teamMembers.map((member, idx) => (
                <div key={idx} className="team-member-row">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => handleMemberChange(idx, e.target.value)}
                    placeholder={`Гишүүн ${idx + 1}`}
                    required
                    disabled={isSubmitted && !isEditPage}
                  />
                  {(!isSubmitted || isEditPage) && (
                    <button
                      type="button"
                      onClick={() => removeMember(idx)}
                      className="delete-btn"
                    >
                      Устгах
                    </button>
                  )}
                </div>
              ))}
              {(!isSubmitted || isEditPage) && (
                <button type="button" onClick={addMember} className="add-member-btn">
                  + Багийн гишүүн нэмэх
                </button>
              )}
            </div>
          )}
  
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Тайлбар
            </label>
            <Editor
  value={description}
  init={{
    height: 200,
    menubar: false,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount"
    ],
    toolbar:
      "undo redo | formatselect | bold italic backcolor | " +
      "alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | removeformat | help"
  }}
  onEditorChange={(content) => setDescription(content)}
  disabled={isSubmitted && !isEditPage}
/>
          </div>
  
          {(!isSubmitted || isEditPage) && (
            <button
              type="submit"
              className="submit-btn"
              disabled={loading || files.length === 0}
            >
              {loading ? 'Амжилттай илгээгдлээ...' : 'Илгээх'}
            </button>
          )}
          {/* Show success message and view submissions button after submit */}
          {showViewSubmissionsButton && !loading && (
            <>
              <button
  type="button"
  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow mt-4 w-full"
  onClick={onViewSubmissions}
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
  </svg>
  Оюутны илгээсэн даалгаврууд харах
</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}