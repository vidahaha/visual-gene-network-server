'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const { exec } = require('child_process');

class FileService extends Service {
	async saveFile( body ) {
		const stream = await this.ctx.getFileStream();
		let time = new Date().getTime();
		let fileName = time+'_'+path.basename(stream.filename);
		let url = './app/public/' + fileName;
		const writeStream = fs.createWriteStream(url);
		console.log( stream.fields)

		try {
			await awaitWriteStream(stream.pipe(writeStream));
		} catch (err) {
			await sendToWormhole(stream);
			throw err;
		}

		let {size, alpha} = stream.fields;
		let epi = 2;
		let outputPath = `./${time}/`

		const commonPath = "/root/node/visual-gene-network-server/"

		exec(`Rscript \\web_command.R ${url} ${size} ${alpha} ${epi} ${outputPath}`, {
			cwd: commonPath + "rserve_R/"
		} , (err, stdout, stderr) => {
			if (err) {
			console.log(err);
			return;
			} else {
				
			}
		});

		return fileName;
	}
}


module.exports = FileService;