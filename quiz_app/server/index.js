const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mammoth = require('mammoth');
const mysql = require('mysql');
const fs = require('fs');
const cheerio = require('cheerio');
const app = express();

const port = 7001;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "egquizdatabase",
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log("Connected to MySQL");
    }
});

app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the folder where the DOCX files will be temporarily stored.
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// app.post('/upload', upload.single('document'), async (req, res) => {
//     const docxFilePath = `uploads/${req.file.filename}`;
//     const documentName = req.file.originalname; // Assuming you have a document name

//     const outputDir = `uploads/${documentName}_images`;

//     // Create a directory for saving images.
//     if (!fs.existsSync(outputDir)) {
//         fs.mkdirSync(outputDir);
//     }

//     try {
//         // Insert the document information into the documents table
//         const insertDocumentSql = 'INSERT INTO documents (document_name) VALUES (?)';
//         const documentResult = await db.query(insertDocumentSql, [documentName]);
//         const documentId = documentResult.insertId;

//         const result = await mammoth.convertToHtml({ path: docxFilePath });
//         const htmlContent = result.value;
//         const $ = cheerio.load(htmlContent);

//         $('img').each(async (i, element) => {
//             const base64Data = $(element).attr('src').replace(/^data:image\/\w+;base64,/, '');
//             const imageBuffer = Buffer.from(base64Data, 'base64');
//             const imageName = `image_${i}.png`;

//             fs.writeFileSync(`${outputDir}/${imageName}`, imageBuffer);

//             // Insert the image information into the images table
//             const insertImageSql = 'INSERT INTO images (document_id, image_name, image_data) VALUES (?, ?, ?)';
//             await db.query(insertImageSql, [documentId, imageName, imageBuffer]);
//         });

//         res.send('Images extracted and saved successfully.');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error extracting images.');
//     }
// });
app.post('/upload', upload.single('document'), async (req, res) => {
    const docxFilePath = `uploads/${req.file.filename}`;
    const outputDir = `uploads/${req.file.originalname}_images`;
    const topic_id= req.body.topic_id;
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
  
    // Assuming the selected topic IDs are sent in the request body as an array
    // const selectedTopicIds = req.body.selectedTopicIds;
  
    try {
      const result = await mammoth.convertToHtml({ path: docxFilePath });
      const htmlContent = result.value;
      const $ = cheerio.load(htmlContent);
  
      $('img').each(async function (i, element) {
        const base64Data = $(this).attr('src').replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
  
        try {
          // Insert the image data and the selected topic ID into the image table
        //   for (const topicId of selectedTopicIds) {
        //     await connection.query('INSERT INTO images (image_data, topic_id) VALUES (?, ?)', [imageBuffer, topic_id]);
        //   }
        await connection.execute('INSERT INTO images (image_data,topic_id) VALUES (?, ?)', [imageBuffer, topic_id]);
        console.log('Image inserted successfully');
        } catch (error) {
            console.error('Error inserting image data:', error);
          res.status(500).send('Error inserting image data into the database.');
          return;
        }
      });
  
      // No need to close the connection here
  
      res.send('Images extracted and saved to the database with selected topic IDs successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error extracting images and saving to the database.');
    }
  });

app.get('/images/:id', (req, res) => {
    const id = req.params.id; // Use req.params.id to get the ID from the route

    // Query the database to fetch images for the specified document_id
    const selectImagesSql = 'SELECT image_data FROM images WHERE id = ?'; // Change "id" to "document_id"
    db.query(selectImagesSql, [id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error fetching images from the database.');
        } else {
            // Send the images as a JSON response
            const images = results.map(result => {
                return {
                    image_name: result.image_name,
                    image_data: result.image_data.toString('base64'),
                };
            });
            res.json(images);
        }
    });
});


// app.get('/img', (req, res) => {
//     // Use req.params.id to get the ID from the route

//     // Query the database to fetch images for the specified document_id
//     const selectImagesSql = 'SELECT * FROM img '; // Change "id" to "document_id"
//     db.query(selectImagesSql, (error, results) => {
//         if (error) {
//             console.error(error);
//             res.status(500).send('Error fetching images from the database.');
//         } else {
//             // Send the images as a JSON response
//             const images = results.map(result => {
//                 return {
//                     image_name: result.image_name,
//                     image_data: result.image_data.toString('base64'),
//                 };
//             });
//             res.json(images);
//         }
//     });
// });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});