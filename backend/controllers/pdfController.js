const PDFDocument = require('pdfkit');
const asyncHandler = require('express-async-handler');
const KPA = require('../models/KPA');
const User = require('../models/User');

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
    const teacher =  await User.findById(teacherid);
    console.log(kpa)
    if (!kpa) {
        res.status(404);
        throw new Error('KPA not found');
    }

    // Add a title with some styling
    doc.font('Helvetica-Bold').fontSize(22).fillColor('#2b3990').text('Key Performance Areas Report', { align: 'center' });
    doc.moveDown(2);

    // Teacher information
    doc.font('Helvetica').fontSize(16).fillColor('black').text(`Teacher: ${teacher.username}`, { align: 'left' });
    doc.moveDown(1.5);

    // Line separator
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // KPA 1: Teaching
    doc.font('Helvetica-Bold').fontSize(16).fillColor('#2b3990').text('KPA 1: Teaching');
    doc.moveDown(0.8);

    doc.font('Helvetica').fontSize(12).fillColor('black')
        .text(`Feedback: ${kpa.kpaData.teaching.feedback}`)
        .moveDown(0.4)
        .text(`Availability: ${kpa.kpaData.teaching.availability}`)
        .moveDown(0.4)
        .text(`Mentorship: ${kpa.kpaData.teaching.mentorship}`)
        .moveDown(0.4)
        .text(`Innovation: ${kpa.kpaData.teaching.innovation}`)
        .moveDown(0.4)
        .text(`Syllabus: ${kpa.kpaData.teaching.syllabus}`)
        .moveDown(0.4)
        .text(`Curriculum: ${kpa.kpaData.teaching.curriculum}`)
        .moveDown(0.4)
        .text(`Objectives: ${kpa.kpaData.teaching.objectives}`)
        .moveDown(0.4)
        .text(`Average Score: ${kpa.kpaData.teaching.teachingScore}`);
    doc.moveDown(1.5);

    // KPA 2: Professional Development
    if (kpa.kpaData.professionalDevelopment.publications.length > 0) {
        doc.font('Helvetica-Bold').fontSize(16).fillColor('#2b3990').text('KPA 2: Professional Development');
        doc.moveDown(0.8);

        kpa.kpaData.professionalDevelopment.publications.forEach(pub => {
            doc.font('Helvetica').fontSize(12).fillColor('black')
                .text(`Publication Theme: ${pub.theme}`)
                .text(`Pages: ${pub.pageNumber}`)
                .moveDown();
        });
    }

    doc.font('Helvetica').fontSize(12).fillColor('black').text(`Score: ${kpa.kpaData.professionalDevelopment.professionalDevelopmentScore}`);
    doc.moveDown(1.5);

    // KPA 3: Administrative Support / Additional Responsibilities
    if (kpa.kpaData.administrativeSupport.events.length > 0 || kpa.kpaData.administrativeSupport.seminars.length > 0) {
        doc.font('Helvetica-Bold').fontSize(16).fillColor('#2b3990').text('KPA 3: Administrative Support / Additional Responsibilities');
        doc.moveDown(0.8);

        kpa.kpaData.administrativeSupport.events.forEach((event, index) => {
            doc.font('Helvetica').fontSize(12).fillColor('black')
                .text(`Event ${index + 1}:`)
                .text(`Event Name: ${event.eventName}`)
                .text(`Involvement: ${event.involvement}`)
                .text(`Contribution: ${event.contribution}`)
                .text(`Duration: ${event.duration}`)
                .moveDown(1);
        });

        kpa.kpaData.administrativeSupport.seminars.forEach((seminar, index) => {
            doc.font('Helvetica').fontSize(12).fillColor('black')
                .text(`Seminar ${index + 1}:`)
                .text(`Seminar Name: ${seminar.seminarName}`)
                .text(`Theme: ${seminar.theme}`)
                .text(`Type: ${seminar.type}`)
                .text(`Date: ${seminar.date.toLocaleDateString()}`)
                .moveDown(1);
        });
    }

    doc.font('Helvetica').fontSize(12).fillColor('black').text(`Score: ${kpa.kpaData.administrativeSupport.administrativeSupportScore}`);
    doc.moveDown(1.5);

    // KPA 4: Others
    doc.font('Helvetica-Bold').fontSize(16).fillColor('#2b3990').text('KPA 4: Others');
    doc.moveDown(0.8);
    
    doc.font('Helvetica').fontSize(12).fillColor('black')
        .text(`Professional Development: ${kpa.kpaData.others.professionalDevelopment}`)
        .moveDown(0.4)
        .text(`Work Diary: ${kpa.kpaData.others.workDiary}`)
        .moveDown(0.4)
        .text(`Punctuality: ${kpa.kpaData.others.punctuality}`)
        .moveDown(0.4)
        .text(`Collaborative Working: ${kpa.kpaData.others.collaborativeWorking}`)
        .moveDown(0.4)
        .text(`Average Score: ${kpa.kpaData.others.othersScore}`);
    doc.moveDown(1.5);

    // Final score with bold text
    doc.font('Helvetica-Bold').fontSize(16).fillColor('#2b3990').text(`Final Score: ${kpa.kpaData.finalScore}`);
    doc.moveDown(2);

    // Footer with date and signature
    doc.font('Helvetica').fontSize(12).fillColor('gray').text('Generated on: ' + new Date().toLocaleString(), { align: 'right' });
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(12).fillColor('black').text('Signature: ___________________________', { align: 'left' });

    // End the PDF and close the stream
    doc.end();
});
