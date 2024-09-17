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
    doc.moveDown(1.5);

    // KPA 1: Teaching
    doc.fontSize(14).text('KPA-1: Teaching', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Student Feedback: ${req.body.teaching.feedback || 'N/A'}`);
    doc.text(`Availability: ${req.body.teaching.availability || 'N/A'}`);
    doc.text(`Mentorship: ${req.body.teaching.mentorship || 'N/A'}`);
    doc.text(`Innovation: ${req.body.teaching.innovation || 'N/A'}`);
    doc.text(`Syllabus: ${req.body.teaching.syllabus || 'N/A'}`);
    doc.text(`Curriculum: ${req.body.teaching.curriculum || 'N/A'}`);
    doc.text(`Objectives: ${req.body.teaching.objectives || 'N/A'}`);
    doc.text(`Teaching Score: ${req.body.teaching.teachingScore || '0'}`);
    doc.moveDown(1);

    // KPA 2: Professional Development
    doc.fontSize(14).text('KPA-2: Professional Development', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`DOI: ${req.body.professionalDevelopment.doi || 'N/A'}`);
    doc.text(`Professional Development Score: ${req.body.professionalDevelopment.pdScore || '0'}`);
    doc.moveDown(0.5);

    // Displaying all publications
    if (req.body.professionalDevelopment.publications && req.body.professionalDevelopment.publications.length > 0) {
        doc.fontSize(12).text('Publications:', { bold: true });
        req.body.professionalDevelopment.publications.forEach((publication, index) => {
            doc.moveDown(0.2);
            doc.text(`${index + 1}. Name: ${publication.name || 'N/A'}, Theme: ${publication.theme || 'N/A'}, Pages: ${publication.pageNumber || 'N/A'}`);
        });
    } else {
        doc.text('No publications available.');
    }
    doc.moveDown(1);

    // KPA 3: Administrative Support
    doc.fontSize(14).text('KPA-3: Administrative Support', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Administrative Support Score: ${req.body.administrativeSupport.adminSupportScore || '0'}`);
    doc.moveDown(0.5);

    // Displaying all events
    if (req.body.administrativeSupport.events && req.body.administrativeSupport.events.length > 0) {
        doc.fontSize(12).text('Events Organized:', { bold: true });
        req.body.administrativeSupport.events.forEach((event, index) => {
            doc.moveDown(0.2);
            doc.text(`${index + 1}. Name: ${event.name || 'N/A'}, Involvement: ${event.involvement || 'N/A'}, Contribution: ${event.contribution || 'N/A'}, Duration: ${event.duration || 'N/A'}`);
        });
    } else {
        doc.text('No events available.');
    }
    doc.moveDown(0.5);

    // Displaying all seminars
    if (req.body.administrativeSupport.seminars && req.body.administrativeSupport.seminars.length > 0) {
        doc.fontSize(12).text('Seminars:', { bold: true });
        req.body.administrativeSupport.seminars.forEach((seminar, index) => {
            doc.moveDown(0.2);
            doc.text(`${index + 1}. Name: ${seminar.name || 'N/A'}, Theme: ${seminar.theme || 'N/A'}, Type: ${seminar.type || 'N/A'}, Date: ${seminar.date || 'N/A'}`);
        });
    } else {
        doc.text('No seminars available.');
    }
    doc.moveDown(1);

    // KPA 4: Others
    doc.fontSize(14).text('KPA-4: Others', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Professional Development: ${req.body.others.professionalDevelopment || 'N/A'}`);
    doc.text(`Work Diary: ${req.body.others.workDiary || 'N/A'}`);
    doc.text(`Punctuality: ${req.body.others.punctuality || 'N/A'}`);
    doc.text(`Collaborative Working: ${req.body.others.collaborativeWorking || 'N/A'}`);
    doc.text(`Others Score: ${req.body.others.othersScore || '0'}`);
    doc.moveDown(1);

    // End the PDF and close the stream
    doc.end();
});
