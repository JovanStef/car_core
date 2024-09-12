import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ImagesService{

 async writeFileToFolder(file, dirPath:string):Promise<string>{
    return new Promise((res , rej)=>{
        if(!file || !dirPath){
            rej('Missing properties')
        }

        const fileName = this.generateFileName(file)
        const path = require('path').join(__dirname, '..' ,dirPath + fileName)
        
        fs.writeFile(path , file.buffer,()=>{
            res(fileName)
        })
    })
 } 

 async deleteFileFromFolder(fileName:string , dirPath:string):Promise<void>{
    return new Promise((res,rej)=>{
        if(!fileName || !dirPath){
            rej('Missing properties')
        }
        try {
        const path = require('path').join(__dirname, '..' ,dirPath + fileName)
        fs.unlink(path, (err) => {
            if(err) rej(err)
                res()
            }); 
        } catch (error) {
            rej(error)
        }
    })
 }
 
 generateFileName(file){
    const id = uuidv4()
    const fileType = file.mimetype.split('/')[1]
    const name = file.originalname.replace(`.${fileType}`,'')
    return `${name}_${id}.${fileType}`
 }
}