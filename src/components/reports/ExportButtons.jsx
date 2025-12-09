import { useState } from 'react';
import { FileDown, FileSpreadsheet } from 'lucide-react';
import toast from 'react-hot-toast';
import { getMonthlyReportPDF, getMonthlyReportCSV, downloadFile } from '../../services/reportsService';

const ExportButtons = ({ selectedMonth }) => {
    const [exportingPDF, setExportingPDF] = useState(false);
    const [exportingCSV, setExportingCSV] = useState(false);

    const handlePDFExport = async () => {
        setExportingPDF(true);
        try {
            const blob = await getMonthlyReportPDF(selectedMonth);
            downloadFile(blob, `report-${selectedMonth}.pdf`);
            toast.success('PDF exported successfully!');
        } catch (error) {
            console.error('Error exporting PDF:', error);
            toast.error('Failed to export PDF');
        } finally {
            setExportingPDF(false);
        }
    };

    const handleCSVExport = async () => {
        setExportingCSV(true);
        try {
            const blob = await getMonthlyReportCSV(selectedMonth);
            downloadFile(blob, `report-${selectedMonth}.csv`);
            toast.success('CSV exported successfully!');
        } catch (error) {
            console.error('Error exporting CSV:', error);
            toast.error('Failed to export CSV');
        } finally {
            setExportingCSV(false);
        }
    };

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Export Report
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Export your monthly report for accounting or record-keeping purposes.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center  md:justify-end">
                    <button
                        onClick={handlePDFExport}
                        disabled={exportingPDF}
                        className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <FileDown className="h-4 w-4" />
                        <span>{exportingPDF ? 'Exporting...' : 'Export as PDF'}</span>
                    </button>

                    <button
                        onClick={handleCSVExport}
                        disabled={exportingCSV}
                        className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <FileSpreadsheet className="h-4 w-4" />
                        <span>{exportingCSV ? 'Exporting...' : 'Export as CSV'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportButtons;
