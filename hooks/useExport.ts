/* eslint-disable new-cap */
/* eslint-disable import/prefer-default-export */
// hooks/useExport.ts
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import htmlDocx from 'html-docx-js/dist/html-docx';

export const useExport = () => {
    const printProducts = () => {
        window.print();
    };

    const exportAsPDF = (elementId: string) => {
        // const input = document.getElementById(elementId) as HTMLElement;
        // html2canvas(input).then((canvas) => {
        //     const imgData = canvas.toDataURL('image/png');
        //     const pdf = new jsPDF();
        //     pdf.addImage(imgData, 'PNG', 0, 0);
        //     pdf.save('products.pdf');
        // });
        const input = document.getElementById(elementId) as HTMLElement;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('products.pdf');
        });
    };

    const exportAsWord = (elementId: string) => {
        const content = document.getElementById(elementId)?.outerHTML;
        if (content) {
            const converted = htmlDocx.asBlob(content);
            saveAs(converted, 'products.docx');
        }
    };

    const exportAsImage = (elementId: string) => {
        const input = document.getElementById(elementId) as HTMLElement;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'products.png';
            link.click();
        });
    };

    return { printProducts, exportAsPDF, exportAsWord, exportAsImage };
};
