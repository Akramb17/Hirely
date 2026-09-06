import React, { useState, useEffect } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate, useParams } from "react-router";

// const report\ = {
//   matchScore: 92,

//   technicalQuestions: [
//     {
//       question:
//         "How did you manage real-time communication and online presence tracking using Socket.io in your Nexora project?",
//       intention:
//         "To assess practical experience with WebSockets, event-driven architecture, and handling real-time application state.",
//       answer:
//         "Explain how Socket.io establishes a persistent WebSocket connection between the React client and Node.js server. Mention handling events like connection, disconnect, send_message, and receive_message. Describe using in-memory data structures or Redis/MongoDB to map active socket IDs to user IDs for live status tracking.",
//     },
//     {
//       question:
//         "How do you handle authentication and authorization using JWT and external providers like Clerk in MERN applications?",
//       intention:
//         "To evaluate understanding of session management, secure route protection, and token validation mechanisms.",
//       answer:
//         "Detail the process of issuing JWTs upon login, storing them securely (e.g., HTTP-only cookies), and passing them in Authorization headers. Explain creating custom Express middleware to verify token signatures and attach decoded user context to request objects. For Clerk, mention webhook syncing to keep local user database records updated.",
//     },
//     {
//       question:
//         "In your Hirely project, how did you structure the integration with the Google Gemini API, and how did you handle error management or rate limits?",
//       intention:
//         "To check understanding of third-party API integration, modular architecture, and resilient async programming.",
//       answer:
//         "Discuss isolating API calls into a dedicated service module away from controllers. Explain using async/await with try-catch blocks for error handling, sanitizing user inputs before prompting the LLM, and handling response parsing safely.",
//     },
//   ],

//   behavioralQuestions: [
//     {
//       question:
//         "Can you describe a challenge you faced when building the role-based Employee Management System and how you resolved it?",
//       intention:
//         "To evaluate problem-solving skills, state management choices, and technical decision-making under constraints.",
//       answer:
//         "Use the STAR method. Describe the challenge, such as synchronizing complex state across components using Context API versus LocalStorage sync. Detail how you structured state providers, debugged re-render issues, and ensured consistent task status updates across admin and employee views.",
//     },
//     {
//       question:
//         "How do you prioritize learning new web development technologies alongside completing project deliverables?",
//       intention:
//         "To gauge adaptability, time management, and commitment to continuous technical growth.",
//       answer:
//         "Explain your structured approach: setting dedicated daily or weekly time for practical building, focusing on high-impact tools needed for active projects like Gemini API or Socket.io, and writing clean, hands-on code to solidify knowledge.",
//     },
//   ],

//   skillGaps: [
//     {
//       skill:
//         "Automated Testing (Unit & Integration testing with Jest/Supertest)",
//       severity: "medium",
//     },
//     {
//       skill:
//         "Cloud Deployment & CI/CD Pipelines (AWS/Docker beyond basic PaaS like Vercel/Render)",
//       severity: "low",
//     },
//     {
//       skill: "TypeScript for Full Stack Development",
//       severity: "low",
//     },
//   ],

//   preparationPlan: [
//     {
//       day: 1,
//       focus: "Node.js & Express.js Core Mechanics",
//       tasks: [
//         "Review event loop, asynchronous non-blocking I/O, and middleware order.",
//         "Practice writing custom middleware for error handling and JWT validation.",
//       ],
//     },
//     {
//       day: 2,
//       focus: "React State Management & Hooks",
//       tasks: [
//         "Review React Context API performance optimization and custom hooks.",
//         "Practice building complex state flows with useReducer and useEffect cleanups.",
//       ],
//     },
//     {
//       day: 3,
//       focus: "MongoDB & Aggregations",
//       tasks: [
//         "Brush up on MongoDB indexing, schema design, and populate/lookup pipelines.",
//         "Practice writing aggregation pipelines for real-time app metrics.",
//       ],
//     },
//     {
//       day: 4,
//       focus: "Real-time WebSockets & API Architecture",
//       tasks: [
//         "Review Socket.io room management, broadcasting, and disconnection handlers.",
//         "Prepare detailed walk-throughs for Nexora and Hirely architecture.",
//       ],
//     },
//     {
//       day: 5,
//       focus: "DSA & Mock Interviews",
//       tasks: [
//         "Solve 5-10 standard array, string, and hash map problems in C++ / JS.",
//         "Conduct a self-mock technical walkthrough covering project architecture and REST API design.",
//       ],
//     },
//   ],
// };

