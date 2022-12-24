import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { AlbumModule } from './album/album.module';
import { CommentModule } from './comment/comment.module';
import { Album } from './schemas/album.schema';
import { AlbumsTracks } from './schemas/albums-tracks.schema';
import { Comment } from './schemas/comment.schema';
import { Track } from './schemas/track.schema';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    TrackModule,
    CommentModule,
    AlbumModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'musicPlatform',
      models: [Track, Comment, Album, AlbumsTracks],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
