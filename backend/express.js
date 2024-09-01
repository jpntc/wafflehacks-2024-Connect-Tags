const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require ('cors')


const { uploadImageToFirebase, saveUserDataToFirestore } = require('./upload_image');

app.use(cors())
app.use(bodyParser.json());
app.post('/generate-image', (req, res) => {

    const { name, description } = req.body;

    const scriptPath = path.join(__dirname, 'generate_image.py');
    const outputImagePath = 'generated_image.png';

    const pythonProcess = spawn('python3', [scriptPath, description, outputImagePath]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', async (code) => {
        if(code === 0)
        {
            try 
            {
                const imageURL = await uploadImageToFirebase(outputImagePath, name);

                await saveUserDataToFirestore(name, description, imageURL);

                res.json({ imageURL });
            }
            catch (error)
            {
                console.error('Error during upload or Firestore operation:', error);
                res.status(500).json({ error: 'Failed to upload image or save data.' });
            }
        }
        else
        {
            res.status(500).json({ error: 'Image generation failed.' });
        }
    });
});

app.post('/hello-world', (req, res)=>{
    return ('Hello world')
})
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
