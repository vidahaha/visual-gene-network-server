'use strict';

const Service = require('egg').Service;
const fs = require('fs');

class DataService extends Service {
	async getData() {
		const rawData = fs.readFileSync('data/0.txt', 'utf8');
		let rawArray = rawData.split('\n');
		rawArray.splice( rawArray.length - 1, 1 )
		rawArray = rawArray.map( ele => ele.trim() );

		const data = {};
		data.totalGene = rawArray[0].split(' ');
		let edgeList = rawArray.slice( 1, rawArray.length );
		edgeList = edgeList.map( ele => {
			let outer = [],
				inner = [];
			inner = ele.split(' ');
			inner.forEach( inele => {
				outer.push(inele.split(','))
			});
			return outer;		
		});
		data.edgeList = edgeList;
		return data;
	}
	async handleData() {
		let changeData = [];
		for ( let i = 1; ; i++ ) {
			let exists = fs.existsSync(`data/${i}.txt`);
			if ( exists ) {
				let curData = [];
				const rawData = fs.readFileSync(`data/${i}.txt`, 'utf8');
				let rawArray = rawData.split('\n');
				rawArray.splice( 0, 1 )
				rawArray.splice( rawArray.length - 1, 1 )
				rawArray = rawArray.map( ele => ele.trim() );

				rawArray.forEach( ele => {
					let res = /BIC:(.+),MIT:(.+)/g.exec( ele );  // bic.mit
					let res_2 = /^(\w+)\s(.+),BIC/g.exec( ele )  // 有操作
					let res_3 = /^nothing/g.exec( ele )          // 无操作
					let bic = 0;
					let mit = 0;
					let type = '';
					let edges = [];
					if ( res && res.length === 3 ) {
						bic = res[1];
						mit = res[2];
					}
					if( res_3 ) {
						curData.push({
							type: 'nothing',
							bic,
							mit						
						})
					} else if ( res_2 && res.length === 3 ) {
						type = res_2[1];
						edges = res_2[2].split(',');
						curData.push({
							type,
							edges,
							bic,
							mit						
						})
					}
					

				})

				changeData.push({
					stage: i,
					data: curData
				})

			} else {
				return changeData;
			}
		}
		return changeData;
	}

}

module.exports = DataService;
