const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.static("./public"));

app.post("/", (req, res) => {
	// Create new buffer
	let dataBuffer = Buffer.from("");

	// Receive data
	req.on("data", (chunk) => {
		dataBuffer = Buffer.concat([dataBuffer, chunk]); // Append chunks to buffer
	});

	// Proccess data
	req.on("end", () => {
		const imageStart = dataBuffer.indexOf("ffd8ff", 0, "hex"); // Image start signature, search for JPG
		if (imageStart === -1) return res.status(400).send("Invalid file type!");
		const imageEnd = dataBuffer.indexOf("ffd9", 0, "hex") + 2; // + 2 to account for the 2 bytes of the ending signature (0xff and 0xd9)
		image = dataBuffer.subarray(imageStart, imageEnd); // Image data

		// Write image to file
		fs.writeFile("./public/images/image.jpg", image, (err) => {
			if (err) throw err;
			console.log("File written succesfully!");
			res.status(200).redirect("/images/image.jpg"); // Redirect to uploaded image
		});
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Started server at: http://localhost:${PORT}`));
