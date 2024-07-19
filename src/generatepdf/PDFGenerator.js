import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../profile.JPEG';

class PDFGenerator {
    static exportPDF(t, tableColumn, recordsData, tableName, reportFileName) {
        const doc = new jsPDF();

        doc.addImage(logo, 'PNG', 160, 10, 30, 30);
        doc.setFontSize(18);
        doc.setFont('Helvetica', 'bold');
        doc.text(PDFGenerator.capitalizeWords(t('app.name')), doc.internal.pageSize.getWidth() / 2, 25, {align: 'center'});

        doc.setFontSize(14);
        doc.setFont('Helvetica', 'bold');
        doc.text(tableName, doc.internal.pageSize.getWidth() / 2, 50, {align: 'center'});

        const tableRows = [];
        recordsData.map((record) => {
            const rowData = [];
            Object.entries(record).map(([key, value]) => (
                rowData.push(value)
            ))
            tableRows.push(rowData);
        })

        doc.autoTable({
            startY: 60,
            head: [tableColumn],
            body: tableRows,
            theme: 'striped',
        });

        doc.save(reportFileName);
    }

    static capitalizeWords(str) {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
};

export default PDFGenerator;
