import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot(
            (() => {
                return {
                    rootPath: join(__dirname, '..', process.env.IMAGES_CAR_ROOT_DIR),
                    serveRoot: process.env.IMAGES_CAR_SERVE_DIR,
                    exclude: ['/api*'],
                };
            })()
        ),
    ],
})
export class StaticImagesModule {}