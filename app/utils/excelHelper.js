const XLSX = require('xlsx');
const FileSaver = require('file-saver');

const routesHeader = {
    header: ["id", "date", "from", "from_name", "to", "to_name", "type", "distance_between"], // TODO : distance_between
};

const carDetailsHeader = {
    header: ["licence_plate", "brand", "startDate", "endDate", "consuption_norm" ],
}

const workerDetailsHeader = {
    header: ["email", "name", "phoneNumber"],
};

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

export function generateXLSX(carDetails, routeDetails, startDate, endDate, type = 'car') {
    let workBook = XLSX.utils.book_new();

    const routesWSName = `utak ${startDate} - ${endDate}`;
    const routesWSData = routeDetails.map(val => ({
        id: val.id,
        date: val.date,
        from: val.from,
        from_name: val.from_name,
        to: val.to,
        to_name: val.to_name,
        type: val.type,
        distance_between: Math.round(Math.random() * 1000),
    }));
    const routesWorkSheet = XLSX.utils.json_to_sheet(routesWSData, routesHeader);

    // add routes WS
    workBook.SheetNames.push(routesWSName);
    workBook.Sheets[routesWSName] = routesWorkSheet;

    let title;
    if (type === 'car') {
        const carsWSName = `Autó Adatai`
        const carsWSData = {
            licence_plate: carDetails.licence_plate,
            brand: `${carDetails.brand} ${carDetails.type}`,
            startDate,
            endDate,
            consuption_norm: carDetails.consuption_norm,
        };
        const carsWorkSheet = XLSX.utils.json_to_sheet([carsWSData], carDetailsHeader);

        // add cars WS
        workBook.SheetNames.push(carsWSName);
        workBook.Sheets[carsWSName] = carsWorkSheet;

        title = `${carDetails.brand} ${carDetails.type} ${startDate} ${endDate}`;
    } else if (type === 'user') {
        const userWSName = `Alkalmazott Adatai`
        const userWSData = {
            email: carDetails.email,
            name: carDetails.name,
            phoneNumber: carDetails.phoneNumber,
        };
        const userWorkSheet = XLSX.utils.json_to_sheet([userWSData], workerDetailsHeader);

        // add cars WS
        workBook.SheetNames.push(userWSName);
        workBook.Sheets[userWSName] = userWorkSheet;

        title = `${carDetails.name} ${startDate} ${endDate}`;
        console.log('origin title: ', title,'...', title.length)
        // title = `${carDetails.name}`;
    }

    if (!workBook.Props) {
        workBook.Props = {};
    }

    workBook.Props.Title = title;
    console.log(workBook)
    console.log('workBook title: ', title);
    const wopts = { bookType:'xlsx', type:'binary' };

    // XLSX.writeFile(workbook, 'out.xlsb');
    var wbout = XLSX.write(workBook, wopts);

    /* the saveAs call downloads a file on the local machine */
    FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), `${title}.xlsx`);
}


// workbook file props

/* 

if(!wb.Props) wb.Props = {};
wb.Props.Title = "Insert Title Here";

Title
Subject
Author
Manager
Company
Category
Keywords
Comments
LastAuthor
CreatedDate
*/


/* bookType can be any supported output type */


/* 
type		Output data encoding (see Output Type below)
cellDates	false	Store dates as type d (default is n)
bookSST	false	Generate Shared String Table **
bookType	"xlsx"	Type of Workbook (see below for supported formats)
sheet	""	Name of Worksheet for single-sheet formats **
compression	false	Use ZIP compression for ZIP-based formats **
Props		Override workbook properties when writing **
themeXLSX		Override theme XML when writing XLSX/XLSB/XLSM **
*/


// output formats 

/* 
xlsx	.xlsx	ZIP	multi	Excel 2007+ XML Format
xlsm	.xlsm	ZIP	multi	Excel 2007+ Macro XML Format
xlsb	.xlsb	ZIP	multi	Excel 2007+ Binary Format
biff8	.xls	CFB	multi	Excel 97-2004 Workbook Format
biff5	.xls	CFB	multi	Excel 5.0/95 Workbook Format
biff2	.xls	none	single	Excel 2.0 Worksheet Format
xlml	.xls	none	multi	Excel 2003-2004 (SpreadsheetML)
ods	.ods	ZIP	multi	OpenDocument Spreadsheet
fods	.fods	none	multi	Flat OpenDocument Spreadsheet
csv	.csv	none	single	Comma Separated Values
txt	.txt	none	single	UTF-16 Unicode Text (TXT)
sylk	.sylk	none	single	Symbolic Link (SYLK)
html	.html	none	single	HTML Document
dif	.dif	none	single	Data Interchange Format (DIF)
dbf	.dbf	none	single	dBASE II + VFP Extensions (DBF)
rtf	.rtf	none	single	Rich Text Format (RTF)
prn	.prn	none	single	Lotus Formatted Text
eth	.eth	none	single	Ethercalc Record Format (ETH)

*/
