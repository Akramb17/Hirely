 // return (
  //   <main className='home-page'>
  //     <div className="interview-input-group">
  //       <div className="left">
  //       <label htmlFor="jobDescription">Job Description</label>
  //       <textarea name="jobDescription" id="jobDescription" placeholder='Enter job description here....'></textarea>
  //       </div>
  //       <div className="right">
  //         <div className="input-group">
  //           <p>Resume <small className='highlight'>(Use Resume and Self Description for best results)</small></p>
  //           <label className='file-label' htmlFor="resume">Upload Resume</label>
  //           <input hidden type="file" name='resume' id='resume' accept='.pdf' />
  //         </div>
  //         <div className="input-group">
  //           <label htmlFor="selfDescription">Self Description</label>
  //           <textarea name="selfDescription" id="selfDescription" placeholder='Describe yourself in a few sentences'></textarea>
  //         </div>
  //         <button className='button primary-button'>Generate Interview Report</button>
  //       </div>

  //     </div>


  //   </main>
  // )
import React, { useRef, useState } from "react";
import "../style/home.scss";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const resumeInputRef = useRef(null);

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setResume(file);
  };

  const handleGenerateReport = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter the job description.");
      return;
    }

    if (!resume && !selfDescription.trim()) {
      alert("Please upload a resume or enter your self-description.");
      return;
    }

    console.log({
      jobDescription,
      selfDescription,
      resume,
    });

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="hirely-home-loading">
        <div className="hirely-home-loader"></div>
        <h2>Creating your interview plan...</h2>
        <p>Analyzing your profile and job description</p>
      </div>
    );
  }

  return (
    <div className="hirely-home">

      {/* HEADER */}

      <header className="hirely-home-header">
        <h1>
          Create Your Custom{" "}
          <span>Interview Plan</span>
        </h1>

        <p>
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </header>

      {/* MAIN CARD */}

      <section className="hirely-interview-card">

        <div className="hirely-interview-content">

          {/* JOB DESCRIPTION */}

          <div className="hirely-job-section">

            <div className="hirely-section-heading">

              <div className="hirely-heading-left">
                <div className="hirely-heading-icon">
                  💼
                </div>

                <h2>Target Job Description</h2>
              </div>

              <span className="hirely-required">
                Required
              </span>

            </div>

            <textarea
              className="hirely-job-textarea"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              maxLength={5000}
              placeholder={`Paste the full job description here...
e.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."`}
            />

            <div className="hirely-character-count">
              {jobDescription.length} / 5000 chars
            </div>

          </div>

          {/* DIVIDER */}

          <div className="hirely-divider"></div>

          {/* PROFILE */}

          <div className="hirely-profile-section">

            <div className="hirely-section-heading">

              <div className="hirely-heading-left">
                <div className="hirely-heading-icon">
                  👤
                </div>

                <h2>Your Profile</h2>
              </div>

            </div>

            {/* RESUME */}

            <div className="hirely-resume-section">

              <div className="hirely-field-label">
                <span>Upload Resume</span>

                <span className="hirely-best-results">
                  Best Results
                </span>
              </div>

              <label
                htmlFor="hirely-resume"
                className={`hirely-upload-box ${
                  resume ? "hirely-upload-selected" : ""
                }`}
              >

                <div className="hirely-upload-icon">
                  ↑
                </div>

                {resume ? (
                  <>
                    <p className="hirely-upload-title">
                      {resume.name}
                    </p>

                    <p className="hirely-upload-subtitle">
                      Click to replace
                    </p>
                  </>
                ) : (
                  <>
                    <p className="hirely-upload-title">
                      Click to upload or drag & drop
                    </p>

                    <p className="hirely-upload-subtitle">
                      PDF or DOCX (Max 5MB)
                    </p>
                  </>
                )}

                <input
                  ref={resumeInputRef}
                  id="hirely-resume"
                  type="file"
                  accept=".pdf,.docx"
                  hidden
                  onChange={handleResumeChange}
                />

              </label>

            </div>

            {/* OR */}

            <div className="hirely-or">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            {/* SELF DESCRIPTION */}

            <div className="hirely-self-section">

              <label
                htmlFor="hirely-self-description"
                className="hirely-field-label"
              >
                Quick Self-Description
              </label>

              <textarea
                id="hirely-self-description"
                className="hirely-self-textarea"
                value={selfDescription}
                onChange={(e) =>
                  setSelfDescription(e.target.value)
                }
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />

            </div>

            {/* INFO */}

            <div className="hirely-info-box">

              <span className="hirely-info-icon">
                ⓘ
              </span>

              <p>
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required to
                generate a personalized plan.
              </p>

            </div>

          </div>

        </div>

        {/* CARD FOOTER */}

        <div className="hirely-card-footer">

          <span className="hirely-footer-text">
            AI-Powered Strategy Generation • Approx 30s
          </span>

          <button
            className="hirely-generate-button"
            onClick={handleGenerateReport}
          >
            ✦ Generate My Interview Strategy
          </button>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="hirely-footer">

        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>

      </footer>

    </div>
  );
};

export default Home;


