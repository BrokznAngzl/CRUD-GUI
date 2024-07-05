import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../profile.JPEG';

class PDFGenerator {
    static exportPDF(tableColumn, recordsData, tableName, reportFileName) {
        const doc = new jsPDF();

        doc.addImage(logo, 'PNG', 160, 10, 30, 30);
        doc.setFontSize(18);
        doc.text('Poky Management', doc.internal.pageSize.getWidth() / 2, 25, {align: 'center'});

        doc.setFontSize(14);
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
};

export default PDFGenerator;
