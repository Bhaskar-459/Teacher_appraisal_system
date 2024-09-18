const PDFDocument = require('pdfkit');
const asyncHandler = require('express-async-handler');
const KPA = require('../models/KPA');

exports.generatePDF = asyncHandler(async (req, res) => {
    const doc = new PDFDocument({ margin: 50 });
    const fileName = 'kpa-report.pdf';

    // Set headers to trigger file download
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe the PDF into the response
    doc.pipe(res);
    let teacherid = req.params.id;

    // Fetch details from the database
    const kpa = await KPA.findOne({'teacherId': teacherid}).populate('teacherId');
    if (!kpa) {
        res.status(404);
        throw new Error('KPA not found');
    }

    // Add a title with some styling
    doc.font('Helvetica-Bold').fontSize(22).fillColor('#2b3990').text('Key Performance Areas Report', { align: 'center' });
    doc.moveDown(2);

    // Teacher information
    doc.font('Helvetica').fontSize(16).fillColor('black').text(`Teacher: ${kpa.teacherId.username}`, { align: 'left' });
    doc.moveDown(1.5);

    // Line separator
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // KPA 1: Teaching
    doc.font('Helvetica-Bold').fontSize(16).fillColor('#2b3990').text('KPA 1: Teaching');
    doc.moveDown(0.8);

    doc.font('Helvetica').fontSize(12).fillColor('black')
        .text(`Feedback: ${kpa.teaching.feedback}`)
        .moveDown(0.4)
        .text(`Availability: ${kpa.teaching.availability}`)
        .moveDown(0.4)
        .text(`Mentorship: ${kpa.teaching.mentorship}`)
        .moveDown(0.4)
        .text(`Innovation: ${kpa.teaching.innovation}`)
        .moveDown(0.4)
        .text(`Syllabus: ${kpa.teaching.syllabus}`)
        .moveDown(0.4)
        .text(`Curriculum: ${kpa.teaching.curriculum}`)
        .moveDown(0.4)
        .text(`Objectives: ${kpa.teaching.objectives}`)
        .moveDown(0.4)
        .text(`Average Score: ${kpa.teaching.averageScore}`);
    doc.moveDown(1.5);

    // KPA 2: Professional Development
    if (kpa.professionalDevelopment.publications.length > 0) {
        doc.font('Helvetica-Bold').fontSize(16).fillColor('#2b3990').text('KPA 2: Professional Development');
        doc.moveDown(0.8);

        kpa.professionalDevelopment.publications.forEach(pub => {
            doc.font('Helvetica').fontSize(12).fillColor('black')
                .text(`Publication Theme: ${pub.theme}`)
                .text(`Pages: ${pub.pageNumber}`)
                .moveDown();
        });
    }

    doc.font('Helvetica').fontSize(12).fillColor('black').text(`Score: ${kpa.professionalDevelopment.score}`);
    doc.moveDown(1.5);

    // KPA 3: Administrative Support / Additional Responsibilities
    if (kpa.administrativeSupport.events.length > 0 || kpa.administrativeSupport.seminars.length > 0) {
        doc.font('Helvetica-Bold').fontSize(16).fillColor('#2b3990').text('KPA 3: Administrative Support / Additional Responsibilities');
        doc.moveDown(0.8);

        kpa.administrativeSupport.events.forEach((event, index) => {
            doc.font('Helvetica').fontSize(12).fillColor('black')
                .text(`Event ${index + 1}:`)
                .text(`Event Name: ${event.eventName}`)
                .text(`Involvement: ${event.involvement}`)
                .text(`Contribution: ${event.contribution}`)
                .text(`Duration: ${event.duration}`)
                .moveDown(1);
        });

        kpa.administrativeSupport.seminars.forEach((seminar, index) => {
            doc.font('Helvetica').fontSize(12).fillColor('black')
                .text(`Seminar ${index + 1}:`)
                .text(`Seminar Name: ${seminar.seminarName}`)
                .text(`Theme: ${seminar.theme}`)
                .text(`Type: ${seminar.type}`)
                .text(`Date: ${seminar.date.toLocaleDateString()}`)
                .moveDown(1);
        });
    }

    doc.font('Helvetica').fontSize(12).fillColor('black').text(`Score: ${kpa.administrativeSupport.score}`);
    doc.addPage(); // Add page break here
    doc.moveDown(1.5);

    // KPA 4: Others
    doc.font('Helvetica-Bold').fontSize(16).fillColor('#2b3990').text('KPA 4: Others');
    doc.moveDown(0.8);
    
    doc.font('Helvetica').fontSize(12).fillColor('black')
        .text(`Professional Development: ${kpa.others.professionalDevelopment}`)
        .moveDown(0.4)
        .text(`Work Diary: ${kpa.others.workDiary}`)
        .moveDown(0.4)
        .text(`Punctuality: ${kpa.others.punctuality}`)
        .moveDown(0.4)
        .text(`Collaborative Working: ${kpa.others.collaborativeWorking}`)
        .moveDown(0.4)
        .text(`Average Score: ${kpa.others.averageScore}`);
    doc.moveDown(1.5);

    // Final score with bold text
    doc.font('Helvetica-Bold').fontSize(16).fillColor('#2b3990').text(`Final Score: ${kpa.finalScore}`);
    doc.moveDown(2);

    // Footer with date and signature
    doc.font('Helvetica').fontSize(12).fillColor('gray').text('Generated on: ' + new Date().toLocaleString(), { align: 'right' });
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(12).fillColor('black').text('Signature: ___________________________', { align: 'left' });

    // End the PDF and close the stream
    doc.end();
});
