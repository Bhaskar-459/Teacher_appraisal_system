const PDFDocument = require('pdfkit');
const asyncHandler = require('express-async-handler');

exports.generatePDF = asyncHandler(async (req, res) => {
    const doc = new PDFDocument();
    const fileName = 'kpa-report.pdf';

    // Set headers to trigger file download
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe the PDF into the response
    doc.pipe(res);

    // Title
    doc.fontSize(18).text('Key Performance Areas (KPA)', { align: 'center' });

    // KPA 1: Teaching
    doc.fontSize(14).text('KPA-1: Teaching');
    doc.fontSize(12).text(`Student Feedback: ${req.body.feedback || 'N/A'}`);
    doc.text(`Availability: ${req.body.availability || 'N/A'}`);
    doc.text(`Mentorship: ${req.body.mentorship || 'N/A'}`);
    doc.text(`Innovation: ${req.body.innovation || 'N/A'}`);
    doc.text(`Syllabus Preparation: ${req.body.syllabus || 'N/A'}`);
    doc.text(`Curriculum Design: ${req.body.curriculum || 'N/A'}`);
    doc.text(`Course Objectives: ${req.body.objectives || 'N/A'}`);
    doc.text(`Teaching Score: ${req.body.teachingScore || '0'}`);

    // Add more details for other KPAs if needed

    doc.end(); // Finalize PDF file and end the stream
});

