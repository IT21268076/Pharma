// src/components/ExportToPDF.js

import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ExportToPDF = ({ items }) => {
  const handleExportToPDF = () => {
    // Check if the items array is defined
    if (!items || !items.length) {
      console.error('No items to export.');
      return;
    }

    const tableContent = items.map(item => [
        { text: item.name, margin: [5, 2] }, // Set padding for the cell containing the name
        { text: item.unit_price, margin: [5, 2] }, // Set padding for the cell containing the unit price
      ]);
      
      const documentDefinition = {
        content: [
          { text: 'Item Details', fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
          {
            table: {
              body: [['Name', 'Unit Price'], ...tableContent],
              // Set cell padding for the entire table
              margin: [0, 5, 0, 5],
            },
          },
        ],
      };
      
      pdfMake.createPdf(documentDefinition).open();
      

    pdfMake.createPdf(documentDefinition).open();

    // Create and open the PDF
    pdfMake.createPdf(documentDefinition).open();
  };

  return (
    <button onClick={handleExportToPDF}>Export to PDF</button>
  );
};

export default ExportToPDF;
