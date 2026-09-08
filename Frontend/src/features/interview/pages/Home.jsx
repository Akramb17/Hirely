import React, { useEffect, useRef, useState } from "react";

import "../style/home.scss";

import { useInterview } from "../hooks/useInterview";

import { useNavigate } from "react-router";

import { useAuth } from "../../auth/hooks/useAuth.js";

const Home = () => {

  const {loading, generateReport, reports, getReports, errorMessage} = useInterview()
  const { handleLogout } = useAuth()

  const [jobDescription, setJobDescription] = useState("");

  const [selfDescription, setSelfDescription] = useState("");


  const resumeInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    getReports()
  }, [])

  const handleGenerateReport = async () => {

    const resumeFile = resumeInputRef.current.files[0];

    const data = await generateReport({jobDescription, selfDescription, resumeFile})

    if (!data) {
      return
    }

    navigate(`/interview/${data._id}`)

    }


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

        {errorMessage && (
    <div className="hirely-error-toast">
      <strong>AI Service Unavailable</strong>
      <p>{errorMessage.replace("AI Service Unavailable. ", "")}</p>
    </div>
  )}

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
        <button
      className="hirely-logout-button"
      onClick={async () => {
        await handleLogout();
        navigate("/login");
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>

      Logout
        </button>


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

                className="hirely-upload-box"

              >

                <div className="hirely-upload-icon">

                  ↑

                </div>

                <p className="hirely-upload-title">

                  Click to upload or drag & drop

                </p>

                <p className="hirely-upload-subtitle">

                  PDF or DOCX (Max 5MB)

                </p>

                <input

                  ref={resumeInputRef}

                  id="hirely-resume"

                  type="file"

                  accept=".pdf,.docx"

                  hidden

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

      {/* Recent Reports List */}
      {reports.length > 0 && (
        <section className="recent-reports">
          <h2>My Recent Interview Plans</h2>
          <ul className="reports-list">
            {reports.map(report => (
              <li
                key={report._id}
                className="report-item"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <h3>{report.title || "Untitled Position"}</h3>
                <p className="report-meta">
                  Generated on {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <p
                  className={`match-score ${
                    report.matchScore >= 80
                      ? "score--high"
                      : report.matchScore >= 60
                      ? "score--mid"
                      : "score--low"
                  }`}
                >
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

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
