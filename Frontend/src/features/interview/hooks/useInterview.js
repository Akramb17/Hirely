import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {
    loading,
    setLoading,
    loadingMessage,
    setLoadingMessage,
    errorMessage,
    setErrorMessage,
    report,
    setReport,
    reports,
    setReports
    } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {

    setLoadingMessage("Creating your interview plan...")
    setLoading(true)
    setErrorMessage("")

    let response = null

    try {

        response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile
        })

        setReport(response.interviewReport)

    } catch (error) {


        if (error.response?.status === 503) {
        setErrorMessage(
            "AI Service Unavailable. The AI service is temporarily unavailable. Please try again later."
        )
        }

    } finally {

        setLoading(false)

    }

    return response?.interviewReport
    }

    const getReportById = async () => {

    setLoadingMessage("Loading your interview plan...")
    setLoading(true)

    let response = null

    try {

        response = await getInterviewReportById(interviewId)

        setReport(response.interviewReport)

    } catch (error) {


    } finally {

        setLoading(false)

    }

    return response?.interviewReport
    }


    const getReports = async () => {
    let response = null
    try {
        response = await getAllInterviewReports()
        console.log("REPORTS:", response)
        setReports(response.interviewReports)
    } catch (error) {
        console.log(error)
    }

    return response?.interviewReports
    }


    const getResumePdf = async (interviewReportId) => {

    setLoadingMessage("Generating your resume...")
    setLoading(true)

    let response = null

    try {

        response = await generateResumePdf({ interviewReportId })

        const url = window.URL.createObjectURL(
            new Blob([response], { type: "application/pdf" })
        )

        const link = document.createElement("a")

        link.href = url

        link.setAttribute(
            "download",
            `resume_${interviewReportId}.pdf`
        )

        document.body.appendChild(link)

        link.click()

    } catch (error) {

    } finally {

        setLoading(false)

    }
    }

    useEffect(() => {
        if (interviewId){
          getReportById(interviewId)
        }
        else{
            getReports() 
        }
      }, [interviewId])

    return {
    loading,
    loadingMessage,
    errorMessage,
    report,
    reports,
    interviewId,
    generateReport,
    getReportById,
    getReports,
    getResumePdf
    }

}    