const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const xlsx = require('xlsx');

async function processFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    let data = [];
    if (ext === '.csv') {
        data = await csv().fromFile(filePath);
    } else if (ext === '.xlsx') {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }
    return data;
}

(async () => {
    try {
        let result = await processFile(workerData.filePath);
        result = result.map(row => ({
            ...row,
            first_name: row.first_name || row.firstname,
            phone_number: row.phone_number || row.phone,
            zip_code: row.zip_code || row.zip,
            address: row.address || row.Address || "",
            state: row.state || row.State || "",
            gender: row.gender || row.Gender || row.GENDER || "",
            start_date: row.start_date || row.policy_start_date || row.policy_startdate || row.policy_start || "",
            end_date: row.end_date || row.policy_end_date || row.policy_enddate || row.policy_end || ""
        }));
        parentPort.postMessage({ success: true, data: result });
    } catch (err) {
        parentPort.postMessage({ success: false, error: err.message });
    }
})();