const navItems = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

const QuestionCard = ({ question, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="hirely-question-card">
      <button
        className="hirely-question-header"
        onClick={() => setOpen(!open)}
      >
        <span className="hirely-question-number">Q{index + 1}</span>

        <span className="hirely-question-text">{question.question}</span>

        <span
          className={`hirely-question-chevron ${
            open ? "hirely-question-chevron-open" : ""
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="hirely-question-body">
          <div className="hirely-question-section">
            <span className="hirely-question-tag hirely-intention-tag">
              INTENTION
            </span>

            <p>{question.intention}</p>
          </div>

          <div className="hirely-question-section">
            <span className="hirely-question-tag hirely-answer-tag">
              MODEL ANSWER
            </span>

            <p>{question.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadmapItem = ({ item }) => {
  return (
    <div className="hirely-roadmap-item">
      <div className="hirely-roadmap-marker">
        <span>{item.day}</span>
      </div>

      <div className="hirely-roadmap-content">
        <div className="hirely-roadmap-heading">
          <span className="hirely-roadmap-day">Day {item.day}</span>

          <h3>{item.focus}</h3>
        </div>

        <ul>
          {item.tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Interview = () => {
  const [activeSection, setActiveSection] = useState("technical");
  const { report, getReportById, loading } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId){
      getReportById(interviewId)
    }
  }, [interviewId])

  if (loading || !report) {
    return <div>Loading...</div>
  }

  const renderMainContent = () => {
    if (activeSection === "technical") {
      return (
        <section className="hirely-main-section">
          <div className="hirely-content-header">
            <div className="hirely-content-title">
              <h1>Technical Questions</h1>

              <span className="hirely-count-badge">
                {report.technicalQuestions.length} questions
              </span>
            </div>
          </div>

          <div className="hirely-question-list">
            {report.technicalQuestions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                index={index}
              />
            ))}
          </div>
        </section>
      );
    }

    if (activeSection === "behavioral") {
      return (
        <section className="hirely-main-section">
          <div className="hirely-content-header">
            <div className="hirely-content-title">
              <h1>Behavioral Questions</h1>

              <span className="hirely-count-badge">
                {report.behavioralQuestions.length} questions
              </span>
            </div>
          </div>

          <div className="hirely-question-list">
            {report.behavioralQuestions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                index={index}
              />
            ))}
          </div>
        </section>
      );
    }

    return (
      <section className="hirely-main-section">
        <div className="hirely-content-header">
          <div className="hirely-content-title">
            <h1>Preparation Road Map</h1>

            <span className="hirely-count-badge">
              {report.preparationPlan.length}-day plan
            </span>
          </div>
        </div>

        <div className="hirely-roadmap-list">
          {report.preparationPlan.map((item) => (
            <RoadmapItem key={item.day} item={item} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="hirely-interview-page">
      <div className="hirely-interview-layout">
        {/* LEFT SIDEBAR */}
        <aside className="hirely-interview-nav">
          <div>
            <p className="hirely-nav-heading">SECTIONS</p>

            <div className="hirely-nav-list">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`hirely-nav-item ${
                    activeSection === item.id
                      ? "hirely-nav-item-active"
                      : ""
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className="hirely-nav-icon">{item.icon}</span>

                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER */}
        <main className="hirely-interview-main">
          {renderMainContent()}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hirely-interview-sidebar">
          <div className="hirely-score-section">
            <p className="hirely-sidebar-heading">MATCH SCORE</p>

            <div className="hirely-score-ring">
              <div className="hirely-score-inner">
                <span className="hirely-score-number">
                  {report.matchScore}
                </span>

                <span className="hirely-score-percent">%</span>
              </div>
            </div>

            <p className="hirely-score-message">
              Strong match for this role
            </p>
          </div>

          <div className="hirely-sidebar-divider"></div>

          <div className="hirely-skill-section">
            <p className="hirely-sidebar-heading">SKILL GAPS</p>

            <div className="hirely-skill-list">
              {report.skillGaps.map((gap, index) => (
                <div
                  key={index}
                  className={`hirely-skill-tag hirely-skill-${gap.severity}`}
                >
                  {gap.skill}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
