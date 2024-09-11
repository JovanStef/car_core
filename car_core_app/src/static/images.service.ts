import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ImagesService{

 async writeFileToFolder(file):Promise<string>{
    return new Promise((res , rej)=>{
        if(!file){
            rej('Missing properties')
        }

        const fileName = this.generateFileName(file)
        const savePath = require('path').join(__dirname, '..' ,'../src/public/images/car/' + fileName)
        
        fs.writeFile(savePath , file.buffer,()=>{
            res(fileName)
        })
    })
 } 
 
 generateFileName(file){
    const id = uuidv4()
    const fileType = file.mimetype.split('/')[1]
    const name = file.originalname.replace(`.${fileType}`,'')
    return `${name}_${id}.${fileType}`
 }
}